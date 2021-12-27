import { FbaseUser } from "fbase";
import { VFC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  userObj: FbaseUser | null;
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
