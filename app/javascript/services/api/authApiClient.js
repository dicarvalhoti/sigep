class AuthApiClient {
  baseUrl = '/auth';

  async sign_in(credentials) {
    try {
      const response = await fetch(`${this.baseUrl}/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Usuário ou Senha inválidos');
      }
      
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async logout() {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/sign_out`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer logout');
    }

    return response;
  }

  // async validateToken() {
  //   const headers = this.getAuthHeaders();
  //   const response = await fetch(`${this.baseUrl}/validate_token`, {
  //     method: 'GET',
  //     headers,
  //   });

  //   if (!response.ok) {
  //     throw new Error('Erro ao verificar autenticação');
  //   }

  //   return response.json();
  // }

  getAuthHeaders() {
    return {
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    };
  }
}

export default AuthApiClient;