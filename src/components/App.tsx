import { authService, FbaseUser } from "fbase";
import { useEffect, useState } from "react";
import Router from "./Router";

function App() {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<FbaseUser | null>(
    authService.currentUser
  );

  useEffect(() => {
    authService.onAuthStateChanged((user: FbaseUser | null) => {
      setIsLoggedIn(user);
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : <div>Initializing...</div>}
    </>
  );
}

export default App;
