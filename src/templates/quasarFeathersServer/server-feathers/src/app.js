const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");

const logger = require("./logger");
const middleware = require("./middleware");
const services = require("./services");
const appHooks = require("./app.hooks");
const channels = require("./channels");
const authentication = require("./authentication");
const whitelist = require("./middleware/whitelist.js");
const serveWebApp = require("./middleware/serveWebApp.js");

// Ok, let's do this
const app = express(feathers());

// Load app configuration
app.configure(configuration());

// WE ARE A PRIVATE SERVER AND ONLY TALK TO FRIENDS

app.configure(whitelist);

// WE ARE NOW A FEATHERS API SERVER

// General header security and caching.  Overwritten by serveWebApp.js
app.use(helmet());
app.use(cors({ origin: true })); // This is an elaborate way to not set the header, which is the correct setting.
// Parse request body
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.use("/api", helmet.noCache());
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);
// Application hooks
app.hooks(appHooks);

// WE ARE A WEB APPLICATION SERVER FOR A CDN

app.configure(serveWebApp);

// WE DONT KNOW WHAT YOU WANT OR SOMETHING IS WRONG.

app.use(express.notFound());
app.use(express.errorHandler({ logger }));

module.exports = app;
