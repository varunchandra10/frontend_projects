import { API_URL } from "./indexApi";

// Fetch permissions from the server
export const fetchPermissions = async () => {
  const response = await fetch(`${API_URL}/permissions`);
  return response.json();
};

// Add a new permission to the server
export const addPermission = async (permission) => {
  const response = await fetch(`${API_URL}/permissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(permission),
  });
  return response.json();
};

// Update permission on the server
export const updatePermission = async (id, updatedPermission) => {
  const response = await fetch(`${API_URL}/permissions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPermission),
  });
  return response.json();
};

// Delete permission from the server
export const deletePermission = async (id) => {
  const response = await fetch(`${API_URL}/permissions/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};
