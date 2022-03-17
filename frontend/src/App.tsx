import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './components/Contexts/Auth';
import YumlyThemeProvider from './components/Core/Theme/Theme';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from './components/Pages/Dashboard';
import { WrapperProfile as Profile } from './components/Pages/Profile';
import Login from './components/Pages/Login';
import NotFound from './components/Pages/NotFound';
import LandingPage from './components/Pages/LandingPage';
import Loading from './components/Pages/Loading';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <YumlyThemeProvider>
        <AppRouter />
        <div id="_overlay"></div>
      </YumlyThemeProvider>
    </AuthProvider>
  );
}

const AppRouter: React.FC = () => {
  const { isAuth, auth, isLoading } = useContext(AuthContext);
  console.log("AppRouter", { isAuth, auth })
  if (isLoading) {
    return <Loading />
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={(isAuth ? <Navigate replace to="/dashboard"/> : <LandingPage />)}/>
        <Route path='/login' element={(isAuth ? <Navigate replace to="/dashboard"/> : <Login />)}/>
        <Route path='/dashboard/*' element={( isAuth ? <Dashboard /> : <LandingPage />)}/>
        {/* <Route exact path='/test' component={Test} /> */}
        <Route
          path='/:username'
          element={<Profile />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
