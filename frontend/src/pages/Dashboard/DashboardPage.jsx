import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import DashboardHome from "../../components/dashboard/DashboardHome";
import ProfileView from "../../components/dashboard/ProfileView";
import Settings from "../../components/dashboard/Settings/Settings";

import ResumeAnalysis from "../../components/dashboard/ResumeAnalysis";
import SkillGap from "../../components/dashboard/SkillGap/SkillGap";
import JobDescription from "../../components/dashboard/JobDescription";

import CareerRecommendation from "../../components/dashboard/CareerRecommendation/CareerRecommendation";
import ResumeManagement from "../../components/dashboard/ResumeManagement/ResumeManagement";
import ATSAnalysis from "../../components/dashboard/ATSAnalysis/ATSAnalysis";

import JobRecommendation from "../../components/dashboard/JobRecommendation/JobRecommendation";
import CourseRecommendation from "../../components/dashboard/CourseRecommendation/CourseRecommendation";

import ResumeImprovement from "../../components/dashboard/ResumeImprovement/ResumeImprovement";
import ResumeBuilder from "../../components/dashboard/ResumeBuilder/ResumeBuilder";

import Feedback from "../../components/dashboard/Feedback/Feedback";

import FloatingChatbot from "../../components/chatbot/FloatingChatbot";


function DashboardPage() {

  const [activePage, setActivePage] = useState("dashboard");


  return (

    <div className="
      flex
      h-screen
      overflow-hidden
      bg-slate-950
      text-white
    ">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="
        flex-1
        min-w-0
        h-screen
        overflow-y-auto
        overflow-x-hidden
      ">


        {/* ===================================================
            TOPBAR
        =================================================== */}

        <Topbar />


        {/* ===================================================
            DASHBOARD
        =================================================== */}

        {activePage === "dashboard" && (

          <DashboardHome />

        )}


        {/* ===================================================
            PROFILE
        =================================================== */}

        {activePage === "profile" && (

          <ProfileView />

        )}


        {/* ===================================================
            SETTINGS
        =================================================== */}

        {activePage === "settings" && (

          <Settings />

        )}


        {/* ===================================================
            RESUME MANAGEMENT
        =================================================== */}

        {activePage === "resume-management" && (

          <ResumeManagement />

        )}


        {/* ===================================================
            ATS RESUME ANALYSIS
        =================================================== */}

        {activePage === "resume-analysis" && (

          <ATSAnalysis />

        )}


        {/* ===================================================
            JOB DESCRIPTION
        =================================================== */}

        {activePage === "job-description" && (

          <JobDescription />

        )}


        {/* ===================================================
            RESUME BUILDER
        =================================================== */}

        {activePage === "resume-builder" && (

          <ResumeBuilder />

        )}


        {/* ===================================================
            CAREER RECOMMENDATION
        =================================================== */}

        {activePage === "career" && (

          <CareerRecommendation />

        )}


        {/* ===================================================
            JOB RECOMMENDATION
        =================================================== */}

        {activePage === "job-recommendation" && (

          <JobRecommendation />

        )}


        {/* ===================================================
            COURSE RECOMMENDATION
        =================================================== */}

        {activePage === "course-recommendation" && (

          <CourseRecommendation />

        )}


        {/* ===================================================
            RESUME IMPROVEMENT
        =================================================== */}

        {activePage === "resume-improvement" && (

          <ResumeImprovement />

        )}


        {/* ===================================================
            SKILL GAP
        =================================================== */}

        {activePage === "skill-gap" && (

          <SkillGap />

        )}


        {/* ===================================================
            FEEDBACK
        =================================================== */}

        {activePage === "feedback" && (

          <Feedback />

        )}

      </div>


      {/* =====================================================
          FLOATING CHATBOT
      ===================================================== */}

      <FloatingChatbot />


    </div>

  );

}


export default DashboardPage;