const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, genre: "horror" },
  { id: 2, genre: "drama" },
  { id: 3, genre: "action" },
  { id: 4, genre: "comedy" },
  { id: 5, genre: "documentary" },
  { id: 6, genre: "sports" }
]

app.get('/', (req, res) => {
  res.send('Hello world! This is VIDLY!');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`<img src="https://http.cat/404" alt="404 - Not found" />`);
  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`${error.details[0].message}<br><img src="https://http.cat/400" alt="400 - Bad request error" />`);
  const genre = {
    id: genres.length + 1,
    genre: req.body.genre
  };
  genres.push(genre);
  res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`<img src="https://http.cat/404" alt="404 - Not found" />`);

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`${error.details[0].message}<br><img src="https://http.cat/400" alt="400 - Bad request error" />`);

  genre.genre = req.body.genre;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`<img src="https://http.cat/404" alt="404 - Not found" />`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

const validateGenre = genre => {
  const schema = {
    genre: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));