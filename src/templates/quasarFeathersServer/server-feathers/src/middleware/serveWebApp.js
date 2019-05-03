const path = require('path');
const request = require('request');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const express = require('@feathersjs/express');
const history = require('connect-history-api-fallback');

module.exports = function(app) {
  // CONFIGURE HEADERS FOR SECURITY

  // Helmet defaults:  https://helmetjs.github.io/docs/
  // Set CSP
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\''],
        fontSrc: ['\'self\'', 'data:'],
        imgSrc: ['\'self\'', 'data:']
      }
    }) // FIXME SECURITY look at helmet 'sandbox' for SVG's https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/sandbox
  );
  // Sets "X-DNS-Prefetch-Control: off".
  app.use(helmet.dnsPrefetchControl());
  // https://helmetjs.github.io/docs/expect-ct/ - not implemented yet
  // Sets Feature-Policy - https://helmetjs.github.io/docs/feature-policy/ - https://caniuse.com/#feat=feature-policy
  app.use(
    helmet.featurePolicy({
      features: {
        fullscreen: ['\'self\''],
        //vibrate: ['\'none\''],
        payment: ['\'none\''],
        syncXhr: ['\'none\'']
      }
    })
  );
  // Sets "Referrer-Policy: same-origin".
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  // Sets "X-Frame-Options: sameorigin".
  app.use(helmet.frameguard({ action: 'sameorigin' }));
  // Disable "X-Powered-By"
  app.disable('x-powered-by');
  // Enable HSTS and attempt to preload.
  app.use(
    helmet.hsts({
      // Must be at least 1 year to be approved
      maxAge: 31536000,
      // Must be enabled to be approved
      includeSubDomains: true,
      preload: true
    })
  );
  // Sets "X-Download-Options: noopen".  Ancient IE header.
  app.use(helmet.ieNoOpen());
  // Sets "X-Content-Type-Options: nosniff".
  app.use(helmet.noSniff());
  // Sets "X-Permitted-Cross-Domain-Policies: none" to disable Adobe crap - https://helmetjs.github.io/docs/crossdomain/
  app.use(helmet.permittedCrossDomainPolicies());
  // Sets "X-XSS-Protection: 1; mode=block".  Old IE browsers only - https://helmetjs.github.io/docs/xss-filter/
  app.use(helmet.xssFilter());

  // SERVE FILES FOR WEB APP

  let p = app.get('public');

  // Favicon compatability shim.
  app.use(favicon(path.join(p, 'statics', 'favicon.ico'), { maxAge: '1 day' }));

  // Use "history" mode to transform request to /index.html as needed for SPA
  app.use(history());

  // Set cache headers
  let cacheForever = { immutable: true, maxAge: '1 year' };
  let cacheShort = { maxAge: '1 day' };
  let cacheDebounce = { maxAge: '1 minute' };

  // These are immutable assets and cached forever
  app.use('/js', express.static(path.join(p, 'js'), cacheForever));
  app.use('/css', express.static(path.join(p, 'css'), cacheForever));
  app.use('/img', express.static(path.join(p, 'img'), cacheForever));
  app.use('/fonts', express.static(path.join(p, 'fonts'), cacheForever));

  // These are static assets and cached for 1 day.  Move to assets pipeline in FE.
  app.use('/statics', express.static(path.join(p, 'statics'), cacheShort));

  // Debounce requests for else in 'public' - which should only be index.html
  app.use('/', express.static(p, cacheDebounce));

  return app;
};
