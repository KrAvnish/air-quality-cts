import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import SensorDataForm from './SensorDataForm';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';


export const PostContext = createContext();
// function App() {
  

//   const [post, setPost] = useState([]);

//   const changeData = (newData) => {
//     setPost([...post, newData]);
//   };
//   return (
//     <div className="App">
//       <ToastContainer theme='colored' position='top-center'></ToastContainer>
//       <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Home/>}></Route>
//         <Route path='/login' element={<Login/>}></Route>
//         <Route path='/register' element={<Register/>}></Route>
//       </Routes>
      
//       </BrowserRouter>
//       {/* <SensorDataForm changeData = {changeData} /> */}

//       <SensorDataForm post={post} setPost={setPost} />

      
      
//     </div>
//   );
// }

function App() {
  const [post, setPost] = useState([]);
  
  return (
    <PostContext.Provider value={{ post, setPost }}>
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
      </BrowserRouter>
      <SensorDataForm />
    </PostContext.Provider>
  );
}


export default App;

// npx json-server --watch db.json --port 9000