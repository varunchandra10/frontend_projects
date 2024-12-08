import { API_URL } from "./indexApi";

// Fetch users from the server
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

// Add a new user to the server
export const addUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

// Update user on the server
export const updateUser = async (id, updatedUser) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  return response.json();
};

// Delete user from the server
export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};
