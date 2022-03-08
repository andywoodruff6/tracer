import { Home } from "./Pages/Home";
import { SideBar } from "./Components/SideBar";
import { Footer } from "./Components/Footer";
export const App = () => {
  return (
    <>
      <div className="flex justify-center">
        <SideBar />
        <Home />
      </div>
      <Footer />
    </>
  );
};
