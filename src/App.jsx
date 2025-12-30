import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/homepage";
import CreateIssue from "./pages/CreateIssue";
import IssuesList from "./pages/IssuesList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/create" element={
          <ProtectedRoute>
            <CreateIssue />
          </ProtectedRoute>
        } />

        <Route path="/issues" element={
          <ProtectedRoute>
            <IssuesList />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
