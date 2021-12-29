import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import AuthForm from "components/AuthForm";
import AuthSocial from "components/AuthSocial";
import { Container } from "./styles";

const Auth = () => {
  return (
    <Container>
      <FontAwesomeIcon
        icon={faTwitter}
        style={{
          color: "#1C6DD0",
          height: "80px",
          width: "80px",
          marginBottom: "10px",
        }}
      />
      <AuthForm />
      <AuthSocial />
    </Container>
  );
};

export default Auth;
