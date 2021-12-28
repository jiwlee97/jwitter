import { VFC } from "react";
import { Link } from "react-router-dom";
import { IUser } from "./App";

interface IProps {
  userObj: IUser | null;
}

const Navigation: VFC<IProps> = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj?.displayName}'s Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
