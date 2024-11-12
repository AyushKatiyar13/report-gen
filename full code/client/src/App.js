
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Report from './Components/Report';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import ManageMasterTabs from './Components/ManageMasterTabs';
import ReportList from './Components/ReportList';
import AllUsers from './Components/AllUsers';
import Protected from "./Helpers/Protected";
import AdminProtected from "./Helpers/AdminRoute";

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/newproject" element={<Protected><Report /></Protected>} />
            <Route exact path="/signup" element={<AdminProtected><Signup /></AdminProtected>} />
            <Route exact path="/myprofile" element={<Protected><Profile /></Protected>} />
            <Route exact path="/managemaster" element={<AdminProtected><ManageMasterTabs /></AdminProtected>} />
            <Route exact path="/reports" element={<Protected><ReportList /></Protected>} />
            <Route exact path="/allUsers" element={<AdminProtected><AllUsers /></AdminProtected>} />
            <Route  exact path="/reports/:id/" element={<Protected><ReportList /></Protected>} />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
