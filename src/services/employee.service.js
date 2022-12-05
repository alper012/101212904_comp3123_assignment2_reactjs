import axios from "axios";
import authHeader from "../common/auth-header";

const URL = "https://employee-vbackend.herokuapp.com/api/employees";

class EmployeeDataService {

    getAll() {
        return axios.get(URL, {headers: authHeader()}
        );
    }

    get(id) {
        return axios.get(URL + '/' + id, {headers: authHeader()});
    }

    create(data) {
        return axios.post(URL, data, {headers: authHeader()});
    }

    update(id, data) {
        return axios.put(URL + '/' + id, data, {headers: authHeader()});
    }

    delete(id) {
        return axios.delete(URL + '/' + id, {headers: authHeader()});
    }
}

export default new EmployeeDataService();