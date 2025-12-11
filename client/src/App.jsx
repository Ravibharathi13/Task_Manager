import { useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Auth setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;
