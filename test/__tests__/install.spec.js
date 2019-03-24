const install = require('../../src/install.js')

test('exports properly', () => {
	let api = {
		render: () => { return true },
		prompts: {
			options: ['server']
		}
	}
	install(api)
	// stubbed the api.render function
	// expect(install(api)).toBe(true)
})
