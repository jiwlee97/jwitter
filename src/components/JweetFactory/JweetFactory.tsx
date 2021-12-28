import { dbService, storageService } from "fbase";
import { useCallback, useRef, useState, VFC } from "react";
import { IUser } from "../App/App";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  userObj: IUser;
}

const JweetFactory: VFC<IProps> = ({ userObj }) => {
  const [jweet, setJweet] = useState<string>("");
  const [fileString, setFileString] = useState<string>("");
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
      setFileString("");
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    },
    [fileString, jweet, userObj.uid]
  );

  const onClickClearFileString = useCallback(() => {
    setFileString("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  }, []);

  return (
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
  );
};

export default JweetFactory;
