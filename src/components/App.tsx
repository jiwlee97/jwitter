import { useState } from "react";
import { authService } from "../fbase";
import Router from "./Router";

function App() {
  const [isLoggedIn] = useState<boolean>(true);

  console.log(authService);

  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
