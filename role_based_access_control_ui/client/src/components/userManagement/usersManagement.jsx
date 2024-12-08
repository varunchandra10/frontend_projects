import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, Select, Popconfirm, message, Tag } from "antd";
import { fetchUsers, addUser, updateUser, deleteUser } from "../../api/userApi";
import SearchBar from "../searchbar/searchBar";
import "../components.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { Option } = Select;
  const [form] = Form.useForm();

  // Load users from the server
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      // console.log(fetchedUsers); 
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    } catch (error) {
      message.error("Failed to load users");
    }
  };

  // Handle search
  const handleSearch = (value) => {
    const searchQuery = value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery) ||
        user.role.toLowerCase().includes(searchQuery)
    );
    setFilteredUsers(filtered);
  };

  // Handle status filter
  const handleStatusFilter = (status) => {
    const filtered = status
      ? users.filter((user) => user.status === status)
      : users;
    setFilteredUsers(filtered);
  };

  // Handle add or edit user
  const handleAddOrEditUser = async (values) => {
    try {
      if (isEdit && editingUser) {
        await updateUser(editingUser.id, values); 
        message.success("User updated successfully");
      } else {
        await addUser(values); 
        message.success("User added successfully");
      }
      setIsModalOpen(false);
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      message.error("Failed to save user");
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id); 
      message.success("User deleted successfully");
      loadUsers(); 
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  // Open modal for editing user
  const openEditModal = (user) => {
    setIsEdit(true);
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  return (
    <div className="management">
      <div className="management-head">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>

        <SearchBar
          placeholder="Search by name, email or role"
          onSearch={handleSearch}
          statusFilter={true}
          onStatusChange={handleStatusFilter}
        />
      </div>

      <div className="card-container">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="card">
            <div className="card-details">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {user.status === "Active" ? (
                  <Tag color="green"> Active</Tag>
                ) : (
                  <Tag color="red">Inactive</Tag>
                )}
              </p>
            </div>
            <div className="card-actions">
              <Button
                type="link"
                className="edit_button"
                onClick={() => openEditModal(user)}
              >
                Edit
              </Button>

              <Popconfirm
                title="Are you sure you want to delete this user?"
                onConfirm={() => handleDeleteUser(user.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" className="delete_button">
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={isEdit ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingUser(null);
          setIsEdit(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrEditUser} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter an email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Editor">Editor</Option>
              <Option value="Viewer">Viewer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
