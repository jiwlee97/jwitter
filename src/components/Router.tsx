import { FbaseUser } from "fbase";
import { VFC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

interface IProps {
  userObj: FbaseUser | null;
}

const Router: VFC<IProps> = ({ userObj }) => {
  return (
    <BrowserRouter>
      {userObj && <Navigation userObj={userObj} />}
      <Routes>
        {userObj ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="profile/*" element={<Profile userObj={userObj} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
