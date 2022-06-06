import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import Detail from "./Components/Detail";
import Created from "./Components/Created";
//import VideogameCreate from "./components/VideogameCreate";
//import Detail from "./components/Detail";
 
//Tengo que envolver en el BrowserRouter para usar el ROUTE y setear las rutas
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/videogame" element={<Created />} />
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;