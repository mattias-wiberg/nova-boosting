import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import "./style/style.scss";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Teams from './pages/Teams';

function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="wrapper">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="teams" element={<Teams />} />
              {/*
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />*/}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
