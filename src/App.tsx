import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Cardano from "./pages/cardano";
import "./style/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Cardano />
      <Footer />
    </div>
  );
}

export default App;
