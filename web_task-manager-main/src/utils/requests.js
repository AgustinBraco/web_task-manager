import axios from 'axios'

class Request {
  constructor() {
    this.url = import.meta.env.VITE_API_URL
    this.config = {
      headers: {
        api_key: import.meta.env.VITE_API_KEY,
        'Content-Type': 'application/json'
      }
    }
  }

  async get() {
    try {
      const response = await axios.get(this.url, this.config)
      return response.data.data
    } catch (error) {
      console.log('Error getting tasks:', error)
      return []
    }
  }

  async create(body) {
    try {
      const response = await axios.post(this.url, body, this.config)
      return response.data.status
    } catch (error) {
      console.log('Error creating task:', error)
    }
  }

  async update(id, body) {
    try {
      const response = await axios.put(`${this.url}/${id}`, body, this.config)
      return response.data.status
    } catch (error) {
      console.log('Error updating task:', error)
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.url}/${id}`, this.config)
      return response.data.status
    } catch (error) {
      console.log('Error deleting task:', error)
    }
  }
}

export default Request
