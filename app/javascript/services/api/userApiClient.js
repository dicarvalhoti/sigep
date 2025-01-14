import axios from 'axios';
import BaseApiClient from './baseApiClient';

class UserApiClient extends BaseApiClient {
  constructor(options = {}) {
    super('users', options);
  }

  async getCurrentUser() {
    const headers = await this.getDefaultHeaders();
    return axios.get('api/v1/users/show', { headers })
      .then(response => response.data);
  }

  async toggleStatus(id) {
    const headers = await this.getDefaultHeaders();
    console.log("Status enviado:", id); 
    return axios.patch(`/api/v1/users/${id}/toggle_status`, headers)
      .then(response => response.data);
  }
}

export default UserApiClient;
