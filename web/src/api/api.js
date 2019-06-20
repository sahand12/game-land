import axios from 'axios';

const api = {
  baseUrl: 'http://localhost:9000/',
  /**
   *
   * @param {string} gameName - The name of the game to create/join
   */
  createGame(gameName, userID) {
    const url = `${api.baseUrl}/games/${gameName}/create`;
    axios.post(url).then(data => )
  }
};

export default api;
