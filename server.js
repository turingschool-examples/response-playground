const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());

// Regular 200 response
app.get('/', (request, response) => {
  response.status(200).json({hello: 'world'});
});

// 201 response
app.post('/responses', (request, response) => {
  const { name } = request.body;

  if (name) {
    response.status(201).json({ name });
  } else {
    response.status(422).json({error: 'Missing a "name" in the request body'})
  }
});

// 204 response with no data in response body
app.delete('/responses/:id', (request, response) => {
  const { id } = request.params;

  response.sendStatus(204);
});

// 404 response (loop through fetch calls to see which give 404 responses)
app.get('/someNotFound/:id', (request, response) => {
  const { id } = request.params;

  if ([2, 43, 70, 99].includes(parseInt(id))) {
    response.status(404).json({error: `id:${id} is not found`});
  } else {
    response.status(200).json({hooray: `id:${id} found`});
  }
});

// 500-level response
app.get('/serverError', (request, response) => {
  response.status(500).json({error: 'Something bad happened with the server'})
});

app.listen(app.get('port'), () => {
  console.log(`Response Playground server running on http://localhost:${app.get('port')}`);
});
