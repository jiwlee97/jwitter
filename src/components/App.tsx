import { authService, FbaseUser } from "fbase";
import { useEffect, useState } from "react";
import Router from "./Router";

function App() {
  const [init, setInit] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<FbaseUser | null>(
    authService.currentUser
  );

  useEffect(() => {
    authService.onAuthStateChanged((user: FbaseUser | null) => {
      if (!user?.displayName) {
        user?.updateProfile({
          displayName: "User",
        });
      }
      setUserObj(user);
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <Router userObj={userObj} /> : <div>Initializing...</div>}</>
  );
}

export default App;
