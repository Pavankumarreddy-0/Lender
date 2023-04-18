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
import CreateOrganisation from './dashboard/Pages/Organisations/CreateOrganisation/createOrganisation';
import OrganizationHomepage from './dashboard/Pages/Organisations/organizationHomepage/organizationHomepage';
import RobotsTxt from './dashboard/Settings/seo/Robots_txt/RobotsTxt';
import ViewPage from './dashboard/components/OrganizationViews/ViewPage/ViewPage';
import BasicInfo from './dashboard/components/OrganizationViews/BasicInfo';
import CreateIndividualInvestor from './dashboard/Pages/individualInvestors/CreateIndividualInvestor/createIndividualInvestor';
import IndividualInvestorHomepage from './dashboard/Pages/individualInvestors/individualInvestorHomePage/individualInvestorHomepage';
import KeyboardShortcuts from './dashboard/Settings/keyboardShortcuts/keyboardShortcuts';
import ManageProfile from './dashboard/Pages/manageProfile/manageProfile';

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
              <Route path="/dashboard/platform" element={<h1>Platform</h1>} exact>
              </Route>
              <Route path="/dashboard/crowdfunding" element={<h1>crowdfunding</h1>} exact>
              </Route>
              <Route path="/dashboard/community" element={<h1>community</h1>} exact>
              </Route>
              <Route path="/dashboard/community/organizations/" element={<OrganizationHomepage />} exact>
              </Route>
              <Route path="/dashboard/community/organizations/create" element={<CreateOrganisation />} exact>
              </Route>
              <Route path="/dashboard/community/individual-investor/" element={<IndividualInvestorHomepage />} exact>
              </Route>
              <Route path="/dashboard/community/individual-investor/create" element={<CreateIndividualInvestor />} exact>
              </Route>
              <Route path="/dashboard/community/organizations/view/:organizationId" element={<ViewPage />} exact>
                <Route path="/dashboard/community/organizations/view/:organizationId/" element={<BasicInfo />} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/basic-info" element={<BasicInfo />} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/details" element={<h1>Details</h1>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/address" element={<h1>address</h1>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/payments" element={<h1>payment</h1>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/repayments" element={<h1>repayment</h1>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/documents" element={<h1>docs</h1>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/investments" element={<h1>Investment</h1>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/deals" element={<h1>deals</h1>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/customfeilds" element={<h1>customfeilds</h1>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/history" element={<h1>history</h1>} exact>
                </Route>
              </Route>  {/** views page */}
              <Route path="/dashboard/everything" element={<h1>everything</h1>} exact>
              </Route>
              <Route path="/dashboard/investments" element={<h1>investments</h1>} exact>
              </Route>
              <Route path="/dashboard/settings/roles" element={<RolesManagement />}>
              </Route>
              <Route path="/dashboard/settings/profile" element={<ManageProfile />}>
              </Route>
              <Route path="/dashboard/settings/keyboard-shortcuts/" element={<KeyboardShortcuts />}>
              </Route>
              <Route path="/dashboard/settings/create-role" element={<CreateRole />}>
              </Route>
              <Route path="/dashboard/settings/seo/robots-txt" element={<RobotsTxt />}>
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
