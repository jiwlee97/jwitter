import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import AuthForm from "components/AuthForm/AuthForm";
import AuthSocial from "components/AuthSocial/AuthSocial";

const Auth = () => {
  return (
    <>
      <FontAwesomeIcon icon={faTwitter} />
      <AuthForm />
      <AuthSocial />
    </>
  );
};

export default Auth;
