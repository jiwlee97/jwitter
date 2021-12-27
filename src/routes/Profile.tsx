import { authService } from "fbase";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const onClickLogOut = useCallback(() => {
    authService.signOut();
    navigate("/");
  }, [navigate]);

  return (
    <div>
      Profile Page
      <button type="button" onClick={onClickLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
