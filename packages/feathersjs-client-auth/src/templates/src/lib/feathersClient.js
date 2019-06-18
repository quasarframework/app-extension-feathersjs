import feathers from "@feathersjs/feathers";
import auth from "@feathersjs/authentication-client";
import { CookieStorage } from "cookie-storage";
import restClient from "@feathersjs/rest-client";
import axios from "axios";

import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
let socketOptions = { transports: ["websocket"] };

// Production Config

let url = process.env.HOST_URL;

// In dev mode, use http://localhost:3000 as the URL.
// Tried to set this up with https using nginx.conf.
// Dev config Quasar HMR wants to use port from quasar.conf.js, even through it's served through a proxy on 443.  This is the compromise.

if (["localhost:3000"].includes(window.location.host)) {
  // See quasar.conf.js
  url = "http://localhost:3001";
  socketOptions.rejectUnauthorized = false;
}

const socket = io(url, socketOptions);
const rest = restClient(url);

const storage = new CookieStorage();
const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(rest.axios(axios)) // FIXME needed?
  .configure(auth({ storage })); // See ... for options

export default feathersClient;
