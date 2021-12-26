import { useState } from "react";
import Router from "./Router";

function App() {
  const [isLoggedIn] = useState<boolean>(true);

  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
