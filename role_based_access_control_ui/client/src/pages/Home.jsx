import React from 'react';
import { Tabs } from 'antd';
import UserManagement from '../components/userManagement/usersManagement';
import RoleManagement from '../components/roleManagement/rolesManagement';
import PermissionManagement from '../components/permissionManagement/perManagement';

import '../App.css'
const Home = () => {
    const items = [
        {
            key: "1",
            label: "User Management",
            children: <UserManagement />
        },
        {
            key: "2",
            label: "Role Management",
            children: <RoleManagement />
        },
        {
            key: "3",
            label: "Permission Management",
            children: <PermissionManagement />
        },
    ]
    return (
        <div className='home-page'>
            <Tabs defaultActiveKey='1' items={items} />
        </div>
    )
}

export default Home
