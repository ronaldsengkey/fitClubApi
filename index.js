'use strict';

require('dotenv').config();
let fs = require('fs'),
  path = require('path'),
  // http = require('http'),
  morgan = require('morgan'),
  cluster = require('cluster'),
  numCPUs = require('os').cpus().length;

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.APP_PORT;

const fastify = require('fastify')({
  logger: {
    prettyPrint: true
  }
})

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  models: path.join(__dirname, './models'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  fastify.use(middleware.swaggerMetadata());


  // Validate Swagger requests
  fastify.use(middleware.swaggerValidator());


  // Route validated requests to appropriate controller
  fastify.use(middleware.swaggerRouter(options));

  fastify.use(middleware.swaggerSecurity({
    api_key: function (req, def, scopes, callback) {
      // API KEY LOGIC HERE
      // IF SUCCESSFUL
      callback();
    }
  }));



  // Serve the Swagger documents and Swagger UI
  fastify.use(middleware.swaggerUi());

  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
  })

  fastify.use(morgan('combined', {
    stream: accessLogStream
  }));

  // fastify.use(morgan('dev'));


  if (cluster.isMaster) {

    console.log(`Master ${process.pid} is running`);
    console.log('master cluster setting up ' + numCPUs + ' workers')

    // Fork workers.
    for (let i = 0; i < 1; i++) {
      cluster.fork();
    }


    cluster.on('online', function (worker, code, signal) {
      // console.log('Worker ' + worker.process.pid + ' is online');
    })

    //Check if work is died
    cluster.on('exit', (worker, code, signal) => {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
    });

  } else {
    let worker = cluster.worker.id;
    // Start the server
    const start = async () => {
      try {
        await fastify.listen(serverPort, '0.0.0.0');
        fastify.log.info();
      } catch (err) {
        console.log(err)
        fastify.log.error(err)
        process.exit(1)
      }
    }
    start()
  }

});