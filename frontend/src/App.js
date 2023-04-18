import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";
import Home from "./components/pages/Home";
import FicheUser from "./components/pages/FicheUser";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    // n'importe quel composant pourront acceder aux contexte d'authentification grace aux provider(AuthContextProvider)

    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ficheUser/:id" element={<FicheUser />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
