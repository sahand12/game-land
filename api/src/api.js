import express from 'express';
import bodyParser from 'body-parser';
// import axios from 'axios';
import { createServer } from 'http';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/api/games/:gameName', (req, res) => {
//   return res.json({
//     name: req.params.gameName,
//     date: Date.now(),
//   });
// });
// app.post('/api/games/:gameName/create', async (req, res) => {
//   // 1. get a list of available games
//   // 2. verify the provided game exists
//   // 3. create a game instance.
//   try {
//     const { data: names } = await axios.get(`http://localhost:8000/games`);
//     if (!names.includes(req.params.gameName)) {
//       throw new Error('Invalid game name');
//     }
//
//     const { data: result } = await axios.post(
//       `http://localhost:8000/games/${req.params.gameName}/create`
//     );
//     return res.json(result);
//   } catch (err) {
//     return res.json({ message: err.message });
//   }
// });

app.use(routes);

const server = createServer(app);
server.listen(9000, () => {
  console.log(`server is running on: localhost:${server.address().port}`);
});
