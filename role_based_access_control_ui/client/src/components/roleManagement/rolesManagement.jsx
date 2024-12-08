import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, Popconfirm, message, Select } from "antd";
import { fetchRoles, addRole, updateRole, deleteRole } from "../../api/roleApi";
import SearchBar from "../searchbar/searchBar";
import "../components.css";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles);
      setFilteredRoles(fetchedRoles);
    } catch (error) {
      message.error("Failed to load roles");
    }
  };

  const handleSearch = (value) => {
    const searchQuery = value.toLowerCase();
    const filtered = roles.filter((role) =>
      role.name.toLowerCase().includes(searchQuery)
    );
    setFilteredRoles(filtered);
  };

  const handlePermissionFilter = (permissions) => {
    if (permissions.length === 0) {
      setFilteredRoles(roles);
      return;
    }
    const filtered = roles.filter((role) =>
      permissions.every((perm) => role.permissions.includes(perm))
    );
    setFilteredRoles(filtered);
  };

  const handleAddOrEditRole = async (values) => {
    try {
      if (isEdit && editingRole) {
        await updateRole(editingRole.id, values);
        message.success("Role updated successfully");
      } else {
        await addRole({ ...values, permissions: [] });
        message.success("Role added successfully");
      }
      setIsModalOpen(false);
      setEditingRole(null);
      loadRoles();
    } catch (error) {
      message.error("Error saving role");
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id);
      message.success("Role deleted successfully");
      loadRoles();
    } catch (error) {
      message.error("Error deleting role");
    }
  };

  const openEditModal = (role) => {
    setIsEdit(true);
    setEditingRole(role);
    form.setFieldsValue(role);
    setIsModalOpen(true);
  };

  return (
    <div className="management">
      <div className="management-head">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Role
        </Button>

        <SearchBar
          placeholder="Search by role name"
          onSearch={handleSearch}
          statusFilter={false}
          permissionFilter={true}
          onPermissionChange={handlePermissionFilter}
        />
      </div>

      <div className="card-container">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="card">
            <div className="card-details">
              <p>
                <strong>Role Name:</strong> {role.name}
              </p>
              <p>
                <strong>Permissions:</strong>{" "}
                {role.permissions.length > 0
                  ? role.permissions.join(", ")
                  : "No permissions assigned"}
              </p>
            </div>
            <div className="card-actions">
              <Button
                type="link"
                className="edit_button"
                onClick={() => openEditModal(role)}
              >
                Edit
              </Button>

              <Popconfirm
                title="Are you sure you want to delete this role?"
                onConfirm={() => handleDeleteRole(role.id)}
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
        title={isEdit ? "Edit Role" : "Add Role"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingRole(null);
          setIsEdit(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrEditRole} layout="vertical">
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: "Please enter a role name" }]}
          >
            <Input />
          </Form.Item>

          {/* Permissions filter */}
          <Form.Item name="permissions" label="Permissions">
            <Select
              mode="multiple"
              placeholder="Select permissions"
              allowClear
              onChange={handlePermissionFilter}
            >
              <Select.Option value="Read">Read</Select.Option>
              <Select.Option value="Write">Write</Select.Option>
              <Select.Option value="Delete">Delete</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
