import { useCallback, useState, VFC } from "react";
import { IUser } from "./App";

interface IProps {
  userObj: IUser;
  refreshUser: () => void;
}

const EditNickname: VFC<IProps> = ({ userObj, refreshUser }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newDisplayName, setNewDisplayName] = useState<string>(
    userObj.displayName ?? "User"
  );

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!newDisplayName || newDisplayName === userObj.displayName) {
        return;
      }
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      setEditing(false);
      refreshUser();
    },
    [newDisplayName, refreshUser, setEditing, userObj]
  );

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }, []);

  const toggleEditing = useCallback(() => {
    setEditing((prev) => !prev);
  }, []);

  if (!editing) {
    return (
      <button type="button" onClick={toggleEditing}>
        Edit Nickname
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Nickname"
        value={newDisplayName}
        onChange={onChange}
      />
      <button type="submit">Edit Nickname</button>
      <button type="button" onClick={toggleEditing}>
        Cancel
      </button>
    </form>
  );
};

export default EditNickname;
