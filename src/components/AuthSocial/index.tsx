import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fbase";
import { useCallback } from "react";
import { Button } from "./styles";

const AuthSocial = () => {
  const onClickSocial = useCallback(async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    provider && (await authService.signInWithPopup(provider));
  }, []);

  return (
    <div>
      <Button name="google" onClick={onClickSocial}>
        Continue with Google&nbsp;
        <FontAwesomeIcon icon={faGoogle} />
      </Button>
      <Button name="github" onClick={onClickSocial}>
        Continue with Github&nbsp;
        <FontAwesomeIcon icon={faGithub} />
      </Button>
    </div>
  );
};

export default AuthSocial;
