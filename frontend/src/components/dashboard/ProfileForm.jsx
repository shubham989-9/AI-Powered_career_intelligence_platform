import api from "../../api";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import {
  Phone,
  MapPin,
  Globe,
  Link,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";

// Updated InputField with Floating / Top Label
function InputField({
  label,
  icon: Icon,
  placeholder,
  register,
  name,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label always visible at top */}
      <label className="text-xs sm:text-sm font-semibold text-cyan-400/90 ml-1">
        {label || placeholder}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
        />

        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-cyan-400 transition-all"
        />
      </div>
    </div>
  );
}

function ProfileForm({ onSuccess = () => {} }) {
  const { register, handleSubmit, reset, watch } = useForm();

  const token = localStorage.getItem("token");

  const watchedFields = watch();

  const completion = useMemo(() => {
    const fields = [
      "phone",
      "college",
      "degree",
      "branch",
      "passing_year",
      "cgpa",
      "skills",
      "experience",
      "linkedin",
      "github",
      "city",
      "country",
      "career_goal",
      "certifications",
      "projects",
      "career_interests",
    ];

    const filled = fields.filter(
      (field) =>
        watchedFields[field] &&
        watchedFields[field].toString().trim() !== ""
    ).length;

    return Math.round((filled / fields.length) * 100);
  }, [watchedFields]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        reset(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post(
        "/profile/save",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Profile saved successfully"
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      alert("Profile Save Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-850 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        Profile Management
      </h1>

      {/* Progress */}
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="text-cyan-400" />
              Profile Completion
            </h2>

            <p className="text-slate-400 mt-2">
              Complete your profile to unlock better AI career recommendations.
            </p>
          </div>

          <div className="text-center">
            <div className="h-24 w-24 rounded-full border-[6px] border-cyan-400 flex items-center justify-center">
              <span className="text-3xl font-bold text-cyan-400">
                {completion}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 transition-all duration-700"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-12"
      >
        {/* Personal */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3 mb-8">
            <Phone />
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Phone Number"
              icon={Phone}
              placeholder="Enter Phone Number"
              register={register}
              name="phone"
            />

            <InputField
              label="City"
              icon={MapPin}
              placeholder="Enter City"
              register={register}
              name="city"
            />

            <InputField
              label="Country"
              icon={Globe}
              placeholder="Enter Country"
              register={register}
              name="country"
            />

            <InputField
              label="LinkedIn URL"
              icon={Link}
              placeholder="Enter LinkedIn Profile URL"
              register={register}
              name="linkedin"
            />

            <InputField
              label="GitHub URL"
              icon={Link}
              placeholder="Enter GitHub Profile URL"
              register={register}
              name="github"
            />

            <InputField
              label="College Name"
              icon={GraduationCap}
              placeholder="Enter College / University Name"
              register={register}
              name="college"
            />
          </div>
        </div>

        {/* Education */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3 mb-8">
            <GraduationCap />
            Education

            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
              Required
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Degree"
              icon={GraduationCap}
              placeholder="Degree (e.g. B.Tech, B.Sc)"
              register={register}
              name="degree"
            />

            <InputField
              label="Branch"
              icon={GraduationCap}
              placeholder="Branch (e.g. CSE, AIML)"
              register={register}
              name="branch"
            />

            <InputField
              label="Passing Year"
              icon={GraduationCap}
              placeholder="Passing Year (e.g. 2025)"
              register={register}
              name="passing_year"
            />

            <InputField
              label="CGPA"
              icon={GraduationCap}
              placeholder="CGPA (e.g. 8.5)"
              register={register}
              name="cgpa"
            />
          </div>
        </div>

        {/* Professional */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3 mb-8">
            <Briefcase />
            Professional Details

            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
              Required
            </span>
          </h2>

          <div className="space-y-6">

            {/* Skills */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-cyan-400/90 ml-1">
                Skills
              </label>

              <textarea
                {...register("skills")}
                rows={4}
                placeholder="Skills (Python, React, FastAPI, SQL...)"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-cyan-400/90 ml-1">
                Work / Internship Experience
              </label>

              <textarea
                {...register("experience")}
                rows={4}
                placeholder="Internship / Work Experience"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Certifications */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-cyan-400/90 ml-1">
                Certifications
              </label>

              <textarea
                {...register("certifications")}
                rows={4}
                placeholder="Certifications"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Projects */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-cyan-400/90 ml-1">
                Projects
              </label>

              <textarea
                {...register("projects")}
                rows={4}
                placeholder="Projects"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Career Interests */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-cyan-400/90 ml-1">
                Career Interests
              </label>

              <textarea
                {...register("career_interests")}
                rows={4}
                placeholder="Career Interests"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Career Goal */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-cyan-400/90 ml-1">
                Career Goal
              </label>

              <textarea
                {...register("career_goal")}
                rows={4}
                placeholder="Career Goal"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-400 resize-none"
              />
            </div>

          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-lg font-semibold shadow-lg shadow-cyan-500/20"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;