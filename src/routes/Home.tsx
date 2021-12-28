import { IUser } from "components/App";
import JweetFactory from "components/JweetFactory";
import JweetList from "components/JweetList";
import { VFC } from "react";

interface IProps {
  userObj: IUser;
}

const Home: VFC<IProps> = ({ userObj }) => {
  return (
    <>
      <JweetFactory userObj={userObj} />
      <JweetList userObj={userObj} />
    </>
  );
};

export default Home;
