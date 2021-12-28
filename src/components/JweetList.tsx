import { dbService } from "fbase";
import { useEffect, useState, VFC } from "react";
import { IUser } from "./App";
import Jweet from "./Jweet";

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
  }, [userObj.uid]);

  return (
    <div>
      {jweetsWithId.map((jweetWithId) => (
        <Jweet
          key={jweetWithId.id}
          jweetObj={jweetWithId}
          isCreator={jweetWithId.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default JweetList;
