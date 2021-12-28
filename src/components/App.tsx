import { authService, FbaseUser } from "fbase";
import { useCallback, useEffect, useState } from "react";
import Router from "./Router";

export interface IUser {
  uid: string;
  displayName: string | null;
  updateProfile: (args: any) => Promise<void>;
}

function App() {
  const [init, setInit] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<IUser | null>(authService.currentUser);

  const refreshUser = useCallback(() => {
    const user = authService.currentUser;
    if (user) {
      setUserObj({
        uid: user.uid,
        displayName: user.displayName,
        updateProfile: async (args) => await user.updateProfile(args),
      });
    } else {
      setUserObj(null);
    }
  }, []);

  useEffect(() => {
    authService.onAuthStateChanged(async (user: FbaseUser | null) => {
      if (user) {
        if (!user.displayName) {
          await user.updateProfile({
            displayName: "User",
          });
        }
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: async (args) => await user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Router userObj={userObj} refreshUser={refreshUser} />
      ) : (
        <div>Initializing...</div>
      )}
    </>
  );
}

export default App;
