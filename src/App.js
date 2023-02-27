import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ListMythic from './pages/ListMythic';
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
import Teams from './tabs/Teams';
import Settings from './pages/Settings';
import Listings from './pages/Listings';

function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  console.log(currentUser)

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="wrapper">
          <Routes>
            <Route path="/">
              {/*
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />*/}
              <Route index element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="list-mythic" element={<ListMythic />} />
              <Route path="listings" element={<Listings />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
