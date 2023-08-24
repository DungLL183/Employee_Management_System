import './App.css';
import CreateEmployeeComponent from './component/CreateEmployeeComponent';
import FooterComponent from './component/FooterComponent';
import HeaderComponent from './component/HeaderComponent';
import ListEmployeeComponent from './component/ListEmployeeComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UpdateEmployeeComponent from './component/UpdateEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path='/' exact element={<ListEmployeeComponent/>} />
              <Route path='/employees' element={<ListEmployeeComponent />} />
              <Route path='/add-employee/:id' element={<CreateEmployeeComponent/>}/>
              {/* <Route path='/update-employee/:id' element={<UpdateEmployeeComponent/>}/> */}

            </Routes>
          </div>
          <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;