import { authService, FbaseUser } from "fbase";
import { useCallback, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  userObj: FbaseUser;
}

const Profile: VFC<IProps> = ({ userObj }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState<boolean>(false);
  const [newDisplayName, setNewDisplayName] = useState<string>(
    userObj.displayName ?? "User"
  );

  const toggleEditing = useCallback(() => {
    setEditing((prev) => !prev);
  }, []);

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
    },
    [newDisplayName, userObj]
  );

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }, []);

  const onClickLogOut = useCallback(() => {
    authService.signOut();
    navigate("/");
  }, [navigate]);

  return (
    <div>
      Profile Page
      {editing ? (
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
      ) : (
        <div>
          <h4>My Nickname: {userObj.displayName}</h4>
          <button type="button" onClick={toggleEditing}>
            Edit Nickname
          </button>
        </div>
      )}
      <button type="button" onClick={onClickLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
