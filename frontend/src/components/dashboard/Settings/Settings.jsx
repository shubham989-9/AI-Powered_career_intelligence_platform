import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Check,
} from "lucide-react";

function Settings() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [saved, setSaved] = useState(false);

  const saveAccountSettings = () => {
    const updatedUser = {
      ...user,
      name,
      email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white p-4 sm:p-6 lg:p-8">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <SettingsIcon
                size={22}
                className="text-cyan-400"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black">
                Settings
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Manage your account settings.
              </p>
            </div>

          </div>
        </div>

        {/* Account Settings */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">

          <div className="mb-6">

            <h2 className="text-lg font-bold">
              Account Settings
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Update your basic account information.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                <User size={14} />
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50"
              />

            </div>

            {/* Email */}
            <div>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                <Mail size={14} />
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50"
              />

            </div>

          </div>

          <div className="mt-5 flex justify-end">

            <button
              onClick={saveAccountSettings}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-sm font-bold hover:bg-cyan-400 transition"
            >
              {saved && <Check size={15} />}
              {saved ? "Saved" : "Save Changes"}
            </button>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Settings;