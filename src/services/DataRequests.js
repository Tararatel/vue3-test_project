const API_URL = 'http://localhost:3000/employees';

import axios from 'axios';

class DataRequests {
  getEmployee() {
    return axios.get(`${API_URL}/`);
  }

  delEmployee(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  addEmployee(data) {
    return axios.post(`${API_URL}/`, data);
  }

  getSpecificEmployee(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  updEmployee(id, data) {
    return axios.patch(`${API_URL}/${id}`, data);
  }
}

export default new DataRequests();
