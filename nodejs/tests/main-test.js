var buster = require("buster");
var assert = buster.referee.assert;

require('when/monitor/console');
var when = require("when");
var plantlab = require('vineyard-plantlab');
var lab = new plantlab('config/server.json', ['fortress', 'lawn']);
var ground = lab.ground;
var Fixture = require('../Fixture.js');
var fixture = new Fixture.Fixture(lab);
var pipeline = require('when/pipeline');

var Lawn = require('vineyard-lawn');
var Irrigation = Lawn.Irrigation;

lab.test("Main Sync", {
  setUp: function () {
    this.timeout = 10000;
    return fixture.php('reset')
      .then(function () {
        return fixture.prepare_database()
      })
      .then(function () {
        return fixture.populate()
      })
      .then(function () {
        return lab.start();
      });
  },
  tearDown: function () {
    return lab.stop();
  },
  "sync": function () {
    var query = {
          "trellis": "character"
    }
    return pipeline([
      function () {
        return fixture.php('populate')
      },
      function () {
        return Irrigation.query(query, fixture.users['cj'], ground, lab.vineyard)
      },
      function (response) {
        console.log('response', response)
        var objects = response.objects

        assert.equals(objects.length, 1)
        assert.equals(objects[0].name, 'Desa')
      },
      function () {
        return fixture.php('modify')
      },
      function () {
        return Irrigation.query(query, fixture.users['cj'], ground, lab.vineyard)
      },
      function (response) {
        console.log('response', response)
        var objects = response.objects

        assert.equals(objects.length, 1)
        assert.equals(objects[0].name, 'Desa 2')
      },
      function () {
        return fixture.php('deletion')
      },
      function () {
        return Irrigation.query(query, fixture.users['cj'], ground, lab.vineyard)
      },
      function (response) {
        console.log('response', response)
        var objects = response.objects

        assert.equals(objects.length, 0)
      }
    ]);
  }
});
