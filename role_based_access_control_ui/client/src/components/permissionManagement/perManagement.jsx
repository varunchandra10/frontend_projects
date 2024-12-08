import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { fetchPermissions, addPermission, updatePermission, deletePermission } from "../../api/permissionApi";
import "../components.css";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    const fetchedPermissions = await fetchPermissions();
    setPermissions(fetchedPermissions);
  };

  const handleAddOrEditPermission = async (values) => {
    if (isEdit && editingPermission) {
      await updatePermission(editingPermission.id, values);
      message.success("Permission updated successfully");
    } else {
      await addPermission(values);
      message.success("Permission added successfully");
    }
    setIsModalOpen(false);
    setEditingPermission(null);
    loadPermissions();
  };

  const handleDeletePermission = async (id) => {
    await deletePermission(id);
    message.success("Permission deleted successfully");
    loadPermissions();
  };

  const openEditModal = (permission) => {
    setIsEdit(true);
    setEditingPermission(permission);
    form.setFieldsValue(permission);
    setIsModalOpen(true);
  };

  return (
    <div className="management">
      <div className="management-head">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Permission
        </Button>
      </div>

      <div className="card-container">
        {permissions.map((permission) => (
          <Card key={permission.id} className="card">
            <div className="card-details">
              <p>
                <strong>Permission Name:</strong> {permission.name}
              </p>
            </div>
            <div className="card-actions">
              <Button type="link" className="edit_button" onClick={() => openEditModal(permission)}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this permission?"
                onConfirm={() => handleDeletePermission(permission.id)}
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
        title={isEdit ? "Edit Permission" : "Add Permission"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingPermission(null);
          setIsEdit(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrEditPermission} layout="vertical">
          <Form.Item
            name="name"
            label="Permission Name"
            rules={[{ required: true, message: "Please enter a permission name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
