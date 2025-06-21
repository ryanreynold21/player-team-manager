import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const [count, setCount] = useState(0);
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  return (
    <>
      <div className=" bg-black w-screen h-screen text-white">Init</div>
    </>
  );
}

export default App;
