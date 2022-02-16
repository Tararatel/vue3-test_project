const API_URL = 'https://dummy.restapiexample.com/api';

import axios from 'axios';

class DataRequests {
  getEmployee() {
    return axios.get(`${API_URL}//v1/employees`);
  }

  delEmployee(id) {
    return axios.delete(`${API_URL}/v1/delete/${id}`);
  }

  addEmployee(data) {
    return axios.post(`${API_URL}/v1/create`, data);
  }

  getSpecificEmployee(id) {
    return axios.get(`${API_URL}/v1/employee/${id + 1}`);
  }

  updEmployee(id, data) {
    return axios.put(
      `http://dummy.restapiexample.com/api/v1/update/${id}`,
      data
    );
  }
}

export default new DataRequests();
