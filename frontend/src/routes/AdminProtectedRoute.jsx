import { Navigate } from "react-router-dom";


function AdminProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  const userString = localStorage.getItem("user");

  let user = null;

  try {

    user = userString
      ? JSON.parse(userString)
      : null;

  } catch {

    user = null;

  }


  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!token || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // =====================================================
  // NOT ADMIN
  // =====================================================

  if (user.role !== "Admin") {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  // =====================================================
  // ADMIN
  // =====================================================

  return children;
}


export default AdminProtectedRoute;