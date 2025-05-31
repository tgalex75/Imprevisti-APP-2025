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
    document.documentElement.style.setProperty("--clr-prim", primary.simpleRgb);
    document.documentElement.style.setProperty("--clr-sec", secondary.simpleRgb);
    document.documentElement.style.setProperty("--clr-ter", tertiary.simpleRgb);
    document.documentElement.style.setProperty("--clr-bg", colorBG.simpleRgb);
    document.documentElement.style.setProperty("--clr-txt", colorTxt.simpleRgb);
    document.documentElement.style.setProperty("--clr-btn", colorBtn.simpleRgb);
  }, [primary, secondary, tertiary, colorBG, colorTxt, colorBtn]);

  return (
    <main className="h-dvh w-screen lg:overflow-hidden">
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
