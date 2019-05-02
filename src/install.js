/**
 * Quasar App Extension install script
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

/**
 * @param {function} api
 */
module.exports = function (api) {
	api.render('./templates/base')
	/* istanbul ignore if */
	if (api.prompts.options === 'server') {
		api.render('./templates/server')
	}
}
