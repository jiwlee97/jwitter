import { dbService } from "fbase";
import { useCallback, useState } from "react";

const Home = () => {
  const [jweet, setJweet] = useState<string>("");

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;

    setJweet(value);
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await dbService.collection("jweets").add({
        text: jweet,
        createdAt: Date.now(),
      });
      setJweet("");
    },
    [jweet]
  );

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
    </div>
  );
};

export default Home;
