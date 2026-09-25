import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { NewSession } from './pages/NewSession';
import { SessionSetup } from './pages/SessionSetup';
import { PitchRoom } from './pages/PitchRoom';
import { Report } from './pages/Report';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

// Route protector using mock authentication
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Full-Screen Immersive Pitch Room (No distracting navbar) */}
        <Route
          path="/session/:sessionId/room"
          element={
            <ProtectedRoute>
              <PitchRoom />
            </ProtectedRoute>
          }
        />

        {/* Standard Application Shell Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="session/new" element={<NewSession />} />
          <Route path="session/:sessionId/setup" element={<SessionSetup />} />
          <Route path="session/:sessionId/report" element={<Report />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
