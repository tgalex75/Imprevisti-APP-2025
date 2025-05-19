import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../Pages/Home";
import Prepartita from "../Pages/Prepartita";
import Settimana from "../Pages/Settimana";
import SalvaPerDopo from "../Pages/SalvaPerDopo";
import RiepilogoImprevisti from "../Pages/RiepilogoImprevisti";
import IngaggiMercatoRinnovi from "../Pages/IngaggiMercatoRinnovi";
import SaldoPunti from "../Pages/SaldoPunti";
import SerieNegativa from "../Pages/SerieNegativa";
import ErrorPage from "../Pages/ErrorPage";
import EditorImprevisti from "../Pages/EditorImprevisti";
import EditorPrepartita from "../Funzioni/EditorPrepartita";
import EditorSettimana from "../Funzioni/EditorSettimana";
import EditorSerieNegativa from "../Funzioni/EditorSerieNegativa";
import EditorIngaggi from "../Funzioni/EditorIngaggi";
import EditorSpeciali from "../Funzioni/EditorSpeciali";
import EditorSaldoPunti from "../Funzioni/EditorSaldoPunti";
import EditorInterfaccia from "../Pages/EditorInterfaccia";
import EstrazioneLibera from "../Pages/EstrazioneLibera";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/prepartita" element={<Prepartita />} />
        <Route path="/settimana" element={<Settimana />} />
        <Route path="/editor-imprevisti" element={<EditorImprevisti />} />
        <Route path="/editor-prepartita" element={<EditorPrepartita />} />
        <Route path="/editor-settimana" element={<EditorSettimana />} />
        <Route path="/editor-serie-negativa" element={<EditorSerieNegativa />} />
        <Route path="/editor-ingaggi" element={<EditorIngaggi />} />
        <Route path="/editor-speciali" element={<EditorSpeciali />} />
        <Route path="/editor-saldo-punti" element={<EditorSaldoPunti />} />
        <Route path="/editor-interfaccia" element={<EditorInterfaccia />} />
        <Route path="/riepilogo-imprevisti" element={<RiepilogoImprevisti />} />
        <Route path="/imprevisti-sospesi" element={<SalvaPerDopo />} />
        <Route path="/saldo-punti" element={<SaldoPunti />} />
        <Route
          path="/ingaggio"
          element={<IngaggiMercatoRinnovi tipoImprevisto="Ingaggio" />}
        />
        <Route path="/estrazione-libera" element={<EstrazioneLibera />} />
        <Route path="/serie-negativa" element={<SerieNegativa />} />
        <Route
          path="/offerte-mercato"
          element={<IngaggiMercatoRinnovi tipoImprevisto="Mercato" />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
