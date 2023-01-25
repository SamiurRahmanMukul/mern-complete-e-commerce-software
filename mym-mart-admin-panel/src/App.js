import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/middleware/PrivateRoute';
import PublicRoute from './components/middleware/PublicRoute';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME ROUTE */}
        <Route path='/' element={<Home />} />

        {/* DASHBOARD ROUTE */}
        <Route path='/dashboard/:tab' element={(<PrivateRoute><Dashboard /></PrivateRoute>)} />

        {/* LOGIN ROUTE */}
        <Route path='/auth/login' element={(<PublicRoute><Login /></PublicRoute>)} />

        {/* ERROR ROUTE */}
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
