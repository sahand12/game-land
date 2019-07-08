import bodyParser from 'body-parser';

// Configure these middlewares
// 1. cookie parser
// 2. static content
// 3. error handling
// 4. authentication
// 5. logging
// 6. body parser
// 7. file upload parser
// 8. server monitoring
// 9. session handling
//

function addMiddleware(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}

export default addMiddleware;
