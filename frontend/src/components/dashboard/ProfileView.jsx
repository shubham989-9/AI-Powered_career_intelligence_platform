import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Pencil,
  X,
  Phone,
  MapPin,
  Globe,
  GraduationCap,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import api from "../../api";
import ProfileForm from "./ProfileForm";

export default function ProfileView() {
  // ===========================
  // STATES
  // ===========================

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModalState, setOpenModalState] = useState(false);

  // Change Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password Visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Messages & Loading
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  // ===========================
  // USE EFFECT
  // ===========================

  useEffect(() => {
    loadProfile();
  }, []);

  // ===========================
  // FUNCTIONS
  // ===========================

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data || {});
    } catch (err) {
      console.log("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = () => {
    loadProfile();
    closeModal();
  };

  const validatePassword = () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("Please fill in all password fields.");
      return false;
    }

    if (newPassword.length < 6) {
      setError(
        "New password must be at least 6 characters long."
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirm password do not match."
      );
      return false;
    }

    return true;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validatePassword()) return;

    try {
      setSaving(true);

      const res = await api.post(
        "/auth/change-password",
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        res.data.message ||
          "Password changed successfully!"
      );

      clearPasswordFields();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to change password. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const clearPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const openModal = () => {
    setOpenModalState(true);
  };

  const closeModal = () => {
    setOpenModalState(false);
  };

  // Helper InfoCard Component
  function InfoCard({ title, value, icon: Icon }) {
    return (
      <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          {Icon && (
            <Icon
              size={16}
              className="text-cyan-400"
            />
          )}

          <span>{title}</span>
        </div>

        <h3 className="text-white text-base sm:text-lg font-semibold mt-2 break-words">
          {value || "Not Added"}
        </h3>
      </div>
    );
  }

  // ===========================
  // LOADING
  // ===========================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-850 text-white p-8 flex items-center justify-center">
        <div className="text-cyan-400 font-bold text-xl flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

          Loading Profile...
        </div>
      </div>
    );
  }

  // ===========================
  // JSX
  // ===========================

  return (
    <div className="min-h-screen bg-slate-850 text-white p-4 sm:p-6 lg:p-8 font-sans">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">

          <div className="flex items-center gap-6">

            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
              <User
                size={40}
                className="text-white"
              />
            </div>

            <div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {profile.full_name || "User"}
              </h1>

              <p className="text-slate-400 flex items-center gap-2 mt-2 text-sm sm:text-base">
                <Mail
                  size={16}
                  className="text-cyan-400"
                />

                {profile.email || "No email available"}
              </p>

              <div className="mt-3 inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                <Shield size={14} />

                {profile.role || "Student"}
              </div>

            </div>
          </div>

          <button
            onClick={openModal}
            className="h-12 w-12 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center transition shadow-lg shadow-cyan-500/20 flex-shrink-0"
            title="Edit Profile"
          >
            <Pencil size={20} />
          </button>

        </div>

        {/* ================= PERSONAL INFORMATION ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="text-cyan-400" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <InfoCard
              title="Phone"
              value={profile.phone}
              icon={Phone}
            />

            <InfoCard
              title="City"
              value={profile.city}
              icon={MapPin}
            />

            <InfoCard
              title="Country"
              value={profile.country}
              icon={Globe}
            />

            <InfoCard
              title="LinkedIn"
              value={profile.linkedin}
              icon={LinkIcon}
            />

            <InfoCard
              title="GitHub"
              value={profile.github}
              icon={LinkIcon}
            />

            <InfoCard
              title="College"
              value={profile.college}
              icon={GraduationCap}
            />

          </div>
        </div>

        {/* ================= EDUCATION & PROFESSIONAL SUMMARY ================= */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Education */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <GraduationCap className="text-cyan-400" />
              Education
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <InfoCard
                title="Degree"
                value={profile.degree}
              />

              <InfoCard
                title="Branch"
                value={profile.branch}
              />

              <InfoCard
                title="Passing Year"
                value={profile.passing_year}
              />

              <InfoCard
                title="CGPA"
                value={profile.cgpa}
              />

            </div>
          </div>

          {/* Professional Details */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Briefcase className="text-cyan-400" />
              Professional Details
            </h2>

            <div className="space-y-4">

              <InfoCard
                title="Skills"
                value={profile.skills}
              />

              <InfoCard
                title="Experience"
                value={profile.experience}
              />

            </div>
          </div>

        </div>

        {/* ================= CHANGE PASSWORD ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Lock className="text-cyan-400" />
            Change Password
          </h2>

          <p className="text-slate-400 text-sm mb-6">
            Update your password to keep your account secure.
          </p>

          {/* Alerts */}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">

              <AlertCircle
                size={18}
                className="flex-shrink-0"
              />

              <span>{error}</span>

            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-3">

              <CheckCircle2
                size={18}
                className="flex-shrink-0"
              />

              <span>{success}</span>

            </div>
          )}

          <form
            onSubmit={handlePasswordChange}
            className="space-y-5"
          >

            <div className="grid md:grid-cols-3 gap-5">

              {/* Current Password */}

              <div className="flex flex-col gap-1.5">

                <label className="text-xs font-semibold text-slate-300 ml-1">
                  Current Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showCurrent
                        ? "text"
                        : "password"
                    }
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter current password"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-10 text-white outline-none focus:border-cyan-400 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrent(!showCurrent)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showCurrent ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* New Password */}

              <div className="flex flex-col gap-1.5">

                <label className="text-xs font-semibold text-slate-300 ml-1">
                  New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showNew
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter new password"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-10 text-white outline-none focus:border-cyan-400 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showNew ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* Confirm Password */}

              <div className="flex flex-col gap-1.5">

                <label className="text-xs font-semibold text-slate-300 ml-1">
                  Confirm New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm new password"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-10 text-white outline-none focus:border-cyan-400 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showConfirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

            </div>

            <div className="flex justify-end pt-2">

              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {saving
                  ? "Updating Password..."
                  : "Update Password"}
              </button>

            </div>

          </form>
        </div>

        {/* ================= EDIT MODAL ================= */}

        {openModalState && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">

            <div className="bg-slate-900 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">

              <div className="flex justify-between items-center p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">

                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Pencil className="text-cyan-400" />
                  Edit Profile
                </h2>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X size={22} />
                </button>

              </div>

              <div className="p-6">
                <ProfileForm
                  onSuccess={handleProfileUpdate}
                />
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}