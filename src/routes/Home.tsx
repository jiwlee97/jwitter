import Jweet from "components/Jweet";
import { dbService, FbaseUser, storageService } from "fbase";
import { useCallback, useEffect, useRef, useState, VFC } from "react";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  userObj: FbaseUser;
}

export interface IJweetWithId {
  text: string;
  createdAt: Date;
  creatorId: string;
  fileUrl: string;
  id: string;
}

const Home: VFC<IProps> = ({ userObj }) => {
  const [jweet, setJweet] = useState<string>("");
  const [jweetsWithId, setJweetsWithId] = useState<IJweetWithId[]>([]);
  const [fileString, setFileString] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;

    setJweet(value);
  }, []);

  const onChangeFile = useCallback((event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const { result } = reader;
      setFileString(result as string);
    };
    reader.readAsDataURL(theFile);
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!jweet && !fileString) {
        return;
      }
      let fileUrl = "";
      if (fileString) {
        const fileRefChild = storageService
          .ref()
          .child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRefChild.putString(fileString, "data_url");
        fileUrl = await response.ref.getDownloadURL();
      }
      const jweetObj = {
        text: jweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        fileUrl,
      };
      await dbService.collection("jweets").add(jweetObj);
      setJweet("");
      setFileString(null);
    },
    [fileString, jweet, userObj.uid]
  );

  const onClickClearFileString = useCallback(() => {
    setFileString(null);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  }, []);

  useEffect(() => {
    dbService
      .collection("jweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const jweetArray = snapshot.docs.map((doc) => ({
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          creatorId: doc.data().creatorId,
          fileUrl: doc.data().fileUrl,
          id: doc.id,
        }));
        setJweetsWithId(jweetArray);
      });
  }, [userObj.uid]);

  return (
    <div>
      Home Page
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={jweet}
          onChange={onChange}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={onChangeFile}
        />
        <button type="submit">Jweet</button>
        {fileString && (
          <>
            <img alt="FileImage" src={fileString} width="50px" height="50px" />
            <button type="button" onClick={onClickClearFileString}>
              Clear
            </button>
          </>
        )}
      </form>
      <div>
        {jweetsWithId.map((jweetWithId) => (
          <Jweet
            key={jweetWithId.id}
            jweetObj={jweetWithId}
            isCreator={jweetWithId.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
