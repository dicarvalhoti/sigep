import axios from 'axios';
import BaseApiClient from './baseApiClient';

class CustomerApiClient extends BaseApiClient {
  constructor(options = {}) {
    super('customers', options);
  }
}

export default CustomerApiClient;
