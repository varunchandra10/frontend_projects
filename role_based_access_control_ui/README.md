**Role-Based Access Control (RBAC) UI:- Role, User, and Permission Management System**

**DEMO-LINK :**

=> This project is a Role, User, and Permission Management System built using React and Ant Design. 
=> It allows administrators to manage user roles, permissions, and users in an easy-to-use interface. 
=> The system supports adding, editing, and deleting roles and users, along with searching and filtering by role name and permissions.

**Features:**
1) User Management:
    Add, edit, and delete users.
    Assign and manage roles for users.
    Filter users according to the active status and name, email, role.

2) Role Management:
    Add, edit, and delete roles.
    View and manage permissions associated with each role.
    Filter roles by name and permissions.

3) Permission Management:
    Add, edit, and delete permissions.
    Assign permissions to roles and users.

4) Search and Filter:
    Search roles, users, and permissions by name.
    Filter roles and users based on permissions.

5) Responsive Design:
    The interface is fully responsive and optimized for mobile, tablet, and desktop devices.

**Tech Stack**
    *Frontend:* React, Ant Design, React Hooks (useState, useEffect)
    *Backend:* Node.js (for API communication), assuming APIs for roles, users, and permissions management
    *CSS:* Custom CSS with responsive design using media queries

**Setup**: *Prerequisites*
=> Node.js should installed on your machine.
=> Clone the repository: https://github.com/varunchandra10/frontend_projects/edit/main/role_based_access_control_ui
=> Install dependencies(client side)
   cd role-user-permission-management
   mkdir client
   cd client
   npx create-react-app ./
   npm install axios react-router-dom antd
=> To start:
   npm start
   Open the browser and go to http://localhost:3000 to view the application.

=> Install dependencies(server side)
   cd role-user-permission-management
   mkdir server
   cd server
   npm init
   npm install express path body-parser fs
=> To start:
   npm start
   Open the browser and go to http://localhost:5000 to view the application.

**Backend Setup**- To interact with the API, you'll need to set up your backend with the following endpoints:

GET    /api/roles           – Fetch all roles
POST   /api/roles           – Add a new role
PUT    /api/roles/:id       – Update an existing role
DELETE /api/roles/:id       – Delete a role
GET    /api/users           – Fetch all users
POST   /api/users           – Add a new user
PUT    /api/users/:id       – Update an existing user
DELETE /api/users/:id       – Delete a user
GET    /api/permissions     – Fetch all permissions
POST   /api/permissions     – Add a new permission
PUT    /api/permissions/:id – Update an existing permission
DELETE /api/permissions/:id – Delete a permission
