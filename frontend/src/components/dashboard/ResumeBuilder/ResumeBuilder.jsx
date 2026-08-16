import { useMemo, useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Trash2,
  Palette,
  CheckCircle2,
  AlertCircle,
  User,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  FolderKanban,
  Award,
  Plus,
  X,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

const COLORS = [
  { name: "Cyan", value: "#06b6d4" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Green", value: "#10b981" },
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Black", value: "#111827" },
];

const EMPTY_PERSONAL = {
  name: "",
  role: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
};

const EMPTY_EDUCATION = {
  degree: "",
  institution: "",
  year: "",
  grade: "",
};

const EMPTY_PROJECT = {
  title: "",
  details: "",
  link: "",
};

const EMPTY_CERTIFICATION = {
  name: "",
  organization: "",
};

function ResumeBuilder() {
  const [template, setTemplate] = useState("modern");
  const [accentColor, setAccentColor] = useState("#06b6d4");
  const [activeSection, setActiveSection] = useState("personal");

  const [personal, setPersonal] = useState(EMPTY_PERSONAL);
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState([
    { ...EMPTY_EDUCATION },
  ]);
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState([
    { ...EMPTY_PROJECT },
  ]);
  const [certifications, setCertifications] = useState([
    { ...EMPTY_CERTIFICATION },
  ]);

  // ==========================================
  // Personal
  // ==========================================

  const updatePersonal = (field, value) => {
    setPersonal((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ==========================================
  // Education
  // ==========================================

  const updateEducation = (index, field, value) => {
    setEducation((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addEducation = () => {
    setEducation((previous) => [
      ...previous,
      { ...EMPTY_EDUCATION },
    ]);
  };

  const removeEducation = (index) => {
    if (education.length === 1) return;

    setEducation((previous) =>
      previous.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  // ==========================================
  // Projects
  // ==========================================

  const updateProject = (index, field, value) => {
    setProjects((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addProject = () => {
    setProjects((previous) => [
      ...previous,
      { ...EMPTY_PROJECT },
    ]);
  };

  const removeProject = (index) => {
    if (projects.length === 1) return;

    setProjects((previous) =>
      previous.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  // ==========================================
  // Certifications
  // ==========================================

  const updateCertification = (
    index,
    field,
    value
  ) => {
    setCertifications((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addCertification = () => {
    setCertifications((previous) => [
      ...previous,
      { ...EMPTY_CERTIFICATION },
    ]);
  };

  const removeCertification = (index) => {
    if (certifications.length === 1) return;

    setCertifications((previous) =>
      previous.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  // ==========================================
  // Clear
  // ==========================================

  const clearDraft = () => {
    setPersonal(EMPTY_PERSONAL);
    setSummary("");
    setSkills("");
    setEducation([{ ...EMPTY_EDUCATION }]);
    setExperience("");
    setProjects([{ ...EMPTY_PROJECT }]);
    setCertifications([{ ...EMPTY_CERTIFICATION }]);
  };

  // ==========================================
  // ATS
  // ==========================================

  const atsData = useMemo(() => {
    let score = 0;

    if (personal.name.trim()) score += 10;
    if (personal.role.trim()) score += 10;
    if (personal.email.trim()) score += 5;
    if (personal.phone.trim()) score += 5;

    if (summary.trim().length >= 80) score += 15;
    if (skills.trim()) score += 10;
    if (education.some(
      (item) =>
        item.degree.trim() &&
        item.institution.trim()
    )) score += 10;

    if (experience.trim()) score += 15;

    if (projects.some(
      (item) =>
        item.title.trim() &&
        item.details.trim()
    )) score += 10;

    if (certifications.some(
      (item) =>
        item.name.trim() &&
        item.organization.trim()
    )) score += 10;

    const checks = [
      {
        label: "Name present",
        complete: Boolean(personal.name.trim()),
      },
      {
        label: "Target role specified",
        complete: Boolean(personal.role.trim()),
      },
      {
        label: "Professional summary",
        complete: summary.trim().length >= 80,
      },
      {
        label: "Skills listed",
        complete: Boolean(skills.trim()),
      },
      {
        label: "Education added",
        complete: education.some(
          (item) =>
            item.degree.trim() &&
            item.institution.trim()
        ),
      },
      {
        label: "Experience added",
        complete: Boolean(experience.trim()),
      },
      {
        label: "Projects added",
        complete: projects.some(
          (item) =>
            item.title.trim() &&
            item.details.trim()
        ),
      },
      {
        label: "Certifications added",
        complete: certifications.some(
          (item) =>
            item.name.trim() &&
            item.organization.trim()
        ),
      },
    ];

    return {
      score,
      checks,
    };
  }, [
    personal,
    summary,
    skills,
    education,
    experience,
    projects,
    certifications,
  ]);

  // ==========================================
  // Suggestions
  // ==========================================

  const suggestions = useMemo(() => {
    const result = [];

    if (!personal.name.trim()) {
      result.push("Add your full name.");
    }

    if (!personal.role.trim()) {
      result.push(
        "Add your target role, such as AI/ML Engineer."
      );
    }

    if (summary.trim().length < 80) {
      result.push(
        "Write a stronger 2–4 sentence professional summary."
      );
    }

    if (!skills.trim()) {
      result.push(
        "Add technical skills relevant to your target job."
      );
    }

    if (!experience.trim()) {
      result.push(
        "Add internships or work experience with measurable achievements."
      );
    }

    if (
      !projects.some(
        (item) =>
          item.title.trim() &&
          item.details.trim()
      )
    ) {
      result.push(
        "Add at least one strong project."
      );
    }

    if (result.length === 0) {
      result.push(
        "Your resume has a strong foundation. Add measurable achievements to make it stronger."
      );
    }

    return result.slice(0, 4);
  }, [
    personal,
    summary,
    skills,
    experience,
    projects,
  ]);

  // ==========================================
  // Final Section Order
  // ==========================================

  const sections = [
    {
      id: "personal",
      label: "Personal Info",
      icon: User,
    },
    {
      id: "summary",
      label: "Professional Summary",
      icon: FileText,
    },
    {
      id: "skills",
      label: "Skills",
      icon: Code2,
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
    },
    {
      id: "experience",
      label: "Work Experience",
      icon: BriefcaseBusiness,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: Award,
    },
  ];

  // ==========================================
  // Editor
  // ==========================================

  const renderEditor = () => {
    // ----------------------------------------
    // Personal
    // ----------------------------------------

    if (activeSection === "personal") {
      return (
        <div className="space-y-5">
          <SectionHeading
            title="Personal Information"
            description="Add your professional contact information."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={personal.name}
              onChange={(value) =>
                updatePersonal("name", value)
              }
            />

            <Input
              label="Target Role"
              placeholder="Enter your target job role"
              value={personal.role}
              onChange={(value) =>
                updatePersonal("role", value)
              }
            />

            <Input
              label="Email"
              placeholder="you@example.com"
              value={personal.email}
              onChange={(value) =>
                updatePersonal("email", value)
              }
            />

            <Input
              label="Phone"
              placeholder="+91 XXXXX XXXXX"
              value={personal.phone}
              onChange={(value) =>
                updatePersonal("phone", value)
              }
            />

            <Input
              label="Location"
              placeholder="Enter your city, state, country"
              value={personal.location}
              onChange={(value) =>
                updatePersonal("location", value)
              }
            />

            <Input
              label="GitHub URL"
              placeholder="https://github.com/username"
              value={personal.github}
              onChange={(value) =>
                updatePersonal("github", value)
              }
            />

            <div className="md:col-span-2">
              <Input
                label="LinkedIn URL"
                placeholder="https://linkedin.com/in/username"
                value={personal.linkedin}
                onChange={(value) =>
                  updatePersonal("linkedin", value)
                }
              />
            </div>
          </div>
        </div>
      );
    }

    // ----------------------------------------
    // Summary
    // ----------------------------------------

    if (activeSection === "summary") {
      return (
        <div className="space-y-5">
          <SectionHeading
            title="Professional Summary"
            description="Write a concise summary focused on your target role."
          />

          <Textarea
            label="Professional Summary"
            placeholder="Write a 2–4 sentence professional summary focused on your target role..."
            value={summary}
            onChange={setSummary}
            rows={9}
          />

          <Tip>
            Keep your summary around 2–4 sentences and
            focus on your strongest skills and achievements.
          </Tip>
        </div>
      );
    }

    // ----------------------------------------
    // Skills
    // ----------------------------------------

    if (activeSection === "skills") {
      return (
        <div className="space-y-5">
          <SectionHeading
            title="Skills"
            description="Add technical skills relevant to your target role."
          />

          <Textarea
            label="Technical Skills"
            placeholder="e.g. Python, Machine Learning, SQL, React, FastAPI"
            value={skills}
            onChange={setSkills}
            rows={8}
          />

          <Tip>
            Separate your skills using commas.
          </Tip>
        </div>
      );
    }

    // ----------------------------------------
    // Education
    // ----------------------------------------

    if (activeSection === "education") {
      return (
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <SectionHeading
              title="Education"
              description="Add degree, college, year and grade."
            />

            <button
              onClick={addEducation}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition"
            >
              <Plus size={15} />
              Add Education
            </button>
          </div>

          <div className="space-y-4">
            {education.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white">
                    Education #{index + 1}
                  </h4>

                  {education.length > 1 && (
                    <button
                      onClick={() =>
                        removeEducation(index)
                      }
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Degree"
                    placeholder="e.g. B.Tech in Computer Science"
                    value={item.degree}
                    onChange={(value) =>
                      updateEducation(
                        index,
                        "degree",
                        value
                      )
                    }
                  />

                  <Input
                    label="Year"
                    placeholder="e.g. 2022 - 2026"
                    value={item.year}
                    onChange={(value) =>
                      updateEducation(
                        index,
                        "year",
                        value
                      )
                    }
                  />

                  <Input
                    label="College / Institution"
                    placeholder="e.g. ABC University / College"
                    value={item.institution}
                    onChange={(value) =>
                      updateEducation(
                        index,
                        "institution",
                        value
                      )
                    }
                  />

                  <Input
                    label="Grade / CGPA"
                    placeholder="e.g. 8.5 CGPA"
                    value={item.grade}
                    onChange={(value) =>
                      updateEducation(
                        index,
                        "grade",
                        value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ----------------------------------------
    // Experience
    // ----------------------------------------

    if (activeSection === "experience") {
      return (
        <div className="space-y-5">
          <SectionHeading
            title="Work Experience"
            description="Add internships, jobs and relevant experience."
          />

          <Textarea
            label="Experience"
            placeholder={`e.g. AI/ML Intern — Company Name

• Describe your responsibilities
• Mention achievements with measurable results
• Add technologies or tools used`}
            value={experience}
            onChange={setExperience}
            rows={14}
          />
        </div>
      );
    }

    // ----------------------------------------
    // Projects
    // ----------------------------------------

    if (activeSection === "projects") {
      return (
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <SectionHeading
              title="Projects"
              description="Add project title, details and a clickable GitHub/project URL."
            />

            <button
              onClick={addProject}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition"
            >
              <Plus size={15} />
              Add Project
            </button>
          </div>

          <div className="space-y-5">
            {projects.map((project, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white">
                    Project #{index + 1}
                  </h4>

                  {projects.length > 1 && (
                    <button
                      onClick={() =>
                        removeProject(index)
                      }
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <Input
                    label="Project Title"
                    placeholder="e.g. AI based ..."
                    value={project.title}
                    onChange={(value) =>
                      updateProject(
                        index,
                        "title",
                        value
                      )
                    }
                  />

                  <Textarea
                    label="Project Details"
                    placeholder={`• Describe what you built
• Mention key features and technologies
• Add measurable impact or achievements`}
                    value={project.details}
                    onChange={(value) =>
                      updateProject(
                        index,
                        "details",
                        value
                      )
                    }
                    rows={7}
                  />

                  <Input
                    label="GitHub / Project URL"
                    placeholder="https://github.com/username/project"
                    value={project.link}
                    onChange={(value) =>
                      updateProject(
                        index,
                        "link",
                        value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addProject}
            className="w-full py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-cyan-400 transition text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            Add Another Project
          </button>
        </div>
      );
    }

    // ----------------------------------------
    // Certifications
    // ----------------------------------------

    if (activeSection === "certifications") {
      return (
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <SectionHeading
              title="Certifications"
              description="Add your professional certifications."
            />

            <button
              onClick={addCertification}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition"
            >
              <Plus size={15} />
              Add Certification
            </button>
          </div>

          <div className="space-y-4">
            {certifications.map(
              (certification, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-white">
                      Certification #{index + 1}
                    </h4>

                    {certifications.length > 1 && (
                      <button
                        onClick={() =>
                          removeCertification(index)
                        }
                        className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Certification Name"
                      placeholder="AWS Cloud Practitioner"
                      value={certification.name}
                      onChange={(value) =>
                        updateCertification(
                          index,
                          "name",
                          value
                        )
                      }
                    />

                    <Input
                      label="Issuing Organization"
                      placeholder="Amazon Web Services"
                      value={
                        certification.organization
                      }
                      onChange={(value) =>
                        updateCertification(
                          index,
                          "organization",
                          value
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <button
            onClick={addCertification}
            className="w-full py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-cyan-400 transition text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            Add Another Certification
          </button>
        </div>
      );
    }

    return null;
  };

  // ==========================================
  // Export / Print
  // ==========================================

  const handlePrint = () => {
    window.print();
  };

  const handleWordExport = () => {
  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const skillList = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const validEducation = education.filter(
    (item) =>
      item.degree.trim() ||
      item.institution.trim()
  );

  const validProjects = projects.filter(
    (item) =>
      item.title.trim() ||
      item.details.trim()
  );

  const validCertifications =
    certifications.filter(
      (item) =>
        item.name.trim() ||
        item.organization.trim()
    );

  const sectionTitle = (title) => `
    <h2 style="
      color:${accentColor};
      font-size:16px;
      font-weight:700;
      border-bottom:2px solid ${accentColor};
      padding-bottom:6px;
      margin-top:24px;
      margin-bottom:12px;
    ">
      ${escapeHtml(title)}
    </h2>
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">

        <style>

          @page {
            size: A4;
            margin: 18mm;
          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
            background: white;
            margin: 0;
            padding: 0;
            line-height: 1.5;
          }

          .resume {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }

          .header {
            background: ${accentColor};
            color: white;
            padding: 24px;
            margin-bottom: 24px;
          }

          .name {
            font-size: 30px;
            font-weight: 800;
            margin: 0 0 5px 0;
          }

          .role {
            font-size: 16px;
            margin: 0 0 14px 0;
          }

          .contact {
            font-size: 10px;
            line-height: 1.8;
          }

          .contact a {
            color: white;
            text-decoration: none;
          }

          .summary {
            font-size: 12px;
            line-height: 1.7;
            white-space: pre-line;
          }

          .skills {
            font-size: 12px;
            line-height: 1.8;
          }

          .education-item,
          .project-item,
          .certification-item {
            margin-bottom: 16px;
          }

          .degree {
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 3px;
          }

          .institution {
            font-size: 12px;
            font-weight: 600;
          }

          .meta {
            font-size: 11px;
            color: #64748b;
          }

          .experience {
            font-size: 12px;
            white-space: pre-line;
            line-height: 1.7;
          }

          .project-title {
            color: ${accentColor};
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 4px;
          }

          .project-details {
            font-size: 12px;
            white-space: pre-line;
            line-height: 1.7;
            margin-bottom: 5px;
          }

          .project-link {
            font-size: 10px;
            color: ${accentColor};
            text-decoration: underline;
            word-break: break-all;
          }

          .certification {
            font-size: 12px;
            margin-bottom: 7px;
          }

          .cert-name {
            font-weight: 700;
          }

          .cert-org {
            font-weight: 400;
          }

        </style>
      </head>

      <body>

        <div class="resume">

          <!-- HEADER -->

          <div class="header">

            <div class="name">
              ${escapeHtml(
                personal.name || "Your Name"
              )}
            </div>

            <div class="role">
              ${escapeHtml(
                personal.role || "Target Job Role"
              )}
            </div>

            <div class="contact">

              ${
                personal.email
                  ? `<a href="mailto:${escapeHtml(
                      personal.email
                    )}">
                      ${escapeHtml(
                        personal.email
                      )}
                    </a>`
                  : ""
              }

              ${
                personal.phone
                  ? ` &nbsp; | &nbsp; ${escapeHtml(
                      personal.phone
                    )}`
                  : ""
              }

              ${
                personal.location
                  ? ` &nbsp; | &nbsp; ${escapeHtml(
                      personal.location
                    )}`
                  : ""
              }

              ${
                personal.github
                  ? `<br>
                    <a href="${escapeHtml(
                      normalizeUrl(
                        personal.github
                      )
                    )}">
                      ${escapeHtml(
                        personal.github
                      )}
                    </a>`
                  : ""
              }

              ${
                personal.linkedin
                  ? `<br>
                    <a href="${escapeHtml(
                      normalizeUrl(
                        personal.linkedin
                      )
                    )}">
                      ${escapeHtml(
                        personal.linkedin
                      )}
                    </a>`
                  : ""
              }

            </div>

          </div>


          <!-- 1. PROFESSIONAL SUMMARY -->

          ${
            summary.trim()
              ? `
                ${sectionTitle(
                  "Professional Summary"
                )}

                <div class="summary">
                  ${escapeHtml(summary)}
                </div>
              `
              : ""
          }


          <!-- 2. SKILLS -->

          ${
            skillList.length
              ? `
                ${sectionTitle("Skills")}

                <div class="skills">
                  ${skillList
                    .map(
                      (skill) =>
                        escapeHtml(skill)
                    )
                    .join(" • ")}
                </div>
              `
              : ""
          }


          <!-- 3. EDUCATION -->

          ${
            validEducation.length
              ? `
                ${sectionTitle("Education")}

                ${validEducation
                  .map(
                    (item) => `
                      <div class="education-item">

                        <div class="degree">
                          ${escapeHtml(
                            item.degree
                          )}
                        </div>

                        <div class="institution">
                          ${escapeHtml(
                            item.institution
                          )}
                        </div>

                        <div class="meta">
                          ${
                            item.year
                              ? escapeHtml(
                                  item.year
                                )
                              : ""
                          }

                          ${
                            item.grade
                              ? ` &nbsp; | &nbsp; Grade: ${escapeHtml(
                                  item.grade
                                )}`
                              : ""
                          }
                        </div>

                      </div>
                    `
                  )
                  .join("")}
              `
              : ""
          }


          <!-- 4. WORK EXPERIENCE -->

          ${
            experience.trim()
              ? `
                ${sectionTitle(
                  "Work Experience"
                )}

                <div class="experience">
                  ${escapeHtml(
                    experience
                  )}
                </div>
              `
              : ""
          }


          <!-- 5. PROJECTS -->

          ${
            validProjects.length
              ? `
                ${sectionTitle("Projects")}

                ${validProjects
                  .map(
                    (project) => `
                      <div class="project-item">

                        <div class="project-title">
                          ${escapeHtml(
                            project.title
                          )}
                        </div>

                        ${
                          project.details
                            ? `
                              <div class="project-details">
                                ${escapeHtml(
                                  project.details
                                )}
                              </div>
                            `
                            : ""
                        }

                        ${
                          project.link
                            ? `
                              <a
                                class="project-link"
                                href="${escapeHtml(
                                  normalizeUrl(
                                    project.link
                                  )
                                )}"
                              >
                                ${escapeHtml(
                                  project.link
                                )}
                              </a>
                            `
                            : ""
                        }

                      </div>
                    `
                  )
                  .join("")}
              `
              : ""
          }


          <!-- 6. CERTIFICATIONS -->

          ${
            validCertifications.length
              ? `
                ${sectionTitle(
                  "Certifications"
                )}

                ${validCertifications
                  .map(
                    (certification) => `
                      <div class="certification">

                        <span class="cert-name">
                          ${escapeHtml(
                            certification.name
                          )}
                        </span>

                        ${
                          certification.organization
                            ? `
                              <span>
                                &nbsp; - &nbsp;
                              </span>

                              <span class="cert-org">
                                ${escapeHtml(
                                  certification.organization
                                )}
                              </span>
                            `
                            : ""
                        }

                      </div>
                    `
                  )
                  .join("")}
              `
              : ""
          }

        </div>

      </body>
    </html>
  `;

  const blob = new Blob(
    [html],
    {
      type: "application/msword",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `${personal.name || "resume"}-resume.doc`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

  // ==========================================
  // Main UI
  // ==========================================

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-950 p-4 sm:p-6 lg:p-8">

      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Header */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: `${accentColor}18`,
                  border: `1px solid ${accentColor}35`,
                }}
              >
                <FileText
                  size={24}
                  style={{
                    color: accentColor,
                  }}
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Resume Builder
                </h1>

                <p className="text-sm text-slate-400 mt-1">
                  Create a professional, recruiter-ready resume.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">

              <ActionButton
                icon={Download}
                variant="primary"
                primaryColor={accentColor}
                onClick={handlePrint}
              >
                Export PDF
              </ActionButton>

              <ActionButton
                icon={Download}
                variant="secondary"
                onClick={handleWordExport}
              >
                Export Word
              </ActionButton>

              <ActionButton
                icon={Trash2}
                variant="danger"
                onClick={clearDraft}
              >
                Clear Draft
              </ActionButton>

            </div>
          </div>
        </div>

        {/* Templates / Colors */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-2 mb-3">
                <Sparkles
                  size={16}
                  className="text-cyan-400"
                />

                <span className="text-sm font-bold text-white">
                  Resume Template
                </span>
              </div>

              <div className="flex gap-2">

                {["modern", "classic"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() =>
                        setTemplate(item)
                      }
                      className={`px-5 py-2.5 rounded-xl text-xs font-semibold capitalize transition ${
                        template === item
                          ? "text-slate-950"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                      style={
                        template === item
                          ? {
                              backgroundColor:
                                accentColor,
                            }
                          : {}
                      }
                    >
                      {item}
                    </button>
                  )
                )}

              </div>
            </div>

            <div>

              <div className="flex items-center gap-2 mb-3">
                <Palette
                  size={16}
                  className="text-cyan-400"
                />

                <span className="text-sm font-bold text-white">
                  Accent Color
                </span>
              </div>

              <div className="flex items-center gap-2">

                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    onClick={() =>
                      setAccentColor(
                        color.value
                      )
                    }
                    className={`w-8 h-8 rounded-full transition ${
                      accentColor === color.value
                        ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110"
                        : "hover:scale-110"
                    }`}
                    style={{
                      backgroundColor:
                        color.value,
                    }}
                  />
                ))}

              </div>
            </div>
          </div>
        </div>

        {/* Builder */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-6">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">

            <div className="px-5 py-4 border-b border-slate-800">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={16}
                  className="text-cyan-400"
                />

                <h2 className="font-bold text-white">
                  Build Your Resume
                </h2>

              </div>
            </div>

            {/* Navigation */}
            <div className="px-4 pt-4 overflow-x-auto">

              <div className="flex gap-2 min-w-max">

                {sections.map((section) => {

                  const Icon = section.icon;

                  const active =
                    activeSection ===
                    section.id;

                  return (
                    <button
                      key={section.id}
                      onClick={() =>
                        setActiveSection(
                          section.id
                        )
                      }
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                        active
                          ? "text-white"
                          : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: `${accentColor}18`,
                              color: accentColor,
                              border: `1px solid ${accentColor}30`,
                            }
                          : {}
                      }
                    >
                      <Icon size={14} />
                      {section.label}
                    </button>
                  );
                })}

              </div>
            </div>

            <div className="p-5 sm:p-6">
              {renderEditor()}
            </div>

          </div>

          {/* Right Panel */}
          <div className="space-y-6">

            {/* ATS */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-2">

                  <FileText
                    size={17}
                    style={{
                      color: accentColor,
                    }}
                  />

                  <h2 className="font-bold text-white">
                    ATS Score
                  </h2>

                </div>

                <span className="text-[10px] uppercase tracking-widest text-emerald-400">
                  Live
                </span>

              </div>

              <div className="flex items-center gap-5">

                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: `conic-gradient(${accentColor} ${
                      atsData.score * 3.6
                    }deg, #1e293b 0deg)`,
                  }}
                >

                  <div className="w-[78px] h-[78px] rounded-full bg-slate-950 flex flex-col items-center justify-center">

                    <span className="text-2xl font-black text-white">
                      {atsData.score}
                    </span>

                    <span className="text-[9px] text-slate-500">
                      / 100
                    </span>

                  </div>
                </div>

                <div className="space-y-2">

                  {atsData.checks.map(
                    (check) => (
                      <div
                        key={check.label}
                        className="flex items-center gap-2"
                      >
                        {check.complete ? (
                          <CheckCircle2
                            size={13}
                            className="text-emerald-400"
                          />
                        ) : (
                          <AlertCircle
                            size={13}
                            className="text-amber-400"
                          />
                        )}

                        <span
                          className={`text-[11px] ${
                            check.complete
                              ? "text-emerald-300"
                              : "text-amber-300"
                          }`}
                        >
                          {check.label}
                        </span>
                      </div>
                    )
                  )}

                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

              <div className="flex items-center gap-2 mb-4">

                <Sparkles
                  size={17}
                  className="text-cyan-400"
                />

                <h2 className="font-bold text-white">
                  Resume Suggestions
                </h2>

              </div>

              <div className="space-y-3">

                {suggestions.map(
                  (suggestion, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                    >

                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{
                          backgroundColor: `${accentColor}18`,
                          color: accentColor,
                        }}
                      >
                        {index + 1}
                      </span>

                      <p className="text-xs leading-5 text-slate-400">
                        {suggestion}
                      </p>

                    </div>
                  )
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Live Preview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-lg font-bold text-white">
                Live Resume Preview
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Your resume updates automatically as you edit.
              </p>
            </div>

            <span
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
              }}
            >
              {template}
            </span>

          </div>

          <ResumePreview
            personal={personal}
            summary={summary}
            skills={skills}
            education={education}
            experience={experience}
            projects={projects}
            certifications={certifications}
            template={template}
            accentColor={accentColor}
          />

        </div>
      </div>
    </main>
  );
}

// ==========================================
// Reusable Components
// ==========================================

function SectionHeading({
  title,
  description,
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white">
        {title}
      </h3>

      <p className="text-xs text-slate-500 mt-1">
        {description}
      </p>
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2">
        {label}
      </label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition"
      />
    </div>
  );
}

function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 8,
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2">
        {label}
      </label>

      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full resize-y bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition leading-6"
      />
    </div>
  );
}

function Tip({ children }) {
  return (
    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
      <div className="flex gap-3">
        <Sparkles
          className="text-cyan-400 shrink-0"
          size={18}
        />

        <p className="text-xs leading-5 text-slate-400">
          {children}
        </p>
      </div>
    </div>
  );
}

function ActionButton({
  children,
  icon: Icon,
  onClick,
  primaryColor,
  variant = "secondary",
}) {
  const baseClasses =
    "group relative flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";

  if (variant === "primary") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} text-slate-950 shadow-lg hover:-translate-y-0.5 hover:shadow-xl`}
        style={{
          backgroundColor: primaryColor || "#06b6d4",
          border: `1px solid ${primaryColor || "#06b6d4"}`,
          boxShadow: `0 0 20px ${primaryColor || "#06b6d4"}35`,
        }}
      >
        <Icon
          size={17}
          className="transition-transform duration-200 group-hover:scale-110"
        />
        {children}
      </button>
    );
  }

  if (variant === "danger") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} bg-red-500/10 text-red-400 border border-red-500/40 hover:bg-red-500 hover:text-white hover:border-red-400 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(239,68,68,0.28)] focus:ring-red-500/50`}
      >
        <Icon
          size={17}
          className="transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110"
        />
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} bg-blue-500/10 text-blue-300 border border-blue-400/50 hover:bg-blue-500 hover:text-white hover:border-blue-400 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(59,130,246,0.28)] focus:ring-blue-500/50`}
    >
      <Icon
        size={17}
        className="transition-transform duration-200 group-hover:scale-110"
      />
      {children}
    </button>
  );
}

// ==========================================
// Resume Preview
// ==========================================

function ResumePreview({
  personal,
  summary,
  skills,
  education,
  experience,
  projects,
  certifications,
  template,
  accentColor,
}) {
  const skillList = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const validEducation = education.filter(
    (item) =>
      item.degree.trim() ||
      item.institution.trim()
  );

  const validProjects = projects.filter(
    (item) =>
      item.title.trim() ||
      item.details.trim()
  );

  const validCertifications =
    certifications.filter(
      (item) =>
        item.name.trim() ||
        item.organization.trim()
    );

  const isClassic =
    template === "classic";

  return (
    <div className="overflow-auto rounded-xl bg-slate-800/50 p-3 sm:p-6">

      <div
        id="resume-print-area"
        className={`mx-auto w-full max-w-[850px] min-h-[1100px] bg-white text-slate-900 shadow-2xl ${
          isClassic
            ? "font-serif"
            : "font-sans"
        }`}
      >

        {/* =====================================
            HEADER
        ====================================== */}

        <div
          className={`p-8 ${
            isClassic
              ? "border-b-4"
              : ""
          }`}
          style={{
            backgroundColor: isClassic
              ? "#ffffff"
              : accentColor,
            borderColor: accentColor,
          }}
        >

          <h1
            className={`text-3xl sm:text-4xl font-black ${
              isClassic
                ? "text-slate-900"
                : "text-white"
            }`}
          >
            {personal.name ||
              "Your Name"}
          </h1>

          <p
            className={`mt-2 text-lg font-semibold ${
              isClassic
                ? ""
                : "text-white/90"
            }`}
            style={
              isClassic
                ? {
                    color: accentColor,
                  }
                : {}
            }
          >
            {personal.role ||
              "Target Job Role"}
          </p>

          {/* Contact Information */}
          <div
            className={`mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs ${
              isClassic
                ? "text-slate-600"
                : "text-white/90"
            }`}
          >

            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-1.5 hover:underline"
              >
                <Mail size={13} />
                {personal.email}
              </a>
            )}

            {personal.phone && (
              <a
                href={`tel:${personal.phone}`}
                className="flex items-center gap-1.5 hover:underline"
              >
                <Phone size={13} />
                {personal.phone}
              </a>
            )}

            {personal.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                {personal.location}
              </span>
            )}

            {personal.github && (
              <a
                href={normalizeUrl(
                  personal.github
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-all"
              >
                {personal.github}
              </a>
            )}

            {personal.linkedin && (
              <a
                href={normalizeUrl(
                  personal.linkedin
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-all"
              >
                {personal.linkedin}
              </a>
            )}

          </div>
        </div>

        {/* =====================================
            BODY
        ====================================== */}

        <div className="p-8 space-y-8">

          {/* 1. Professional Summary */}

          {(summary.trim() ||
            !personal.name) && (
            <PreviewSection
              title="Professional Summary"
              accentColor={accentColor}
              template={template}
            >
              {summary ||
                "Your professional summary will appear here."}
            </PreviewSection>
          )}

          {/* 2. Skills */}

          {skillList.length > 0 && (
            <div>

              <PreviewTitle
                title="Skills"
                accentColor={accentColor}
                template={template}
              />

              <div className="flex flex-wrap gap-2 mt-4">

                {skillList.map(
                  (skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="px-3 py-1.5 rounded-md text-xs font-semibold"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        color: accentColor,
                      }}
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>
            </div>
          )}

          {/* 3. Education */}

          {validEducation.length > 0 && (
            <div>

              <PreviewTitle
                title="Education"
                accentColor={accentColor}
                template={template}
              />

              <div className="space-y-5 mt-4">

                {validEducation.map(
                  (item, index) => (
                    <div key={index}>

                      <h4 className="text-base font-black text-slate-900">
                        {item.degree ||
                          "Degree"}
                      </h4>

                      {item.institution && (
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {item.institution}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-4 mt-1 text-xs text-slate-500">

                        {item.year && (
                          <span>
                            {item.year}
                          </span>
                        )}

                        {item.grade && (
                          <span>
                            Grade:{" "}
                            {item.grade}
                          </span>
                        )}

                      </div>
                    </div>
                  )
                )}

              </div>
            </div>
          )}

          {/* 4. Work Experience */}

          {experience.trim() && (
            <PreviewSection
              title="Work Experience"
              accentColor={accentColor}
              template={template}
            >
              {experience}
            </PreviewSection>
          )}

          {/* 5. Projects */}

          {validProjects.length > 0 && (
            <div>

              <PreviewTitle
                title="Projects"
                accentColor={accentColor}
                template={template}
              />

              <div className="space-y-6 mt-4">

                {validProjects.map(
                  (project, index) => (
                    <div key={index}>

                      {/* Project Title */}
                      <h4
                        className="text-base font-black"
                        style={{
                          color: accentColor,
                        }}
                      >
                        {project.title ||
                          "Project Title"}
                      </h4>

                      {/* Details */}
                      {project.details && (
                        <p className="mt-2 text-sm leading-6 whitespace-pre-line text-slate-700">
                          {project.details}
                        </p>
                      )}

                      {/* Actual visible URL */}
                      {project.link && (
                        <a
                          href={normalizeUrl(
                            project.link
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold hover:underline break-all"
                          style={{
                            color: accentColor,
                          }}
                        >
                          {project.link}
                          <ExternalLink
                            size={11}
                          />
                        </a>
                      )}

                    </div>
                  )
                )}

              </div>
            </div>
          )}

          {/* 6. Certifications - ALWAYS LAST */}

          {validCertifications.length > 0 && (
            <div>

              <PreviewTitle
                title="Certifications"
                accentColor={accentColor}
                template={template}
              />

              <div className="space-y-2 mt-4">

                {validCertifications.map(
                  (certification, index) => (
                    <div
                      key={index}
                      className="text-sm text-slate-800"
                    >
                      <span className="font-semibold">
                        {certification.name}
                      </span>

                      {certification.organization && (
                        <>
                          <span className="mx-2">
                            -
                          </span>

                          <span>
                            {
                              certification.organization
                            }
                          </span>
                        </>
                      )}
                    </div>
                  )
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ==========================================
// Preview Title
// ==========================================

function PreviewTitle({
  title,
  accentColor,
  template,
}) {
  return (
    <div
      className={`pb-2 border-b-2 ${
        template === "classic"
          ? "uppercase tracking-widest"
          : ""
      }`}
      style={{
        borderColor: accentColor,
      }}
    >
      <h3
        className="text-sm font-black"
        style={{
          color: accentColor,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

// ==========================================
// Preview Section
// ==========================================

function PreviewSection({
  title,
  children,
  accentColor,
  template,
}) {
  return (
    <div>

      <PreviewTitle
        title={title}
        accentColor={accentColor}
        template={template}
      />

      <p className="mt-3 text-sm leading-6 whitespace-pre-line text-slate-700">
        {children}
      </p>

    </div>
  );
}

// ==========================================
// Normalize URL
// ==========================================

function normalizeUrl(url) {
  if (!url) return "#";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:")
  ) {
    return url;
  }

  return `https://${url}`;
}

export default ResumeBuilder;