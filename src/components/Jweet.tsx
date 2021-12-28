import { dbService, storageService } from "fbase";
import { useCallback, useState, VFC } from "react";
import { IJweetWithId } from "./JweetList";

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
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your jweet"
              value={newJweet}
              onChange={onChange}
            />
            <button type="submit">Edit Jweet</button>
          </form>
          <button type="button" onClick={toggleEditing}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {jweetObj.fileUrl && (
            <img
              alt="FileImage"
              src={jweetObj.fileUrl}
              width="50px"
              height="50px"
            />
          )}
          {isCreator && (
            <>
              <button type="button" onClick={onClickDelete}>
                Delete Jweet
              </button>
              <button type="button" onClick={toggleEditing}>
                Edit Jweet
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;
