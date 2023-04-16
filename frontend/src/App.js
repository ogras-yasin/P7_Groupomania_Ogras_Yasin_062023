import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";
import Home from "./components/pages/Home";
import FicheUser from "./components/pages/FicheUser";
import NotFound from "./components/pages/NotFound";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier l'état d'authentification au montage du composant
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  // console.log(isLoggedIn, "isloggggggedin home");
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  // console.log(isLoggedIn, "userloggedin");
  return (
    // n'importe quel composant pourront acceder aux contexte d'authentification grace aux provider(AuthContextProvider)
    // OBURU BUNU INDEX.jse koydu .Js387
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

// REGARDE CHAQUE PAGE  et comprendre le fonctionnement de mon site
