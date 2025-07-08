import React from 'react';
import "./Sidebar.css"
import {Link} from "react-router";
const Sidebar = () => {
  return (
      <aside className="sidebar p-3">
          <Link to="/admin" style={{fontSize:"23px"}} className="text-white mb-4">Admin Panel</Link>
          <ul className="nav flex-column text-white">
              <li className="nav-item mb-2"><Link className="nav-link text-white" to="/check/Auth">Auth</Link></li>
              <li className="nav-item mb-2"><Link className="nav-link text-white" to="/admin/blogs">Blogs</Link></li>
              <li className="nav-item mb-2"><Link className="nav-link text-white" to="/admin/components">Components</Link></li>
              <li className="nav-item mb-2"><Link className="nav-link text-white" to="/admin/feedback">Feedbacks</Link></li>
              <li className="nav-item mb-2"><Link className="nav-link text-white" to="/admin/receipts">Receipts</Link></li>
              <li className="nav-item mb-2"><Link className="nav-link text-white" to="/admin/supporters">Supporters</Link></li>
          </ul>
      </aside>
  );
};

export default Sidebar;