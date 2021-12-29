import { dbService, storageService } from "fbase";
import { RefObject, useCallback, useRef, useState, VFC } from "react";
import { IUser } from "components/App";
import { v4 as uuidv4 } from "uuid";
import { Form, ImgPreview } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Scrollbars from "react-custom-scrollbars-2";

interface IProps {
  userObj: IUser;
  scrollRef: RefObject<Scrollbars>;
}

const JweetFactory: VFC<IProps> = ({ userObj, scrollRef }) => {
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
      scrollRef.current?.scrollToTop();
      setJweet("");
      setFileString("");
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    },
    [fileString, jweet, scrollRef, userObj.uid]
  );

  const onClickClearFileString = useCallback(() => {
    setFileString("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  }, []);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={jweet}
          onChange={onChange}
        />
        <button type="submit">
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ width: "20px", height: "20px" }}
          />
        </button>
        <label htmlFor="input-file">
          {fileString ? "Change Photo" : "Add Photo"}&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="input-file"
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={onChangeFile}
        />
      </Form>
      {fileString && (
        <ImgPreview>
          <img alt="FileImage" src={fileString} />
          <button type="button" onClick={onClickClearFileString}>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: "20px", height: "20px", color: "#444444" }}
            />
          </button>
        </ImgPreview>
      )}
    </>
  );
};

export default JweetFactory;
