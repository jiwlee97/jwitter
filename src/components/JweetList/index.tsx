import { dbService } from "fbase";
import { useEffect, useState, VFC } from "react";
import { IUser } from "components/App";
import Jweet from "components/Jweet";
import { JweetsWrapper } from "./styles";

interface IProps {
  userObj: IUser;
}

export interface IJweetWithId {
  text: string;
  createdAt: Date;
  creatorId: string;
  fileUrl: string;
  id: string;
}

const JweetList: VFC<IProps> = ({ userObj }) => {
  const [jweetsWithId, setJweetsWithId] = useState<IJweetWithId[]>([]);

  useEffect(() => {
    dbService
      .collection("jweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const jweetArray = snapshot.docs.map((doc) => ({
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          creatorId: doc.data().creatorId,
          fileUrl: doc.data().fileUrl,
          id: doc.id,
        }));
        setJweetsWithId(jweetArray);
      });
    return () => {
      setJweetsWithId([]);
    };
  }, []);

  return (
    <JweetsWrapper>
      {jweetsWithId.map((jweetWithId) => (
        <Jweet
          key={jweetWithId.id}
          jweetObj={jweetWithId}
          isCreator={jweetWithId.creatorId === userObj.uid}
        />
      ))}
    </JweetsWrapper>
  );
};

export default JweetList;
