import { FbaseUser } from "fbase";
import { VFC } from "react";
import { Link } from "react-router-dom";

interface Props {
  userObj: FbaseUser | null;
}

const Navigation: VFC<Props> = ({ userObj }) => {
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
