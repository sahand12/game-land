import bodyParser from 'body-parser';

function addMiddleware(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}

export default addMiddleware;
