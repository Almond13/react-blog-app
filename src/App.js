import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./pages/Home";
import About from "./pages/About";
import List from "./pages/List";
import Detail from "./pages/AboutDatil";

function App() {
  return (
    <div className="App">
        <Link to="/about/1">about</Link>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}>
              <Route path=":page?" element={<List/>}>
              </Route>
              <Route path="post/:id?" element={<Detail/>}>
              </Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
