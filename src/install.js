/**
 * Quasar App Extension install script
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

/**
 * @param {function} api
 */
module.exports = function (api) {
  if (api.prompts.options.includes('frontend')) {
    api.render('./templates/base')
  }
  /* istanbul ignore if */
  if (api.prompts.options.includes('server')) {
    api.render('./templates/server')
  }

  api.onExitLog("Update your quasar.conf.js to include boot files for this extension.")
}
