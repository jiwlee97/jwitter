import { VFC } from "react";
import { Link } from "react-router-dom";
import { IUser } from "components/App";
import { Nav } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  userObj: IUser | null;
}

const Navigation: VFC<IProps> = ({ userObj }) => {
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "#1C6DD0", height: "50px", width: "50px" }}
            />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{
                color: "#1C6DD0",
                height: "40px",
                width: "40px",
                marginBottom: "5px",
              }}
            />
            <span>{userObj?.displayName}'s Profile</span>
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;
