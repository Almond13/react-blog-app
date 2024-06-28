import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./pages/Home";
import About from "./pages/About";
import List from "./pages/List";

function App() {
  return (
    <div className="App">
        <Link to="/about">about</Link>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}>
              <Route path=":id?" element={<List/>}>
              </Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
