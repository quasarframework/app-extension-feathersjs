// This file is auto-magically imported into Quasar build system.

import Vue from "vue";
import Vuex from "vuex";
import feathersVuex from "feathers-vuex";
import feathersClient from "../lib/feathersClient";

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, {
  idField: "_id"
  nameStyle: 'short', // Determines the source of the module name. 'short' or 'path'
	enableEvents: true // Set to false to explicitly disable socket event handlers.
});

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default function(/*{ ssrContext }*/) {
  return new Vuex.Store({
    // enable strict mode (adds overhead!) - dev mode only
    strict: process.env.DEV,
    // The state accessable in pages and components
    state: {
      myStuff: false
    },
    mutations: {
      MUTATE_STUFF(state, newStuff) {
        state.myStuff = newStuff;
      },
    },
    actions: {
      getNewStuff: async function(context) {
        // FIXME demonstrate using FeathersVuex here.
        return Promise.resolve({
          return 'hello world'
        })
        .then(stuff => {
          context.commit("MUTATE_STUFF", stuff);
        });
      },
    },
    plugins: [
      service("api/stuff"),
      service("api/users"),
      // Setup the auth plugin.
      auth({ userService: "users" }) // the api/ is implied by nameStyle: 'short', above.  FIXME Verify
    ]
  });
}
