import React from 'react'
import "./App.css";
// import '../src/CSS_Files/style.css';
// import { Button} from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';

function App() {
  return (
    <div className='Appstyle'>
      
        {/* <Button colorScheme='blue'>Button</Button> */}
        <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route exact path="/chat" element={<Chatpage/>} />
        </Routes>
    </div>
  );
}

export default App;
