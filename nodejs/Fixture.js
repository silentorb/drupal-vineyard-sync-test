var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }

  __.prototype = b.prototype;
  d.prototype = new __();
};

require('when/monitor/console');
var PlantLab = require('vineyard-plantlab');
var when = require('when');
var pipeline = require('when/pipeline');

var Fixture = (function (_super) {
  __extends(Fixture, _super);
  function Fixture() {
    _super.apply(this, arguments);
    this.users = {};
  }

  Fixture.prototype.populate = function () {
    var _this = this;
    var users = [
      {
        id: 2,
        name: 'anonymous',
        password: ''
      },
      {
        id: 7,
        name: 'cj',
        password: 'pass'
      },
      {
        id: 9,
        name: 'froggy',
        password: 'pass'
      },
      {
        id: 12,
        name: 'hero',
        password: 'pass'
      }
    ];

    this.users = {};
    for (var i in users) {
      var user = users[i];
      user['username'] = user.name;
      this.users[user.name] = user;
    }

    var inserts = users.map(function (user) {
      return _this.insert_object('user', user);
    });

    var admin = {
      id: 1,
      name: 'admin'
    };

    var member = {
      id: 2,
      name: 'member'
    };

    inserts.push(this.insert_object('role', { id: 1, name: "admin" }));
    inserts.push(this.add_role('cj', admin));

    inserts.push(this.insert_object('role', { id: 2, name: "member" }));
    inserts.push(this.add_role('froggy', member));
    inserts.push(this.add_role('hero', member));
    inserts.push(this.ground.db.query("INSERT INTO user_follows (follower, followee) VALUES (9, 7)"));

    return when.all(inserts);
  };

  Fixture.prototype.add_role = function (user_name, role) {
    var user = this.users[user_name];
    user.roles = user.roles || [];
    user.roles.push(role);
    return this.ground.db.query("INSERT INTO roles_users (role, user) VALUES (?, ?)", [role.id, user.id]);
  };

  Fixture.prototype.php = function (actions) {
    if (typeof actions !== 'string')
      actions = actions.join('+')

    var exec = require('child_process').exec
    var def = when.defer()
    exec('php api.php ' + actions, {
        cwd: '../'
      },
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
          def.reject(error)
        }
        else {
          def.resolve(error)
        }
      })

    return def.promise
  };

  return Fixture;
})(PlantLab.Fixture);
exports.Fixture = Fixture;
