import React, {Component} from "react";
import EmployeeDataService from "../services/employee.service";
import {Link} from "react-router-dom";
import EmployeDataService from "../services/employee.service";

export default class EmployeesList extends Component {
    constructor(props) {
        super(props);
        this.retrieveEmployees = this.retrieveEmployees.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveEmployee = this.setActiveEmployee.bind(this);
        this.deleteEmploye = this.deleteEmploye.bind(this);


        this.state = {
            employees: [],
            currentEmployee: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveEmployees();
    }

    retrieveEmployees() {
        EmployeeDataService.getAll()
            .then((response) => {
                this.setState({
                    employees: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveEmployees();
        this.setState({
            currentEmployee: null,
            currentIndex: -1,
        });
    }

    setActiveEmployee(employee, index) {
        this.setState({
            currentEmployee: employee,
            currentIndex: index,
        });
    }

    deleteEmploye() {
        console.log(this.state.id)
        EmployeDataService.delete(this.state.currentEmployee.id)
            .then(response => {
                console.log(response.data);
                this.refreshList()
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {employees, currentEmployee, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Employees List</h4>

                    <ul className="list-group">
                        {employees &&
                            employees.map((employee, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveEmployee(employee, index)}
                                    key={index}
                                >
                                    {employee.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentEmployee ? (
                        <div>
                            <h4>Employee</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentEmployee.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Surname:</strong>
                                </label>{" "}
                                {currentEmployee.surname}
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>{" "}
                                {currentEmployee.email}
                            </div>

                            <Link
                                to={"/employees/" + currentEmployee.id}
                                className="btn btn-warning"
                            >
                                Edit
                            </Link>
                            <button style={{marginLeft: "1em"}}
                                className="btn btn-danger"
                                onClick={this.deleteEmploye}
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Employee...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
