import { API_VERSION } from '../../config/constants';
import axios from 'axios';

class BaseApiClient {
    constructor(resource, options = {}) {
        this.apiVersion = `/api/${options.apiVersion || API_VERSION}`;
        this.resource = resource;
        this.options = options;
        this.httpClient = axios.create({
            baseURL: this.apiVersion,
            headers: this.getDefaultHeaders(),
        });
    }

    async get(id) {
        return this.request('GET', this.getUrl(id));
    }

    async getAll(params = {}) {
        return this.request('GET', this.getUrl(null, params));
    }

    async post(data) {
        return this.request('POST', this.getUrl(), data);
    }

    async put(id, data) {
        return this.request('PUT', this.getUrl(id), data);
    }

    async patch(data) {
        return this.request('PATCH', this.getUrl(data.id), data);
    }

    async delete(id) {
        return this.request('DELETE', this.getUrl(id));
    }

    async request(method, url, data = null) {
        try {
            const response = await this.httpClient.request({
                method,
                url,
                data,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    handleError(error) {
       
        if (error.response) {
            const { status, message } = error.response;
            const data = error.response.data;
            const errorMessage = message || 
                (typeof data?.errors === 'object' ? data?.errors.join(',') : 'Erro ao processar a requisição');
            const errorDetails = data?.errors || null;
            
            return {
                status,
                message: errorMessage,
                details: errorDetails,
            };
        }
    
        return {
            status: 500,
            message: 'Erro desconhecido. Verifique sua conexão.',
        };
    }

    getUrl(id = null, params = {}) {
        const baseUrl = `${this.resource}${id ? `/${id}` : ''}`;
        const queryString = new URLSearchParams(params).toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }

    getDefaultHeaders() {
        const { accessToken, client, uid } = this.getAuthTokens();
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'access-token': accessToken,
            client,
            uid,
            ...this.options.headers,
        };
    }

    getAuthTokens() {
        return {
            accessToken: localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
        };
    }

    defaultUrl() {
        const url = `${this.apiVersion}/${this.resource}`;
        return url;
    }
}

export default BaseApiClient;
