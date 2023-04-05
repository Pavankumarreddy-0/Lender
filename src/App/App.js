import './App.css';
import { PrivateRoute } from './auth/privateRoute';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './auth/LoginPage/loginPage';
import SignupPage from './auth/signupPage/signupPage';
import Dashboard from './dashboard/dashboard';
import Homepage from './homepage/homepage';
import Settings from './dashboard/Settings/Settings';
import RolesManagement from './dashboard/Settings/rolesManagement/RolesManagement';
import DashboardHome from './dashboard/Pages/dashboardHome/DashboardHome';
import CreateRole from './dashboard/Settings/createRole/createRole';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} exact></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} exact>
            <Route path="/dashboard/" element={<DashboardHome />} exact></Route>
              <Route path="/dashboard/settings" element={<Settings />} exact>
              </Route>
              <Route path="/dashboard/settings/roles" element={<RolesManagement />}>
                </Route>
              <Route path="/dashboard/settings/create-role" element={<CreateRole />}>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
