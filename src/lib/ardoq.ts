import axios from 'axios';

const ARDOQ_API_URL = 'https://app.ardoq.com/api';

class ArdoqClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private getHeaders() {
    return {
      'Authorization': `Token token=${this.token}`,
      'Content-Type': 'application/json'
    };
  }

  async getWorkspaces() {
    try {
      const response = await axios.get(`${ARDOQ_API_URL}/workspaces`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      throw error;
    }
  }

  async getComponents(workspaceId: string) {
    try {
      const response = await axios.get(`${ARDOQ_API_URL}/components`, {
        headers: this.getHeaders(),
        params: { workspace: workspaceId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching components:', error);
      throw error;
    }
  }

  async getReferences(workspaceId: string) {
    try {
      const response = await axios.get(`${ARDOQ_API_URL}/references`, {
        headers: this.getHeaders(),
        params: { workspace: workspaceId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching references:', error);
      throw error;
    }
  }
}