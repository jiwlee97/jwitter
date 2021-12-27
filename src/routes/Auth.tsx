import { useCallback, useState } from "react";
import { authService } from "fbase";

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
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
