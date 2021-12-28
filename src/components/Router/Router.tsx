import { VFC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth/Auth";
import Home from "routes/Home/Home";
import Profile from "routes/Profile/Profile";
import { IUser } from "../App/App";
import Navigation from "../Navigation/Navigation";

interface IProps {
  userObj: IUser | null;
  refreshUser: () => void;
}

const Router: VFC<IProps> = ({ userObj, refreshUser }) => {
  return (
    <BrowserRouter>
      {userObj && <Navigation userObj={userObj} />}
      <Routes>
        {userObj ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="profile/*"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
