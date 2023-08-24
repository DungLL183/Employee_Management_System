import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployeeComponent = () => {
  const { id } = useParams();
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((res) => {
        const employee = res.data;
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmailId(employee.emailId);
      })
      .catch((error) => {
        console.error('Error retrieving employee:', error);
      });
  }, [id]);

  const updateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, emailId };
    console.log('employee => ' + JSON.stringify(employee));
    console.log('id => ' + JSON.stringify(id));
    EmployeeService.updateEmployee(employee, id)
      .then((res) => {
        history.push('/employees');
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
      });
  };

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setEmailId(event.target.value);
  };

  const cancel = () => {
    history.push('/employees');
  };

  return (
    <div>
      <br></br>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h3 className='text-center'>Update Employee</h3>
            <div className='card-body'>
              <form>
                <div className='form-group'>
                  <label> First Name: </label>
                  <input
                    placeholder='First Name'
                    name='firstName'
                    className='form-control'
                    value={firstName}
                    onChange={changeFirstNameHandler}
                  />
                </div>
                <div className='form-group'>
                  <label> Last Name: </label>
                  <input
                    placeholder='Last Name'
                    name='lastName'
                    className='form-control'
                    value={lastName}
                    onChange={changeLastNameHandler}
                  />
                </div>
                <div className='form-group'>
                  <label> Email Id: </label>
                  <input
                    placeholder='Email Address'
                    name='emailId'
                    className='form-control'
                    value={emailId}
                    onChange={changeEmailHandler}
                  />
                </div>

                <button className='btn btn-success' onClick={updateEmployee}>
                  Save
                </button>
                <button
                  className='btn btn-danger'
                  onClick={cancel}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeComponent;