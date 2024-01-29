import { RouterProvider } from "react-router";
import "./css/global.css";
import router from "./services/router";

function App() {
  console.log("app");

  return <RouterProvider router={router} />;
}

export default App;
