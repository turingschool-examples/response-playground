const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.status(200).json({hello: 'world'});
});



app.listen(app.get('port'), () => {
  console.log(`Response Playground server running on http://localhost:${app.get('port')}`);
});
