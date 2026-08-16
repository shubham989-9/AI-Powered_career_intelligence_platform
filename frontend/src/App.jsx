import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("night-violet");

    return () => {
      document.documentElement.classList.remove("night-violet");
    };
  }, []);

  return <AppRoutes />;
}

export default App;