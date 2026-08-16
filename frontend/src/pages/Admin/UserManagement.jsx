import { useEffect, useState } from "react";

import {
  Users,
  Search,
  UserCheck,
  UserX,
  Trash2,
  RefreshCw,
  ShieldCheck,
  Mail,
  X,
} from "lucide-react";

import api from "../../api";


function UserManagement() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [error, setError] = useState("");


  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = async () => {

    try {

      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");


      const response = await api.get(
        "/admin/users",
        {
          params: {
            search,
            status,
          },

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      setUsers(
        response.data.users || []
      );

    } catch (err) {

      console.error(
        "User Management Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to load users."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // INITIAL + FILTER LOAD
  // =====================================================

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchUsers();

    }, 250);

    return () => clearTimeout(timer);

  }, [search, status]);


  // =====================================================
  // TOGGLE USER STATUS
  // =====================================================

  const handleToggleStatus = async (user) => {

    const action =
      user.is_active
        ? "deactivate"
        : "activate";


    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${user.full_name}?`
    );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(user.id);


      const token =
        localStorage.getItem("token");


      await api.patch(
        `/admin/users/${user.id}/status`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      await fetchUsers();

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Unable to update user status."
      );

    } finally {

      setActionLoading(null);

    }

  };


  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = async (user) => {

    const confirmed = window.confirm(
      `Delete ${user.full_name} permanently?\n\nThis will also remove the user's resumes and job descriptions.`
    );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(user.id);


      const token =
        localStorage.getItem("token");


      await api.delete(
        `/admin/users/${user.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      setSelectedUser(null);

      await fetchUsers();

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Unable to delete user."
      );

    } finally {

      setActionLoading(null);

    }

  };


  return (

    <div className="
      min-h-screen
      bg-[#050816]
      text-white
      p-4
      sm:p-6
      lg:p-8
    ">

      <div className="
        max-w-7xl
        mx-auto
        space-y-6
      ">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <div>

            <div className="
              flex
              items-center
              gap-2
              mb-2
            ">

              <Users
                size={23}
                className="text-cyan-400"
              />

              <span className="
                text-sm
                font-semibold
                text-cyan-400
              ">
                ADMIN CONTROL CENTER
              </span>

            </div>


            <h1 className="
              text-2xl
              sm:text-3xl
              font-black
            ">
              User Management
            </h1>


            <p className="
              mt-1
              text-sm
              text-slate-400
            ">
              Manage registered student accounts and platform access.
            </p>

          </div>


          <button
            onClick={fetchUsers}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-2.5
              text-sm
              font-semibold
              hover:border-cyan-500/50
              hover:text-cyan-300
              transition
            "
          >

            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

        </div>


        {/* =================================================
            FILTER BAR
        ================================================= */}

        <div className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/60
          p-4
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            gap-3
          ">


            {/* Search */}

            <div className="
              relative
              flex-1
            ">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />


              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by name or email..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  focus:border-cyan-400
                "
              />

            </div>


            {/* Status */}

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                px-4
                py-3
                text-sm
                text-white
                outline-none
                focus:border-cyan-400
              "
            >

              <option value="all">
                All Users
              </option>

              <option value="active">
                Active Users
              </option>

              <option value="inactive">
                Inactive Users
              </option>

            </select>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            text-sm
            text-red-300
          ">
            {error}
          </div>

        )}


        {/* =================================================
            USER TABLE
        ================================================= */}

        <div className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/60
        ">

          <div className="
            border-b
            border-slate-800
            px-5
            py-4
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="font-bold">
                  Registered Students
                </h2>

                <p className="
                  mt-1
                  text-xs
                  text-slate-500
                ">
                  {users.length} user
                  {users.length === 1 ? "" : "s"} found
                </p>

              </div>


              <div className="
                rounded-xl
                bg-cyan-500/10
                p-2.5
              ">

                <Users
                  size={20}
                  className="text-cyan-400"
                />

              </div>

            </div>

          </div>


          {loading ? (

            <div className="
              flex
              items-center
              justify-center
              gap-3
              py-16
              text-slate-400
            ">

              <RefreshCw
                size={22}
                className="animate-spin"
              />

              Loading users...

            </div>

          ) : users.length === 0 ? (

            <div className="
              py-16
              text-center
              text-slate-500
            ">

              <Users
                size={42}
                className="
                  mx-auto
                  mb-3
                  opacity-40
                "
              />

              <p>
                No users found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="
                    border-b
                    border-slate-800
                    text-left
                    text-xs
                    uppercase
                    tracking-wider
                    text-slate-500
                  ">

                    <th className="px-5 py-4">
                      User
                    </th>

                    <th className="px-5 py-4">
                      Email
                    </th>

                    <th className="px-5 py-4">
                      Role
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="
                      px-5
                      py-4
                      text-right
                    ">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {users.map((user) => (

                    <tr
                      key={user.id}
                      className="
                        border-b
                        border-slate-800/70
                        hover:bg-slate-800/30
                        transition
                      "
                    >


                      {/* User */}

                      <td className="px-5 py-4">

                        <button
                          onClick={() =>
                            setSelectedUser(user)
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            text-left
                          "
                        >

                          <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-cyan-500/10
                            font-bold
                            text-cyan-400
                          ">

                            {getInitials(
                              user.full_name
                            )}

                          </div>


                          <div>

                            <p className="
                              font-semibold
                              text-sm
                              hover:text-cyan-300
                            ">
                              {user.full_name}
                            </p>

                            <p className="
                              text-xs
                              text-slate-500
                              mt-0.5
                            ">
                              User ID #{user.id}
                            </p>

                          </div>

                        </button>

                      </td>


                      {/* Email */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <div className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-slate-300
                        ">

                          <Mail
                            size={15}
                            className="text-slate-500"
                          />

                          {user.email}

                        </div>

                      </td>


                      {/* Role */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <span className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-cyan-500/20
                          bg-cyan-500/10
                          px-2.5
                          py-1
                          text-xs
                          font-semibold
                          text-cyan-300
                        ">

                          <UserCheck size={13} />

                          {user.role}

                        </span>

                      </td>


                      {/* Status */}

                      <td className="
                        px-5
                        py-4
                      ">

                        {user.is_active ? (

                          <span className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-emerald-500/10
                            px-2.5
                            py-1
                            text-xs
                            font-semibold
                            text-emerald-400
                          ">

                            <span className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-emerald-400
                            " />

                            Active

                          </span>

                        ) : (

                          <span className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-red-500/10
                            px-2.5
                            py-1
                            text-xs
                            font-semibold
                            text-red-400
                          ">

                            <span className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-red-400
                            " />

                            Inactive

                          </span>

                        )}

                      </td>


                      {/* Actions */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <div className="
                          flex
                          justify-end
                          gap-2
                        ">


                          {/* Toggle */}

                          <button
                            disabled={
                              actionLoading === user.id
                            }
                            onClick={() =>
                              handleToggleStatus(user)
                            }
                            title={
                              user.is_active
                                ? "Deactivate user"
                                : "Activate user"
                            }
                            className={`
                              rounded-lg
                              border
                              p-2
                              transition
                              ${
                                user.is_active
                                  ? "border-amber-500/20 text-amber-400 hover:bg-amber-500/10"
                                  : "border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10"
                              }
                            `}
                          >

                            {user.is_active ? (

                              <UserX size={17} />

                            ) : (

                              <UserCheck size={17} />

                            )}

                          </button>


                          {/* Delete */}

                          <button
                            disabled={
                              actionLoading === user.id
                            }
                            onClick={() =>
                              handleDelete(user)
                            }
                            title="Delete user"
                            className="
                              rounded-lg
                              border
                              border-red-500/20
                              p-2
                              text-red-400
                              hover:bg-red-500/10
                              transition
                            "
                          >

                            <Trash2 size={17} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* ===================================================
          USER DETAIL MODAL
      =================================================== */}

      {selectedUser && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-4
          backdrop-blur-sm
        ">

          <div className="
            w-full
            max-w-md
            rounded-2xl
            border
            border-slate-700
            bg-[#0b1020]
            p-6
            shadow-2xl
          ">

            <div className="
              flex
              items-start
              justify-between
              gap-4
            ">

              <div>

                <p className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-cyan-400
                ">
                  User Details
                </p>

                <h2 className="
                  mt-1
                  text-xl
                  font-bold
                ">
                  {selectedUser.full_name}
                </h2>

              </div>


              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="
                  rounded-lg
                  p-2
                  text-slate-400
                  hover:bg-slate-800
                  hover:text-white
                "
              >

                <X size={18} />

              </button>

            </div>


            <div className="
              mt-6
              space-y-4
            ">

              <DetailRow
                label="User ID"
                value={`#${selectedUser.id}`}
              />

              <DetailRow
                label="Email"
                value={selectedUser.email}
              />

              <DetailRow
                label="Role"
                value={selectedUser.role}
              />

              <DetailRow
                label="Status"
                value={
                  selectedUser.is_active
                    ? "Active"
                    : "Inactive"
                }
              />

            </div>

          </div>

        </div>

      )}

    </div>

  );
}


// =========================================================
// HELPERS
// =========================================================

function getInitials(name) {

  if (!name) {
    return "U";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(
      (word) =>
        word.charAt(0).toUpperCase()
    )
    .join("");
}


function DetailRow({
  label,
  value,
}) {

  return (

    <div className="
      rounded-xl
      border
      border-slate-800
      bg-slate-900/50
      px-4
      py-3
    ">

      <p className="
        text-xs
        text-slate-500
      ">
        {label}
      </p>

      <p className="
        mt-1
        break-all
        text-sm
        font-medium
        text-slate-200
      ">
        {value}
      </p>

    </div>

  );
}


export default UserManagement;