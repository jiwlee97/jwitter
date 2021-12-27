import { dbService } from "fbase";
import { useCallback, useEffect, useState } from "react";

interface IJweetWithId {
  text: string;
  createdAt: Date;
  id: string;
}

const Home = () => {
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
      });
      setJweet("");
    },
    [jweet]
  );

  const getJweets = useCallback(async () => {
    const dbJweets = await dbService
      .collection("jweets")
      .orderBy("createdAt")
      .get();
    dbJweets.forEach((result) => {
      const jweetObj: IJweetWithId = {
        text: result.data().text,
        createdAt: result.data().createdAt,
        id: result.id,
      };
      setJweetsWithId((prev) => [jweetObj, ...prev]);
    });
  }, []);

  useEffect(() => {
    getJweets();
  }, [getJweets]);

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
