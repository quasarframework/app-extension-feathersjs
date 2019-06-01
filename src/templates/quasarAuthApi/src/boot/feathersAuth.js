/*
  Context: 

  For 3rd-party API's, we us /src/boot/axios.js

  For our own API's, we use FeathersClient (socket.io & REST)
  https://docs.feathersjs.com/guides/basics/clients.html
  https://docs.feathersjs.com/api/authentication/client.html#appconfigureauthoptions

  Our FeathersClient is in `/src/lib/feathersClient.js`
  and imported into `/src/store/index.js`
  which is imported by Quasar's build system.  /src/quasar.conf.js setting(?)

  Feathers-vuex integrates Vuex with FeathersClient:
  https://feathers-vuex.feathers-plus.com/auth-module.html

  Feathers-Vuex proxies it's authentication/logout actions to FeathersClient
  https://github.com/feathers-plus/feathers-vuex/blob/master/src/auth-module/actions.js

  The parameters for these actions are here:
  https://docs.feathersjs.com/api/authentication/client.html#appauthenticateoptions

  In addition to this module, you can use FeathersVuex state in UI from here:
  https://feathers-vuex.feathers-plus.com/auth-module.html


  This module:

  Create a Feathers Auth integration for Vue as a Quasar Boot Module. 

  // Use case: test if user is authenticated
  
    if (Vue.$auth.currentUser()) { ... }

  // Use case: get current user's email
  
    name = Vue.$auth.currentUser("email") || "anonymous"

  // Use case: Login
  
    Vue.$auth.login({
      strategy: 'local',
      email: 'my@email.com',
      password: 'my-password'
    });

  // Use case: Logout
  
    // logs out and sends message
    let p = Vue.$auth.logout();
    // After logout, go home
    p.then(() => {
      // User data still in browser
      router.push({ name: "home"});
      // To clear user data, do a hard refresh/redirect - https://feathers-vuex.feathers-plus.com/common-patterns.html#clearing-data-upon-user-logout
      location && location.reload(true)
    }); 

 */

export default ({ app, router, store, Vue }) => {
  // Create the API demonstrated above
  const auth = {
    currentUser(prop) {
      let u = store.state.auth.user || false;
      if (u && prop) return u[prop];
      return u;
    },
    login(authData, quiet) {
      return store
        .dispatch("auth/authenticate", authData)
        .then(() => {
          Vue.prototype.$q.notify({
            message: "Right on, let's do this!",
            type: "info"
          });
        })
        .catch(err => {
          if (!quiet) {
            console.log(err);
            Vue.prototype.$q.notify({
              message: "There was a problem logging you in.",
              type: "error"
            });
          }
        });
    },
    logout(quiet) {
      return store.dispatch("auth/logout").then(() => {
        if (!quiet)
          Vue.prototype.$q.notify({
            message: "You've been logged out.",
            type: "info"
          });
      });
    },
    register(authData) {
      // FIXME why is this empty?
    }
  };

  // Auth from JWT stored in browser before loading the app.  true => suppress token not found error
  auth.login("jwt", true);

  // Add API to Vue
  Vue.prototype.$auth = auth;

  // If you would like to play with it in the console, uncomment this line:
  // console.log(auth);

  // Then, in the console:
  /*
    temp1.login({
      strategy: "local",
      email: "feathers@example.com", 
      password: "secret" 
    })
  */

  // If you haven't created this user, see here:
  // https://docs.feathersjs.com/guides/chat/authentication.html
  // For this REST api endpoint
  /*
    curl 'http://localhost:3001/users/' -H 'Content-Type: application/json' --data-binary '{ "email": "feathers@example.com", "password": "secret" }'
  */
};
