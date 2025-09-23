import React, { useState } from "react";

const EmployeeDetails = ({ employee, deleteUser, departments }) => {
  const [edit, setEdit] = useState(false);

  const [email, setEmail] = useState(employee.email);
  const [firstName, setFirstName] = useState(employee.firstname);
  const [lastName, setLastName] = useState(employee.lastname);
  const [department, setDepartment] = useState(employee.department);

  const handleEditToggle = () => {
    setEdit((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`https://user-management-psaw.onrender.com/users/${employee.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstname: firstName,
          lastname: lastName,
          department,
        }),
      });

      if (!res.ok) {
        const msg = await res.json();
        console.error("Update failed:", msg);
        return;
      }

      console.log("Employee updated successfully");
      setEdit(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async () => {
    deleteUser(employee.id);
  };

  return (
    <tr className="border-b text-center">
      {/* ID */}
      <td>{employee.id}</td>

      {/* Email */}
      <td>
        <input
          className="border px-2 py-1 w-full disabled:bg-gray-100"
          type="email"
          value={email}
          disabled={!edit}
          onChange={(e) => setEmail(e.target.value)}
        />
      </td>

      {/* Firstname */}
      <td>
        <input
          className="border px-2 py-1 w-full disabled:bg-gray-100"
          type="text"
          value={firstName}
          disabled={!edit}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </td>

      {/* Lastname */}
      <td>
        <input
          className="border px-2 py-1 w-full disabled:bg-gray-100"
          type="text"
          value={lastName}
          disabled={!edit}
          onChange={(e) => setLastName(e.target.value)}
        />
      </td>

      {/* Department */}
      <td>
        <select
          className="border px-2 py-1 w-full disabled:bg-gray-100"
          value={department}
          disabled={!edit}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((eachDepartment) => (
            <option value={eachDepartment} key={eachDepartment}>
              {eachDepartment}
            </option>
          ))}
        </select>
      </td>

      {/* Actions */}
      <td className="flex gap-5 justify-center items-center">
        {edit ? (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 h-[32px] w-[104px]"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 h-[32px] w-[104px]"
            onClick={handleEditToggle}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 h-[32px] w-[104px]"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeDetails;
