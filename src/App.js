import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Modal from './Pages/BillSystem/Modal';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login></Login>} />
          <Route path='/' element={<Login></Login>} />
          <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path='/billInfoUpdate/:id' element={<PrivateRoute><Modal></Modal></PrivateRoute>} />
          <Route path='/registration' element={<Registration></Registration>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
