const express = require('express');
const routes = require('./src/routes');
const middlewares = require('./src/middlewares');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// routes
app.use('/user', routes.user);
app.use('/login', routes.login);
app.use('/categories', routes.category);

// middlewares
app.use(middlewares.error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
