import { API_URL } from "./indexApi";

// Fetch roles from the server
export const fetchRoles = async () => {
  const response = await fetch(`${API_URL}/roles`);
  return response.json();
};

// Add a new role to the server
export const addRole = async (role) => {
  const response = await fetch(`${API_URL}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(role),
  });
  return response.json();
};

// Update role on the server
export const updateRole = async (id, updatedRole) => {
  const response = await fetch(`${API_URL}/roles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRole),
  });
  return response.json();
};

// Delete role from the server
export const deleteRole = async (id) => {
  const response = await fetch(`${API_URL}/roles/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};
