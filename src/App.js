import React, {useState, useEffect} from "react";
import {Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/authservice";
import Login from "./components/login";
import Register from "./components/register";
import EmployeesList from "./components/employees-list.component";
import EventBus from "./common/EventBus";
import Employee from "./components/employee.component";
import AddEmployee from "./components/add-employee.component";

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <div>


            {currentUser ? (
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/employees"} className="nav-link">
                                Employees
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                    </div>
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">

                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                </nav>
            ) : (
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                </nav>
            )}


            <div className="container mt-3">
                <Routes>
                    <Route exact path={"/"} element={<Login/>}/>
                    <Route exact path={"/home"} element={<EmployeesList/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route path="/employees" element={<EmployeesList/>}/>
                    <Route path="/add" element={<AddEmployee/>}/>
                    <Route path="/employees/:id" element={<Employee/>}/>

                </Routes>
            </div>

            {/* <AuthVerify logOut={logOut}/> */}
        </div>
    );
};

export default App;