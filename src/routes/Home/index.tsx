import { IUser } from "components/App";
import JweetFactory from "components/JweetFactory";
import JweetList from "components/JweetList";
import { VFC } from "react";
import { Container } from "./styles";

interface IProps {
  userObj: IUser;
}

const Home: VFC<IProps> = ({ userObj }) => {
  return (
    <Container>
      <JweetFactory userObj={userObj} />
      <JweetList userObj={userObj} />
    </Container>
  );
};

export default Home;
