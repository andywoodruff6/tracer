import { Home } from "./Pages/Home";
import { SideBar } from "./Components/SideBar";
export const App = () => {
  return (
    <div className="flex justify-center">
      <SideBar />
      <Home />
    </div>
  );
};
