import { authService, FbaseUser } from "fbase";
import { useState } from "react";
import Router from "./Router";

function App() {
  const [isLoggedIn] = useState<FbaseUser | null>(authService.currentUser);

  console.log(isLoggedIn);
  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
