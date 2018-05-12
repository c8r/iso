const path = require('path')
const { Application } = require('spectron')
const electron = require('electron')

let app

describe('application', () => {
  jest.setTimeout(10000)
  beforeEach(async done => {
    expect.assertions(1)
    app = new Application({
      path: electron,
      args: [
        path.join(__dirname, '..')
      ]
    })
    await app.start()
    expect(app)
    done()
  })

  afterEach(async done => {
    await app.stop()
    done()
  })

  test('opens windows', async done => {
    const count = await app.client.getWindowCount()
    // unsure about splash count
    expect(count).toBe(1)
    done()
  })
})
