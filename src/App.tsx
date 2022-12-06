import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Cardano from "./pages/cardano";
import "./style/App.css";

function App() {
  const [blockchain, setBlockchain] = useState("cardano");

  return (
    <div className="App">
      <Header />
      {blockchain == "cardano" ? <Cardano /> : null}
      {/* Add other blockchains here with the same ternary */}
      <Footer />
    </div>
  );
}

export default App;
