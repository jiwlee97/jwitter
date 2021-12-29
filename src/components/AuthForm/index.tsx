import { authService } from "fbase";
import { useCallback, useState } from "react";
import { Container, Form } from "./styles";

const AuthForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPasssword] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(false);

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
    <Container>
      <Form onSubmit={onSubmit}>
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
      </Form>
      <button type="button" onClick={toggleAccount}>
        {newAccount ? "Log In" : "Create Account"}
      </button>
    </Container>
  );
};

export default AuthForm;
