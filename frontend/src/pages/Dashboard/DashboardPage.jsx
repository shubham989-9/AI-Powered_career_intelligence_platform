import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import DashboardHome from "../../components/dashboard/DashboardHome";
import ProfileView from "../../components/dashboard/ProfileView";
import ResumeAnalysis from "../../components/dashboard/ResumeAnalysis";
import SkillGap from "../../components/dashboard/SkillGap/SkillGap";
import JobDescription from "../../components/dashboard/JobDescription";
import CareerRecommendation from "../../components/dashboard/CareerRecommendation/CareerRecommendation";
import ResumeManagement from "../../components/dashboard/ResumeManagement/ResumeManagement";
import ATSAnalysis from "../../components/dashboard/ATSAnalysis/ATSAnalysis";
import JobRecommendation from "../../components/dashboard/JobRecommendation/JobRecommendation";
import CourseRecommendation from "../../components/dashboard/CourseRecommendation/CourseRecommendation";
import ResumeImprovement from "../../components/dashboard/ResumeImprovement/ResumeImprovement";

function DashboardPage() {

  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1">

        <Topbar />

        {activePage === "dashboard" && (
          <DashboardHome />
        )}

{activePage === "profile" && (
  <ProfileView />
)}

        {activePage === "resume-management" && (
          <ResumeManagement />
        )}

        {activePage === "resume-analysis" && (
          <ATSAnalysis />
        )}
        {activePage === "job-description" && (
    <JobDescription />
)}
        {
  activePage === "skill-gap" &&
  <SkillGap />
}
{activePage === "career" && (
    <CareerRecommendation />
)}
{activePage === "job-recommendation" && (
  <JobRecommendation />
)}
{activePage === "course-recommendation" && (
  <CourseRecommendation />
)}
{activePage === "resume-improvement" && (
  <ResumeImprovement />
)}

      </div>

    </div>
  );
}

export default DashboardPage;