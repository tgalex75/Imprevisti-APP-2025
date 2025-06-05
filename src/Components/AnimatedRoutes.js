import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../Pages/Home";
import Prepartita from "../Pages/Prepartita";
import Settimana from "../Pages/Settimana";
import SalvaPerDopo from "../Pages/SalvaPerDopo";
import IngaggiMercato from "../Pages/IngaggiMercato";
import MediaOverall from "../Pages/MediaOverall"
import SaldoPunti from "../Pages/SaldoPunti";
import SerieNegativa from "../Pages/SerieNegativa";
import ErrorPage from "../Pages/ErrorPage";
import EditorImprevisti from "../Pages/EditorImprevisti";
import EditorPrepartita from "../Pages/Editors/EditorPrepartita";
import EditorSettimana from "../Pages/Editors/EditorSettimana";
import EditorSerieNegativa from "../Pages/Editors/EditorSerieNegativa";
import EditorIngaggi from "../Pages/Editors/EditorIngaggi";
import EditorSpeciali from "../Pages/Editors/EditorSpeciali";
import EditorSaldoPunti from "../Pages/Editors/EditorSaldoPunti";
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
        <Route path="/impostazioni-app" element={<EditorInterfaccia />} />
        <Route path="/imprevisti-sospesi" element={<SalvaPerDopo />} />
        <Route path="/media-overall" element={<MediaOverall />} />
        <Route path="/saldo-punti" element={<SaldoPunti />} />
        <Route
          path="/ingaggio"
          element={<IngaggiMercato tipoImprevisto="Ingaggi" />}
        />
        <Route path="/estrazione-libera" element={<EstrazioneLibera />} />
        <Route path="/serie-negativa" element={<SerieNegativa />} />
        <Route
          path="/offerte-mercato"
          element={<IngaggiMercato tipoImprevisto="Mercato" />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
