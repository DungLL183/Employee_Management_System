import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id)
      .then((res) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  const viewEmployee = (id) => {
    navigate(`/view-employee/${id}`);
  };

  const editEmployee = (id) => {
    navigate(`/add-employee/${id}`);
  };

  useEffect(() => {
    EmployeeService.getEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error('Error retrieving employees:', error);
      });
  }, []);

  const addEmployee = () => {
    navigate('/add-employee/_add');
  };

  return (
    <div>
      <h2 className='text-center'>Employees List</h2>
      <div className='row'>
        <button className='btn btn-primary' onClick={addEmployee}>
          Add Employee
        </button>
      </div>
      <br></br>
      <div className='row'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                  <button onClick={() => editEmployee(employee.id)} className='btn btn-info'>
                    Update
                  </button>
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => deleteEmployee(employee.id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => viewEmployee(employee.id)}
                    className='btn btn-success'
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;