import axios from 'axios';
import BaseApiClient from './baseApiClient';

class PaymentApiClient extends BaseApiClient {
  constructor(options = {}) {
    super('payments', options);
  }


 
}

export default PaymentApiClient;
