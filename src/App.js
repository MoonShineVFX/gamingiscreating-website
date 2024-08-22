import { BrowserRouter , Routes, Route,useLocation} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


import PageLayout from './Layouts/PageLayout'
import { ImageProvider } from "./Helper/ImageContext";
import Home from './Pages/Home';
import Character from './Pages/Character';
import Camera from './Pages/Camera'
import Final from './Pages/Final'
import MobileQrPage from './Pages/MobileQrPage';
function App() {
  return (
    <ImageProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />} >
          <Route path="/" element={<AnimatePage><Home /></AnimatePage>} />
          <Route path="/character" element={<AnimatePage><Character /></AnimatePage>} />
          <Route path="/camera" element={<AnimatePage><Camera /></AnimatePage>} />
          <Route path="/final" element={<AnimatePage><Final /></AnimatePage>} />
          <Route path="/qr" element={<AnimatePage><MobileQrPage /></AnimatePage>} />
        </Route>

      </Routes>
    </BrowserRouter>
    </ImageProvider>
  );
}

const AnimatePage = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
