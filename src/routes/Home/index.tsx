import { IUser } from "components/App";
import JweetFactory from "components/JweetFactory";
import JweetList from "components/JweetList";
import { useEffect, useRef, VFC } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Container } from "./styles";

interface IProps {
  userObj: IUser;
}

const Home: VFC<IProps> = ({ userObj }) => {
  const scrollRef = useRef<Scrollbars>(null);

  useEffect(() => {
    scrollRef.current?.scrollToTop();
  }, []);

  return (
    <Container>
      <JweetFactory userObj={userObj} scrollRef={scrollRef} />
      <Scrollbars
        autoHide
        ref={scrollRef}
        style={{ width: "100%", marginBottom: "60px" }}
      >
        <JweetList userObj={userObj} />
      </Scrollbars>
    </Container>
  );
};

export default Home;
