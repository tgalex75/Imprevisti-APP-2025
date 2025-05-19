import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sfondo from "./Components/Sfondo";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { useEffect, useContext } from "react";
import ColorContext from "./context/colorContext";

function App(props) {
  const { primary, secondary, tertiary, colorBG, colorTxt, colorBtn } =
    useContext(ColorContext);

  useEffect(() => {
    document.documentElement.style.setProperty("--clr-prim", primary);
    document.documentElement.style.setProperty("--clr-sec", secondary);
    document.documentElement.style.setProperty("--clr-ter", tertiary);
    document.documentElement.style.setProperty("--clr-bg", colorBG);
    document.documentElement.style.setProperty("--clr-txt", colorTxt);
    document.documentElement.style.setProperty("--clr-btn", colorBtn);
  }, [primary, secondary, tertiary, colorBG, colorTxt, colorBtn]);

  return (
    <main className="h-dvh w-screen xl:overflow-hidden">
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
      <Footer />
      <Sfondo />
    </main>
  );
}
export default App;
