import { useCallback, useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPasssword] = useState<string>("");

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
    (event) => {
      event.preventDefault();
      if (!email || !email.trim() || !password || !password.trim()) {
        return;
      }
      console.log("Log In");
    },
    [email, password]
  );

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
        <button type="submit">Log In</button>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
