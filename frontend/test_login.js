import axios from 'axios';

async function testFlow() {
  try {
    const api = axios.create({
      baseURL: 'http://localhost:5000', // Need to check what VITE_SERVER_API_URL is
      withCredentials: true
    });
    // Let's first check what VITE_SERVER_API_URL is
  } catch (e) {
    console.error(e);
  }
}
testFlow();
