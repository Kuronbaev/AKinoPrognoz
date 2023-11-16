import { Route, Routes, UNSAFE_RouteContext } from "react-router-dom";
import "./App.css";
import ToDo from "./Components/ToDo";
import Input from "./Components/Input";
import Header from "./Components/Header";
import Country from "./Components/Country";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/todolist" element={<ToDo />} />
        <Route path="/country" element={<Country />} />
      </Routes>
    </>
  );
}

export default App;
