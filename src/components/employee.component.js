import React, {Component} from "react";
import EmployeDataService from "../services/employee.service";
import {withRouter} from '../common/with-router';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.getEmploye = this.getEmploye.bind(this);
        this.updateEmploye = this.updateEmploye.bind(this);
        this.deleteEmploye = this.deleteEmploye.bind(this);

        this.state = {
            currentEmploye: {
                id: null,
                name: "",
                surname: "",
                email: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getEmploye(this.props.router.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentEmploye: {
                    ...prevState.currentEmploye,
                    name: name
                }
            };
        });
    }

    onChangeSurname(e) {
        const surname = e.target.value;

        this.setState(prevState => ({
            currentEmploye: {
                ...prevState.currentEmploye,
                surname: surname
            }
        }));
    }


    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(prevState => ({
            currentEmploye: {
                ...prevState.currentEmploye,
                email: email
            }
        }));
    }

    getEmploye(id) {
        EmployeDataService.get(id)
            .then(response => {
                this.setState({
                    currentEmploye: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    updateEmploye() {
        EmployeDataService.update(
            this.state.currentEmploye.id,
            this.state.currentEmploye
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The employe was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteEmploye() {
        EmployeDataService.delete(this.state.currentEmploye.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/employees');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentEmploye} = this.state;

        return (
            <div>
                {currentEmploye ? (
                    <div className="edit-form">
                        <h4>Employee</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentEmploye.name}
                                    onChange={this.onChangeName}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    value={currentEmploye.surname}
                                    onChange={this.onChangeSurname}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Email:</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    value={currentEmploye.email}
                                    onChange={this.onChangeEmail}
                                    required
                                />
                            </div>
                        </form>


                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateEmploye}
                        >
                            Update
                        </button>

                        <button style={{marginLeft: "1em"}}
                            className="btn btn-danger mr-2"
                            onClick={this.deleteEmploye}
                        >
                            Delete
                        </button>


                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Employee...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Employee);