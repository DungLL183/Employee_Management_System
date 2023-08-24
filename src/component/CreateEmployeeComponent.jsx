// import React, { Component } from 'react';
// import EmployeeService from '../services/EmployeeService';


// class CreateEmployeeComponent extends Component {

//     constructor(props){
//         super(props)
//         this.state={
//             firstName:'',
//             lastName:'',
//             emailId:''
//         }

//         this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
//         this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
//         this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
//         this.saveEmployee = this.saveEmployee.bind(this);
//         this.cancel = this.cancel.bind(this);

//     }

//     saveEmployee = (e) =>{
//         e.preventDefault();

//         let employee = {firstName:this.state.firstName, lastName:this.state.lastName, emailId:this.state.emailId};
//         console.log('employee =>' + JSON.stringify(employee));

//         EmployeeService.createEmployee(employee).then(res=>{
//             this.props.history.push('/employees');
//         });
//     }

//     changeFirstNameHandler = (event)=>{
//         this.setState({firstName: event.target.value});
//     }

//     changeLastNameHandler = (event) =>{
//         this.setState({lastName: event.target.value});
//     }

//     changeEmailIdHandler = (event) =>{
//         this.setState({emailId: event.target.value});
//     }

//     cancel=()=>{
//         this.props.history.push('/add-employee');
//     }

//     render() {
//         return (
//             <div>
//                 <div className='container'>
//                     <div className='row'>
//                         <div className='card col-md-6 offset-md-3 offset-md-3'>
//                             <h3 className='text-cemter'>Add Employee</h3>
//                             <div className='card-body'>
//                                 <form>
//                                     <div className='form-group'>
//                                         <label>First name:</label>
//                                         <input placeholder='First Name' name='firstName' className='form-control'
//                                             value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
//                                     </div>
//                                     <div className='form-group'>
//                                         <label>Last name:</label> 
//                                         <input placeholder='Last Name' name='lastName' className='form-control'
//                                             value={this.state.lastName} onChange={this.changeLastNameHandler}/>
//                                     </div>
//                                     <div className='form-group'>
//                                         <label>Email Address:</label>
//                                         <input placeholder='Email Address' name='emailId' className='form-control'
//                                             value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
//                                     </div>

//                                     <button className='btn btn-success' onClick={this.saveEmployee}>Save</button>
//                                     <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default CreateEmployeeComponent;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  useEffect(() => {
    if (id === '_add') {
      return;
    } else {
      EmployeeService.getEmployeeById(id).then((res) => {
        let employee = res.data;
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmailId(employee.emailId);
      });
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    let employee = { firstName, lastName, emailId };
    console.log('employee =>' + JSON.stringify(employee));

    if (id === '_add') {
      EmployeeService.createEmployee(employee).then((res) => {
        navigate('/employees');
      });
    } else {
      EmployeeService.updateEmployee(employee, id).then((res) => {
        navigate('/employees');
      });
    }
  };

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const changeEmailIdHandler = (event) => {
    setEmailId(event.target.value);
  };

  const cancel = () => {
    navigate('/employees');
  };

  const getTitle = () => {
    if (id === '_add') {
      return <h3 className='text-center'>Add Employee</h3>;
    } else {
      return <h3 className='text-center'>Update Employee</h3>;
    }
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            {getTitle()}
            <div className='card-body'>
              <form>
                <div className='form-group'>
                  <label>First name:</label>
                  <input
                    placeholder='First Name'
                    name='firstName'
                    className='form-control'
                    value={firstName}
                    onChange={changeFirstNameHandler}
                  />
                </div>
                <div className='form-group'>
                  <label>Last name:</label>
                  <input
                    placeholder='Last Name'
                    name='lastName'
                    className='form-control'
                    value={lastName}
                    onChange={changeLastNameHandler}
                  />
                </div>
                <div className='form-group'>
                  <label>Email Address:</label>
                  <input
                    placeholder='Email Address'
                    name='emailId'
                    className='form-control'
                    value={emailId}
                    onChange={changeEmailIdHandler}
                  />
                </div>

                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
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

export default CreateEmployeeComponent;