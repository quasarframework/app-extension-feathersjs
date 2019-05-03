const ipRangeCheck = require('ip-range-check');

// https://devcenter.heroku.com/articles/http-routing#heroku-headers

module.exports = function(app) {
  // Should we trust x-forwarded-for headers?
  if (app.get('trustProxy')) app.enable('trust proxy');

  // Whitelist IP's
  app.use(function(req, res, next) {
    let ips = req.ips || [];
    ips.push(req.ip);
    for (let x = 0; x < ips.length; x++) {
      // Is on white list?
      if (ipRangeCheck(ips[x], app.get('whitelistIps'))) return next();
    }
    // No IPS on white list
    res.redirect(307, app.get('redirect'));
  });

  return app;
};
