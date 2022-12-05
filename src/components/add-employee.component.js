import React, {Component} from "react";
import EmployeeDataService from "../services/employee.service";


export default class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.newEmployee = this.newEmployee.bind(this);


        this.state = {
            id: null,
            name: "",
            surname: "",
            email: "",
            submitted: false,
            message: ""
        };
    }


    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeSurname(e) {
        this.setState({
            surname: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    saveEmployee() {
        var data = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
        };

        EmployeeDataService.create(data)
            .then((response) => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    surname: response.data.surname,
                    email: response.data.email,

                    submitted: true,
                });
                this.setState({message: ""})
            })
            .catch((error) => {

                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({message: resMessage})

            });
    }

    newEmployee() {
        this.setState({
            id: null,
            name: "",
            surname: "",
            email: "",

            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newEmployee}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                className="form-control"
                                id="surname"
                                required
                                value={this.state.surname}
                                onChange={this.onChangeSurname}
                                name="surname"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                name="email"
                            />
                        </div>

                        <button onClick={this.saveEmployee} className="btn btn-success">
                            Submit
                        </button>
                        <a href="/employees" className="btn btn-danger">Cancel</a>
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
