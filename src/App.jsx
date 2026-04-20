import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import FloralBackground from './components/FloralBackground';
import FabButtons from './components/FabButtons';
import Home from './pages/Home';
import Presentes from './pages/Presentes';

export default function App() {
  return (
    <>
      <Loader />
      <FloralBackground />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentes" element={<Presentes />} />
      </Routes>

      <FabButtons />
    </>
  );
}
