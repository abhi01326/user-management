// src/services/api.js
const BASE_URL = "https://user-management-psaw.onrender.com/users";

// Fetch employees with pagination
export const fetchEmployees = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`);
    if (!response.ok) throw new Error("Failed to fetch employees");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Delete employee by ID
export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete employee");
    return true;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Add employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) throw new Error("Failed to add employee");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
