import React from "react";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import User from "./pages/User";
import Createrole from "./pages/Createrole";
import Assignrole from "./pages/Assignrole";
import Air from "./pages/Air";
import { Provider } from "react-redux";
import { store } from "./pages/store";
import RoleAssign from "./pages/RoleAssign";
import PrivateRoute from "./components/PrivateRoute";
import { AbilityContext } from "./casl/AbilityContext";
import { defineAbility } from "@casl/ability";
import { defineAbilityFor } from "./casl/ability";
import Property from "./pages/Property";
import Register from "./pages/Register";
import Subscription from "./pages/Subscription";
import ModalSubscription from "./pages/ModalSubscription";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AddProperty from "./pages/AddProperty";
import Rooms from "./pages/Rooms";

const App = () => {
  // let id =localStorage.getItem('id')
  // let role =localStorage.getItem('role')
  // const currentUser ={
  //   id:id,
  //   role:role
  // }
  let permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  const ability = defineAbilityFor(permissions);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <AbilityContext.Provider value={ability}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/user" element={<User />} />
              <Route path="/role" element={<Createrole />} />
              <Route path="/assign" element={<Assignrole />} />
              <Route
                path="/property"
                element={
                  <PrivateRoute allowRoles={["admin", "host"]}>
                    <Property />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dash"
                element={
                  <PrivateRoute allowRoles={["admin", "host"]}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/unauthorized" element={<>unauthorized</>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<AddProperty />} path="/add-property" />
              <Route path="/assignrole" element={<RoleAssign />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/plans" element={<ModalSubscription />} />
            </Routes>
          </BrowserRouter>
        </AbilityContext.Provider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
