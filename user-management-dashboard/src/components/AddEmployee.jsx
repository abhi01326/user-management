import React, { useState } from "react";
import { addEmployee } from "../services/api";

const AddEmployee = ({
  setShowForm,
  departments,
  setEmployees,
  refreshEmployees,
}) => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    department: departments[0],
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const newEmployee = await addEmployee(form);
      setEmployees((prev) => [...prev, newEmployee]); // update local state
      await refreshEmployees(); // 🔄 refresh latest data from API
      setShowForm(false);
    } catch {
      setError("Failed to add employee.");
    }
  };

  return (
    <div className="p-4 border mb-4 w-full max-w-lg">
      <h2 className="text-xl mb-2">Add Employee</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="border p-2"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
