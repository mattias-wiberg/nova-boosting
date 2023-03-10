import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListMythic from "./pages/ListMythic";
import "./style/style.scss";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import Listings from "./pages/Listings";
import History from "./pages/History";
import ListManager from "./pages/ListManager";

function App() {
  const { userAuth } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!userAuth) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  console.log(userAuth);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="wrapper">
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="settings" element={<Settings />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="list-mythic" element={<ListMythic />} />
              <Route path="listings" element={<Listings />} />
              <Route path="history" element={<History />} />
              <Route path="list-manager" element={<ListManager />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
