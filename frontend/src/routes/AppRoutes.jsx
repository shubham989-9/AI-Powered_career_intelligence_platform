import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


// =========================================================
// PUBLIC PAGES
// =========================================================

import LandingPage
  from "../pages/Landing/LandingPage";

import LoginPage
  from "../pages/Login/LoginPage";

import RegisterPage
  from "../pages/Register/RegisterPage";

import ForgotPasswordPage
  from "../pages/ForgotPassword/ForgotPasswordPage";


// =========================================================
// STUDENT PAGES
// =========================================================

import DashboardPage
  from "../pages/Dashboard/DashboardPage";

import ProfilePage
  from "../pages/Profile/ProfilePage";


// =========================================================
// ROUTE PROTECTION
// =========================================================

import ProtectedRoute
  from "./ProtectedRoute";

import AdminProtectedRoute
  from "./AdminProtectedRoute";


// =========================================================
// ADMIN LAYOUT
// =========================================================

import AdminLayout
  from "../components/admin/AdminLayout";


// =========================================================
// ADMIN PAGES
// =========================================================

import AdminDashboard
  from "../pages/Admin/AdminDashboard";

import UserManagement
  from "../pages/Admin/UserManagement";

import ResumeMonitoring
  from "../pages/Admin/ResumeMonitoring";

import JobDescriptionManagement
  from "../pages/Admin/JobDescriptionManagement";

import ATSMonitoring
  from "../pages/Admin/ATSMonitoring";

import ResumeParsingMonitoring
  from "../pages/Admin/ResumeParsingMonitoring";

import AdminSkillGapMonitoring
  from "../pages/Admin/AdminSkillGapMonitoring";

import AdminCareerRecommendationAnalytics
  from "../pages/Admin/AdminCareerRecommendationAnalytics";

import AdminJobRecommendationAnalytics
  from "../pages/Admin/AdminJobRecommendationAnalytics";

import CourseRecommendationAnalytics
  from "../pages/Admin/CourseRecommendationAnalytics";

import UserFeedbackManagement
  from "../pages/Admin/UserFeedbackManagement";

import PlatformActivityMonitoring
  from "../pages/Admin/PlatformActivityMonitoring";

import SystemAPIMonitoring
  from "../pages/Admin/SystemAPIMonitoring";

import DataSecurityManagement
  from "../pages/Admin/DataSecurityManagement";


// =========================================================
// APPLICATION ROUTES
// =========================================================

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>


        {/* =================================================
            PUBLIC
        ================================================= */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />


        {/* =================================================
            STUDENT
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ADMIN
            ALL ADMIN ROUTES ARE PROTECTED
        ================================================= */}

        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >

          {/* =================================================
              01 - DASHBOARD
          ================================================= */}

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />


          {/* =================================================
              02 - USER MANAGEMENT
          ================================================= */}

          <Route
            path="/admin/users"
            element={<UserManagement />}
          />


          {/* =================================================
              03 - RESUME MANAGEMENT
          ================================================= */}

          <Route
            path="/admin/resumes"
            element={<ResumeMonitoring />}
          />


          {/* =================================================
              04 - JOB DESCRIPTION MANAGEMENT
          ================================================= */}

          <Route
            path="/admin/jobs"
            element={<JobDescriptionManagement />}
          />


          {/* =================================================
              05 - RESUME PARSING
          ================================================= */}

          <Route
            path="/admin/resume-parsing"
            element={<ResumeParsingMonitoring />}
          />


          {/* =================================================
              06 - ATS ANALYSIS
          ================================================= */}

          <Route
            path="/admin/ats"
            element={<ATSMonitoring />}
          />


          {/* =================================================
              07 - SKILL GAP
          ================================================= */}

          <Route
            path="/admin/skill-gap"
            element={<AdminSkillGapMonitoring />}
          />


          {/* =================================================
              08 - CAREER RECOMMENDATION
          ================================================= */}

          <Route
            path="/admin/career-recommendation"
            element={
              <AdminCareerRecommendationAnalytics />
            }
          />


          {/* =================================================
              09 - JOB RECOMMENDATION
          ================================================= */}

          <Route
            path="/admin/job-recommendation"
            element={
              <AdminJobRecommendationAnalytics />
            }
          />


          {/* =================================================
              10 - COURSE RECOMMENDATION
          ================================================= */}

          <Route
            path="/admin/course-recommendation"
            element={
              <CourseRecommendationAnalytics />
            }
          />


          {/* =================================================
              11 - PLATFORM ACTIVITY
          ================================================= */}

          <Route
            path="/admin/platform-activity"
            element={
              <PlatformActivityMonitoring />
            }
          />


          {/* =================================================
              12 - SYSTEM / API
          ================================================= */}

          <Route
            path="/admin/system-api-monitoring"
            element={
              <SystemAPIMonitoring />
            }
          />


          {/* =================================================
              13 - USER FEEDBACK
          ================================================= */}

          <Route
            path="/admin/feedback"
            element={
              <UserFeedbackManagement />
            }
          />


          {/* =================================================
              14 - DATA & SECURITY
          ================================================= */}

          <Route
            path="/admin/data-security"
            element={
              <DataSecurityManagement />
            }
          />

        </Route>


      </Routes>

    </BrowserRouter>

  );

}


export default AppRoutes;