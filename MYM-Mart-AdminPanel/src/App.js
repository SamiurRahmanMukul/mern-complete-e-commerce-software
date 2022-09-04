import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* COMMON ROUTE'S */}
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFound />} />

        {/* PRIVATE ROUTE'S */}
        <Route
          path='/admin/:tab'
          element={(<PrivateRoute><Admin /></PrivateRoute>)}
        />

        {/* PUBLIC ROUTE'S */}
        <Route
          path='/auth/login'
          element={(<PublicRoute><Login /></PublicRoute>)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
