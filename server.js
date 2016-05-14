var express = require('express');
  var renderer = require('react-engine');
  var path = require('path');
  var app = express();

  // then create the view engine for our express app
  var reactRoutesFilePath = path.join(__dirname + '/public/routes.jsx');
  var engine = renderer.server.create({
    routes: require(reactRoutesFilePath),
    routesFilePath: reactRoutesFilePath
  });

  // then configure our express app with the view engine that we created
  // set the engine
  app.engine('.jsx', engine);
  // set the view directory
  app.set('views', path.join(__dirname, '/public/views'));
  // set jsx as the view engine
  app.set('view engine', 'jsx');
  // finally, set the custom view
  app.set('view', renderer.expressView);

  // next, lets configure the routes for the express app
  // expose public folder as static assets (JS/CSS)
  app.use(express.static(path.join(__dirname, '/public')));
  // add the our app routes
  // we open a free pass to all GET requests to our app and use react-engine to render them
  app.get('*', function(req, res) {
    res.render(req.url, {
      items: require('./items.json')
    });
  });

  // add the error handler middleware
  app.use(function(err, req, res, next) {
    console.error(err);

    // http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
      return next(err);
    }

    if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
      return res.redirect(302, err.redirectLocation);
    }
    else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
      return res.status(404).send('Route Not Found!');
    }
    else {
      // for ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR or
      // any other error we just send the error message back
      return res.status(500).send(err.message);
    }
  });

  // the last step in the server side is to configure the express app to listen on port 3000
  app.listen(3000, function() {
    console.log('Example app listening at http://localhost:%s', 3000);
  });
