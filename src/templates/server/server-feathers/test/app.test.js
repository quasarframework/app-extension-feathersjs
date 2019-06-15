const assert = require('assert')
const rp = require('request-promise')
const url = require('url')
const app = require('../src/app')

const port = app.get('port') || 3030
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
})

describe('Feathers application tests', () => {
  before(function(done) {
    this.server = app.listen(port)
    this.server.once('listening', () => done())
  })

  after(function(done) {
    this.server.close(done)
  })

  it('starts and shows the index page', () => {
    return rp(getUrl()).then(body =>
      assert.ok(body.indexOf('<html>') !== -1)
    )
  })

  describe('404', function() {
    it('shows a 404 HTML page', () => {
      return rp({
        url: getUrl('path/to/nowhere'),
        headers: {
          'Accept': 'text/html'
        }
      }).catch(res => {
        assert.strict.equal(res.statusCode, 404)
        assert.ok(res.error.indexOf('<html>') !== -1)
      })
    })

    it('shows a 404 JSON error without stack trace', () => {
      return rp({
        url: getUrl('path/to/nowhere'),
        json: true
      }).catch(res => {
        assert.strict.equal(res.statusCode, 404)
        assert.strict.equal(res.error.code, 404)
        assert.strict.equal(res.error.message, 'Page not found')
        assert.strict.equal(res.error.name, 'NotFound')
      })
    })
  })
})
