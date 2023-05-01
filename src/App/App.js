import React,{lazy,Suspense, useContext} from 'react'
import './App.css';
import { PrivateRoute } from './auth/privateRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './auth/LoginPage/loginPage';
import SignupPage from './auth/signupPage/signupPage';
import Dashboard from './dashboard/dashboard';
import Homepage from './homepage/homepage';
import CreateIndividualInvestor from './dashboard/Pages/individualInvestors/CreateIndividualInvestor/createIndividualInvestor';
import IndividualInvestorHomepage from './dashboard/Pages/individualInvestors/individualInvestorHomePage/individualInvestorHomepage';
import KeyboardShortcuts from './dashboard/Settings/keyboardShortcuts/keyboardShortcuts';
import ManageProfile from './dashboard/Pages/manageProfile/manageProfile';
import Loader from './dashboard/components/PageLoader/Loader';
import { webAppContext } from './contexts/contexts';
import NoAccess from './dashboard/components/NoAccessComp/NoAccess';
import UserLoginPage from './auth/userLoginPage/userLogin';
import GeneratePassword from './auth/generatePassword/GeneratePassword';
import { PrivateInvestorRoute } from './auth/privateInvestorRoute';
import PrivateDashboard from './privateInvestor/privateDashboard';
import InvestorKeyboardShortcuts from './privateInvestor/Settings/keyboardShortcuts/InvestorKeyboardShortcuts';
import ManageInvestorProfile from './privateInvestor/Pages/manageProfile/manageInvestorProfile';
import InvestorDashboardHome from './privateInvestor/Pages/dashboardHome/investorDashboardHome';


const DashboardHome = lazy(()=> import('./dashboard/Pages/dashboardHome/DashboardHome'));
const OrganizationHomepage = lazy(() => import('./dashboard/Pages/Organisations/organizationHomepage/organizationHomepage'));
const Settings = lazy(()=> import('./dashboard/Settings/Settings'));
const CreateRole = lazy(() => import('./dashboard/Settings/createRole/createRole'));
const RolesManagement = lazy(() => import('./dashboard/Settings/rolesManagement/RolesManagement'));
const CreateOrganisation = lazy(() => import('./dashboard/Pages/Organisations/CreateOrganisation/createOrganisation'));
const ViewPage = lazy(() => import('./dashboard/Pages/OrganizationViews/ViewPage/ViewPage'));
const BasicInfo = lazy(() => import('./dashboard/Pages/OrganizationViews/BasicInfo'));
const RobotsTxt = lazy(()=> import('./dashboard/Settings/seo/Robots_txt/RobotsTxt'));
const OrganizationDetails = lazy(() => import('./dashboard/Pages/OrganizationViews/OrganizationDetais/OrganizationDetails'));
const Address = lazy(()=> import('./dashboard/Pages/OrganizationViews/Address/Address'))
const IndViewPage=lazy(()=> import('./dashboard/Pages/individualInvestorViews/ViewPage/IndViewPage'))
const InvBasicInfo =lazy(()=> import('./dashboard/Pages/individualInvestorViews/InvBasicInfo'))
const InvestorSettings = lazy(()=> import('./privateInvestor/Settings/investorSettings'))

