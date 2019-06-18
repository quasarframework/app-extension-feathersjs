/**
 * Quasar App Extension prompts script
 *
 * Inquirer prompts
 * (answers are available as "api.prompts" in the other scripts)
 * https://www.npmjs.com/package/inquirer#question
 *
 */

module.exports = function() {
  return [
    {
      name: 'targets',
      type: 'checkbox',
      required: false,
      message: 'Please choose which targets to install:',
      choices: [
        {
          name: 'Feathers Auth Server',
          value: 'feathersjs-server-auth'
        },
        {
          name: 'Feathers Client Auth',
          value: 'feathersjs-client-auth'
        }
      ]
    }
  ]
}
