// Sidebar.js

import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

function Sidebar() {
  const handleSignOut = () => {
    // Clear user_id and token cookies
    document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

    // Redirect to login or home page
    window.location.href = '/';
  };

  return (
    <div>
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" style={{ height: '100%', borderRight: 0 }}>
        <section className="containerSidebar">
          <div>
            <Menu.Item key="1">
              <Link to="/Dashboard/home">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/Dashboard/transactions">Transactions</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/Dashboard/profile">My Profile</Link>
            </Menu.Item>
          </div>
          <Button className="my-button" type="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </section>
      </Menu>
    </div>
  );
}

export default Sidebar;
