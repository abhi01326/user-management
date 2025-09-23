import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import EmployeeDetails from "../components/EmployeeDetails";
import AddEmployee from "../components/AddEmployee";
import { fetchEmployees, deleteEmployee } from "../services/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const departments = [
    "Operations",
    "Finance",
    "Sales",
    "Engineering",
    "Design",
    "HR",
    "Support",
    "Marketing",
  ];

  const thClass = "px-4 py-2 border w-[calc(100%/7)]";

  //  Fetch employees whenever page changes
  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEmployees(page);
      setEmployees(data);
    } catch (err) {
      setError("Unable to load employees." + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [page]);

  // Delete employee
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      setError("Failed to delete employee." + err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h1 className="text-3xl mb-4">Employee List</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <>
          {showForm && (
            <AddEmployee
              setShowForm={setShowForm}
              departments={departments}
              setEmployees={setEmployees}
              refreshEmployees={loadEmployees} // 🔄 refresh after add
            />
          )}

          <div className="overflow-x-auto w-full">
            <table className="w-full border-2">
              <thead className="bg-green-500 text-white">
                <tr className="h-[80px] border-2">
                  <th className="px-4 py-2 border w-[calc(100%/25)]">ID</th>
                  <th className={thClass}>Email</th>
                  <th className={thClass}>First Name</th>
                  <th className={thClass}>Last Name</th>
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <EmployeeDetails
                    key={employee.id}
                    employee={employee}
                    deleteUser={handleDelete}
                    departments={departments}
                  />
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setPage((p) => (p > 1 ? p - 1 : p))}
              >
                Previous
              </button>
              <span>Page {page}</span>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>

            {/* Add Employee */}
            <div className="mt-4">
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Employee
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
