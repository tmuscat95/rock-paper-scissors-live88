import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { useAppSelector } from './app/store';
import Game from './components/Game';
import Login from './components/Login';


export default function Router() {
  const isAuthenticated = useAppSelector(state => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Game />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}