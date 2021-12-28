import { authService, firebaseInstance } from "fbase";
import { useCallback } from "react";

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
      <button name="google" onClick={onClickSocial}>
        Continue with Google
      </button>
      <button name="github" onClick={onClickSocial}>
        Continue with Github
      </button>
    </div>
  );
};

export default AuthSocial;
