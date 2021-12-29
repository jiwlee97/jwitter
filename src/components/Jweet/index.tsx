import { dbService, storageService } from "fbase";
import { useCallback, useState, VFC } from "react";
import { IJweetWithId } from "components/JweetList";
import { Buttons, EditJweetForm, ImgWrapper, JweetContainer } from "./styles";
import {
  faTrashAlt,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  jweetObj: IJweetWithId;
  isCreator: boolean;
}

const Jweet: VFC<IProps> = ({ jweetObj, isCreator }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newJweet, setNewJweet] = useState<string>(jweetObj.text);

  const onClickDelete = useCallback(async () => {
    const ok = window.confirm("Are you sure to delete this jweet?");

    if (ok) {
      dbService.doc(`jweets/${jweetObj.id}`).delete();
      jweetObj.fileUrl &&
        (await storageService.refFromURL(jweetObj.fileUrl).delete());
    }
  }, [jweetObj.fileUrl, jweetObj.id]);

  const toggleEditing = useCallback(() => {
    setEditing((prev) => !prev);
  }, []);

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!newJweet) {
        return;
      }
      await dbService.doc(`jweets/${jweetObj.id}`).update({
        text: newJweet,
      });
      setEditing(false);
    },
    [jweetObj.id, newJweet]
  );

  return (
    <div>
      {editing && isCreator ? (
        <EditJweetForm onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Edit your jweet"
            value={newJweet}
            onChange={onChange}
          />
          <Buttons>
            <button type="submit">
              <FontAwesomeIcon
                icon={faPencilAlt}
                style={{ width: "15px", height: "15px" }}
              />
            </button>
            <button type="button" onClick={toggleEditing}>
              <FontAwesomeIcon
                icon={faTimes}
                style={{ width: "15px", height: "15px" }}
              />
            </button>
          </Buttons>
        </EditJweetForm>
      ) : (
        <JweetContainer
          isCreator={isCreator}
          imgExit={Boolean(jweetObj.fileUrl)}
        >
          <div>{jweetObj.text}</div>
          {jweetObj.fileUrl && (
            <ImgWrapper>
              <div>
                <img alt="FileImage" src={jweetObj.fileUrl} />
              </div>
            </ImgWrapper>
          )}
          {isCreator && (
            <Buttons>
              <button type="button" onClick={onClickDelete}>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ width: "15px", height: "15px", color: "#444444" }}
                />
              </button>
              <button type="button" onClick={toggleEditing}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  style={{ width: "15px", height: "15px", color: "#444444" }}
                />
              </button>
            </Buttons>
          )}
        </JweetContainer>
      )}
    </div>
  );
};

export default Jweet;
