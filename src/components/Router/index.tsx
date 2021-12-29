import { VFC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import { IUser } from "components/App";
import Navigation from "components/Navigation";
import { Background } from "./styles";

interface IProps {
  userObj: IUser | null;
  refreshUser: () => void;
}

const Router: VFC<IProps> = ({ userObj, refreshUser }) => {
  return (
    <Background>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {userObj && <Navigation userObj={userObj} />}
        <Routes>
          {userObj ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="profile/*"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
      </BrowserRouter>
    </Background>
  );
};

export default Router;
