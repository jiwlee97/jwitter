import { useCallback, useState } from "react";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPasssword] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(true);

  const onChange = useCallback((event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPasssword(value);
    }
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!email || !email.trim() || !password || !password.trim()) {
        return;
      }
      if (newAccount) {
        await authService
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            const { code, message } = error;
            if (code === "auth/weak-password") {
              window.alert("The password is too weak.");
            } else {
              window.alert(message);
            }
          });
      } else {
        await authService
          .signInWithEmailAndPassword(email, password)
          .catch((error) => {
            const { code, message } = error;
            if (code === "auth/wrong-password") {
              window.alert("Wrong Password");
            } else {
              window.alert(message);
            }
          });
      }
    },
    [email, newAccount, password]
  );

  const toggleAccount = useCallback(() => {
    setNewAccount((prev) => !prev);
  }, []);

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
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <button type="submit">
          {newAccount ? "Create Account" : "Log In"}
        </button>
      </form>
      <button type="button" onClick={toggleAccount}>
        {newAccount ? "Log In" : "Create Account"}
      </button>
      <div>
        <button name="google" onClick={onClickSocial}>
          Continue with Google
        </button>
        <button name="github" onClick={onClickSocial}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
