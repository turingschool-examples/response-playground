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
  const { name } = response.body;

  if (name) {
    response.status(201).json({ name });
  } else {
    response.status(422).json({error: 'Missing a "name" in the request body'})
  }
});

// 204 response with no data in response body
app.delete('/responses/:id', (request, response) => {
  const { id } = response.params;

  if (id) {
    response.sendStatus(204);
  } else {
    response.status(422).json({error: 'Missing an "id" in the request parameter'})
  }
});

// 404 response (loop through fetch calls to see which give 404 responses)
app.get('/someNotFound/:id', (request, response) => {
  const { id } = response.params;

  if ([2, 43, 70, 99].includes(id)) {
    response.status(400).json({error: `id:${id} is not found`});
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
