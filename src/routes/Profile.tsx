import { IUser } from "components/App";
import EditNickname from "components/EditNickname";
import { authService } from "fbase";
import { useCallback, VFC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  userObj: IUser;
  refreshUser: () => void;
}

const Profile: VFC<IProps> = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();

  const onClickLogOut = useCallback(() => {
    authService.signOut();
    navigate("/");
  }, [navigate]);

  return (
    <>
      <div>
        <h4>My Nickname: {userObj.displayName}</h4>
        <EditNickname userObj={userObj} refreshUser={refreshUser} />
      </div>
      <button type="button" onClick={onClickLogOut}>
        Log Out
      </button>
    </>
  );
};

export default Profile;
