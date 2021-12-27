import { dbService, FbaseUser } from "fbase";
import { useCallback, useEffect, useState, VFC } from "react";

interface IProps {
  userObj: FbaseUser;
}

interface IJweetWithId {
  text: string;
  createdAt: Date;
  creatorId: string;
  id: string;
}

const Home: VFC<IProps> = ({ userObj }) => {
  const [jweet, setJweet] = useState<string>("");
  const [jweetsWithId, setJweetsWithId] = useState<IJweetWithId[]>([]);

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;

    setJweet(value);
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!jweet) {
        return;
      }
      await dbService.collection("jweets").add({
        text: jweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setJweet("");
    },
    [jweet, userObj.uid]
  );

  useEffect(() => {
    dbService
      .collection("jweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const jweetArray = snapshot.docs.map((doc) => ({
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          creatorId: userObj.uid,
          id: doc.id,
        }));
        setJweetsWithId(jweetArray);
      });
  }, [userObj.uid]);

  return (
    <div>
      Home Page
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={jweet}
          onChange={onChange}
        />
        <button type="submit">Jweet</button>
      </form>
      <div>
        {jweetsWithId.map((jweetWithId) => {
          return <div key={jweetWithId.id}>{jweetWithId.text}</div>;
        })}
      </div>
    </div>
  );
};

export default Home;