function App() {

  const {__webAppSettings, } = useContext(webAppContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} exact></Route>
          <Route path="/admin/login" element={<LoginPage />}></Route>
          <Route path="/password/generate/:encryptedHash" element={<GeneratePassword />}></Route>
          <Route path="/login" element={<UserLoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/investor" element={<PrivateInvestorRoute/> }>
            <Route path="/investor" element={<PrivateDashboard />} exact>
            <Route path="/investor/" element={<InvestorDashboardHome/>} exact></Route>
            <Route path="/investor/dashboard" element={<InvestorDashboardHome/>} exact></Route>
            <Route path="/investor/wallet" element={<h1>Wallet</h1>} exact></Route>
            <Route path="/investor/investments" element={<h1>Investment</h1>} exact></Route>
            <Route path="/investor/interest" element={<h1>Interest</h1>} exact></Route>
            <Route path="/investor/transactions" element={<h1>Transaction</h1>} exact></Route>
            <Route path="/investor/auto-investment" element={<h1>Auto Invest</h1>} exact></Route>
            <Route path="/investor/aggrements" element={<h1>Aggrements</h1>} exact></Route>
            <Route path="/investor/notifications" element={<h1>Nottification</h1>} exact></Route>
            <Route path="/investor/settings" element={<InvestorSettings></InvestorSettings>} exact></Route>
            <Route path="/investor/settings/keyboard-shortcuts/" element={<InvestorKeyboardShortcuts />}>
              </Route>
            <Route path="/investor/settings/profile/" element={ <ManageInvestorProfile /> }></Route>
            </Route>
          </Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} exact>
              <Route path="/dashboard/" element={(__webAppSettings.pageAccess.Dashboard) ? <Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><DashboardHome /></Suspense></Suspense> : <NoAccess/>} exact></Route>
              <Route path="/dashboard/settings" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><Settings /></Suspense></Suspense>} exact>
              </Route>
              <Route path="/dashboard/platform" element={(__webAppSettings.pageAccess.Platform) ? <h1>Platform</h1> : <NoAccess/>} exact>
              </Route>
              <Route path="/dashboard/crowdfunding" element={(__webAppSettings.pageAccess.CrowdFunding) ? <h1>crowdfunding</h1> : <NoAccess/>} exact>
              </Route>
              <Route path="/dashboard/community" element={(__webAppSettings.pageAccess.Community) ? <h1>community</h1> : <NoAccess/>} exact>
              </Route>
              <Route path="/dashboard/community/organizations/" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><OrganizationHomepage /></Suspense></Suspense>} exact>
              </Route>
              <Route path="/dashboard/community/organizations/create" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><CreateOrganisation /></Suspense></Suspense>} exact>
              </Route>
              <Route path="/dashboard/community/individual-investor/" element={<IndividualInvestorHomepage />} exact>
              </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><IndViewPage /></Suspense></Suspense>} exact>
                
                <Route path="/dashboard/community/individual-investor/view/:investorId/" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><InvBasicInfo/></Suspense>  </Suspense>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/basic-info" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><InvBasicInfo/></Suspense>  </Suspense>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/details" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><OrganizationDetails/></Suspense></Suspense>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/address" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><Address/></Suspense></Suspense>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/payments" element={<h1>payment</h1>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/repayments" element={<h1>repayment</h1>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/documents" element={<h1>docs</h1>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/investments" element={<h1>Investment</h1>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/deals" element={<h1>deals</h1>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/customfeilds" element={<h1>customfeilds</h1>} exact>
                </Route>
                <Route path="/dashboard/community/individual-investor/view/:investorId/history" element={<h1>history</h1>} exact>
                </Route>
                </Route> 
              <Route path="/dashboard/community/individual-investor/create" element={<CreateIndividualInvestor />} exact>
              </Route>
              <Route path="/dashboard/community/organizations/view/:organizationId" element={<ViewPage />} exact>
                <Route path="/dashboard/community/organizations/view/:organizationId/" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><BasicInfo /></Suspense></Suspense>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/basic-info" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><BasicInfo /></Suspense>  </Suspense>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/details" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><OrganizationDetails/></Suspense></Suspense>} exact>
                </Route>
                <Route path="/dashboard/community/organizations/view/:organizationId/address" element={<Suspense fallback={<Loader/>}><Suspense fallback={<Loader/>}><Address/></Suspense></Suspense>} exact>
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
              <Route path="/dashboard/everything" element={(__webAppSettings.pageAccess.Everything) ? <h1>everything</h1> : <NoAccess/>} exact>
              </Route>
             <Route path="/dashboard/investments" element={(__webAppSettings.pageAccess.Investment) ? <h1>investments</h1> :  <NoAccess/>} exact>
              </Route> 
              <Route path="/dashboard/settings/roles" element={<Suspense fallback={<Loader/>}><RolesManagement /></Suspense>}>
              </Route>
              <Route path="/dashboard/settings/profile" element={<ManageProfile />}>
              </Route>
              <Route path="/dashboard/settings/keyboard-shortcuts/" element={<KeyboardShortcuts />}>
              </Route>
              <Route path="/dashboard/settings/create-role" element={<Suspense fallback={<Loader/>}><CreateRole /></Suspense>}>
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
