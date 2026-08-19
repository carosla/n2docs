import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { Manuals } from './pages/Manuals/Manuals';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manuais" element={<Manuals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;