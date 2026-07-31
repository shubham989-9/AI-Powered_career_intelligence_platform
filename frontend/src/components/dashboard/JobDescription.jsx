import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Briefcase,
  Building2,
  MapPin,
  FileText,
  Brain,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Loader2,
} from "lucide-react";

import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function JobDescription() {
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [viewModal, setViewModal] = useState(false);

  const [editingJob, setEditingJob] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);

const [formData, setFormData] = useState({
  job_title: "",
  company: "",
  location: "",
  description: "",
  required_skills: "",
});
  // ===========================
  // Fetch Jobs
  // ===========================

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/job-description/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data);

      setFilteredJobs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Load Data
  // ===========================

  useEffect(() => {
    fetchJobs();
  }, []);

  // ===========================
  // Search
  // ===========================

  useEffect(() => {
    const result = jobs.filter((job) => {
      return (
        job.job_title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        job.company
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        job.location
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });

    setFilteredJobs(result);
  }, [searchTerm, jobs]);

  // ===========================
  // Input Change
  // ===========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===========================
  // Reset Form
  // ===========================

  const resetForm = () => {
    setFormData({
      job_title: "",
      company: "",
      location: "",
      description: "",
      required_skills: "",
    });

    setEditingJob(null);
  };

  // ===========================
  // Open Add Modal
  // ===========================

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };
  // ===========================
  // Close Modal
  // ===========================

  const closeModal = () => {
    resetForm();
    setShowModal(false);
  };

  // ===========================
  // Add Job
  // ===========================

  const addJob = async () => {
    try {
      setSaving(true);

      await axios.post(
        `${API_URL}/job-description/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();

      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  // ===========================
  // Update Job
  // ===========================

  const updateJob = async () => {
    try {
      setSaving(true);

      await axios.put(
        `${API_URL}/job-description/${editingJob.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();

      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  // ===========================
  // Edit Job
  // ===========================

  const handleEdit = (job) => {
    setEditingJob(job);

    setFormData({
      job_title: job.job_title || "",
      company: job.company || "",
      location: job.location || "",
      description: job.description || "",
      required_skills: job.required_skills || "",
    });

    setShowModal(true);
  };

  // ===========================
  // Delete Job
  // ===========================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Job Description?")) return;

    try {
      await axios.delete(
        `${API_URL}/job-description/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // View Job
  // ===========================

  const handleView = (job) => {
    setSelectedJob(job);
    setViewModal(true);
  };
    return (
    <main className="p-8 min-h-screen bg-[#020817] text-white">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >

        <div>

          <h1 className="text-4xl font-bold">
            Job Description
          </h1>

          <p className="text-slate-400 mt-2">
            Manage job descriptions for ATS analysis and AI career matching.
          </p>

        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition"
        >
          <Plus size={20} />
          Add Job Description
        </button>

      </motion.div>

      {/* Search */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .15 }}
        className="mt-8"
      >

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Job Title, Company or Location..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-cyan-500"
          />

        </div>

      </motion.div>

      {/* Statistics */}

      <motion.div
        initial={{ opacity:0,y:20 }}
        animate={{ opacity:1,y:0 }}
        transition={{ delay:.25 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8"
      >

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400">
                Total Jobs
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {jobs.length}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">

              <Briefcase
                size={30}
                className="text-cyan-400"
              />

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400">
                Companies
              </p>

              <h2 className="text-4xl font-bold mt-3">

                {
                  new Set(
                    jobs.map(job=>job.company)
                  ).size
                }

              </h2>

            </div>

            <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center">

              <Building2
                size={30}
                className="text-violet-400"
              />

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400">
                Locations
              </p>

              <h2 className="text-4xl font-bold mt-3">

                {
                  new Set(
                    jobs.map(job=>job.location)
                  ).size
                }

              </h2>

            </div>

            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">

              <MapPin
                size={30}
                className="text-green-400"
              />

            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400">
                Ready for ATS
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {jobs.length}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">

              <FileText
                size={30}
                className="text-orange-400"
              />

            </div>

          </div>

        </div>

      </motion.div>
            {/* ================= Add / Edit Modal ================= */}

      <AnimatePresence>

        {showModal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
          >

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl"
            >

              {/* Modal Header */}

              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800">

                <div>

                  <h2 className="text-2xl font-bold">

                    {editingJob
                      ? "Update Job Description"
                      : "Add Job Description"}

                  </h2>

                  <p className="text-slate-400 mt-1">

                    Fill in the job details for ATS analysis.

                  </p>

                </div>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-slate-800 transition"
                >
                  <X size={22} />
                </button>

              </div>

              {/* Form */}

              <div className="p-8 space-y-6">

                {/* Job Title */}

                <div>

                  <label className="block mb-2 font-medium">
                    Job Title
                  </label>

                  <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700">

                    <Briefcase
                      className="ml-4 text-cyan-400"
                      size={20}
                    />

                    <input
                      type="text"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleChange}
                      placeholder="AI Engineer"
                      className="w-full bg-transparent p-4 outline-none"
                    />

                  </div>

                </div>

                {/* Company */}

                <div>

                  <label className="block mb-2 font-medium">
                    Company
                  </label>

                  <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700">

                    <Building2
                      className="ml-4 text-violet-400"
                      size={20}
                    />

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Google"
                      className="w-full bg-transparent p-4 outline-none"
                    />

                  </div>

                </div>

                {/* Location */}

                <div>

                  <label className="block mb-2 font-medium">
                    Location
                  </label>

                  <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700">

                    <MapPin
                      className="ml-4 text-green-400"
                      size={20}
                    />

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Pune"
                      className="w-full bg-transparent p-4 outline-none"
                    />

                  </div>

                </div>

                {/* Description */}

                <div>

                  <label className="block mb-2 font-medium">
                    Job Description
                  </label>

                  <textarea
                    rows={10}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Paste complete Job Description..."
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none resize-none"
                  />

                </div>

                {/* Required Skills */}

                <div>

                  <label className="block mb-2 font-medium">
                    Required Skills
                  </label>

                  <div className="flex items-start bg-slate-800 rounded-xl border border-slate-700">

                    <Brain
                      className="ml-4 mt-4 text-purple-400"
                      size={20}
                    />

                    <textarea
                      rows={3}
                      name="required_skills"
                      value={formData.required_skills}
                      onChange={handleChange}
                      placeholder="Python, Machine Learning, TensorFlow, SQL..."
                      className="w-full bg-transparent p-4 outline-none resize-none"
                    />

                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    Enter required skills separated by commas.
                  </p>

                </div>

              </div>

              {/* Footer */}

              <div className="flex justify-end gap-4 px-8 py-6 border-t border-slate-800">

                <button
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={editingJob ? updateJob : addJob}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition disabled:opacity-60"
                >

                  {saving ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Save size={18} />
                  )}

                  {editingJob
                    ? "Update Job"
                    : "Save Job"}

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* ================= Loading ================= */}

      {loading ? (

        <div className="flex justify-center items-center py-32">

          <Loader2
            size={45}
            className="animate-spin text-cyan-400"
          />

        </div>

      ) : filteredJobs.length === 0 ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 bg-slate-900 border border-slate-800 rounded-2xl p-14 text-center"
        >

          <Briefcase
            size={60}
            className="mx-auto text-slate-500"
          />

          <h2 className="text-2xl font-bold mt-6">

            No Job Description Found

          </h2>

          <p className="text-slate-400 mt-3">

            Click on <span className="text-cyan-400">Add Job Description</span>
            {" "}to create your first job profile.

          </p>

        </motion.div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

          {filteredJobs.map((job) => (

            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition"
            >

              {/* Card Header */}

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">

                    {job.job_title}

                  </h2>

                  <div className="flex flex-wrap gap-5 mt-3 text-slate-400">

                    <div className="flex items-center gap-2">

                      <Building2 size={18} />

                      {job.company || "N/A"}

                    </div>

                    <div className="flex items-center gap-2">

                      <MapPin size={18} />

                      {job.location || "N/A"}

                    </div>

                  </div>

                </div>

                <Briefcase
                  size={34}
                  className="text-cyan-400"
                />

              </div>

              {/* Description */}

              <div className="mt-6">

                <p className="text-slate-300 leading-7">

                  {job.description.length > 220
                    ? job.description.substring(0,220)+"..."
                    : job.description}

                </p>

              </div>

              {/* Skills */}

              <div className="mt-6">

                <h4 className="font-semibold mb-3">

                  Required Skills

                </h4>

                <div className="flex flex-wrap gap-2">

                  {job.required_skills
                    ? job.required_skills
                        .split(",")
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
                          >
                            {skill.trim()}
                          </span>
                        ))
                    : (
                      <span className="text-slate-500">
                        No skills extracted
                      </span>
                    )}

                </div>

              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 mt-8">

                <button
                  onClick={() => handleView(job)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
                >
                  <Eye size={18} />
                  View
                </button>

                <button
                  onClick={() => handleEdit(job)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
                >
                  <Edit size={18} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(job.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
                >
                  <Trash2 size={18} />
                  Delete
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      )}
            {/* ================= View Job Modal ================= */}

      <AnimatePresence>

        {viewModal && selectedJob && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
          >

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl"
            >

              {/* Header */}

              <div className="flex justify-between items-center px-8 py-6 border-b border-slate-800">

                <div>

                  <h2 className="text-3xl font-bold">

                    {selectedJob.job_title}

                  </h2>

                  <div className="flex flex-wrap gap-6 mt-3 text-slate-400">

                    <div className="flex items-center gap-2">

                      <Building2 size={18} />

                      {selectedJob.company || "N/A"}

                    </div>

                    <div className="flex items-center gap-2">

                      <MapPin size={18} />

                      {selectedJob.location || "N/A"}

                    </div>

                  </div>

                </div>

                <button
                  onClick={() => setViewModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-800 transition"
                >
                  <X size={24} />
                </button>

              </div>

              {/* Body */}

              <div className="p-8 space-y-8">

                {/* Job Description */}

                <div>

                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">

                    <FileText className="text-cyan-400" />

                    Job Description

                  </h3>

                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">

                    <p className="leading-8 text-slate-300 whitespace-pre-wrap">

                      {selectedJob.description}

                    </p>

                  </div>

                </div>

                {/* Skills */}

                <div>

                  <h3 className="text-xl font-semibold mb-4">

                    Required Skills

                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {selectedJob.required_skills
                      ? selectedJob.required_skills
                          .split(",")
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 font-medium"
                            >
                              {skill.trim()}
                            </span>
                          ))
                      : (
                        <span className="text-slate-500">
                          No skills extracted.
                        </span>
                      )}

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="flex justify-end gap-4 px-8 py-6 border-t border-slate-800">

                <button
                  onClick={() => setViewModal(false)}
                  className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setViewModal(false);
                    handleEdit(selectedJob);
                  }}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition flex items-center gap-2"
                >
                  <Edit size={18} />
                  Edit Job
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
}

export default JobDescription;
