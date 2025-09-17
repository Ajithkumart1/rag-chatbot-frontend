import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  async createSession() {
    try {
      const response = await this.client.post('/api/session/new');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create session: ${error.message}`);
    }
  }

  async clearSession(sessionId) {
    try {
      const response = await this.client.delete(`/api/session/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to clear session: ${error.message}`);
    }
  }

  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }
}

export default new ApiService();
