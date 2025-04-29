import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/jobs/JobsPage';
import JobDetailsPage from './pages/jobs/JobDetailsPage';
import SeekerDashboardPage from './pages/dashboard/SeekerDashboardPage';
import EmployerDashboardPage from './pages/dashboard/EmployerDashboardPage';
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage';
import PostJobPage from './pages/jobs/PostJobPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/routing/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="jobs/:id" element={<JobDetailsPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="seeker/dashboard" 
                element={
                  <ProtectedRoute requiredRole="jobSeeker">
                    <SeekerDashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="employer/dashboard" 
                element={
                  <ProtectedRoute requiredRole="employer">
                    <EmployerDashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="post-job" 
                element={
                  <ProtectedRoute requiredRole="employer">
                    <PostJobPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;