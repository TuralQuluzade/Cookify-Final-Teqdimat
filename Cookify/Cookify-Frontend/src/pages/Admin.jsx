import React from 'react';
import {useSelector} from "react-redux";
import Sect1 from "../sections/admin-Sections/sect1/Sect1.jsx";

const Admin = () => {
  const user = useSelector(state => state.user.user);
  console.log("Admin Page user role:", user?.role);
  return (
    <div>
      <Sect1/>
    </div>
  );
};

export default Admin;