import React, { useEffect, useRef} from 'react'
import './App.css';
import Footer from './Footer';
import Main from './Main';
import Nav from './Nav';


function App() {
  
  
  return (
    <div className="App">
      <div className="container">
        <Nav className="container1"/>
        <Main className="container1"/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
