import { IUser } from "components/App";
import EditNickname from "components/EditNickname";
import { authService } from "fbase";
import { useCallback, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";

interface IProps {
  userObj: IUser;
  refreshUser: () => void;
}

const Profile: VFC<IProps> = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();

  const onClickLogOut = useCallback(async () => {
    navigate("/");
    await authService.signOut();
  }, [navigate]);

  return (
    <Container>
      <EditNickname userObj={userObj} refreshUser={refreshUser} />
      <button type="button" onClick={onClickLogOut}>
        Log Out
      </button>
    </Container>
  );
};

export default Profile;
