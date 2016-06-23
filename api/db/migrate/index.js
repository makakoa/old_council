'use strict';

var _ = require('lodash'),
    argv = require('yargs').argv,
    fs = require('fs'),
    Promise = require('bluebird');

var db = require('../../db')({
  url: 'postgres://flybox:1234@localhost:5432/flybox',
  poolSize: 10,
  enableStore: true,
  debug: true
});

var migrator = require('dbeasy/migrator')(db);

function getMigrationFiles(dir) {
  return _.map(_.sortBy(fs.readdirSync(dir)), function(filename) {
    return dir + '/' + filename;
  });
}

function loadMigrations(migrator, dir) {
  var migrations = getMigrationFiles(dir);
  return Promise.each(migrations, function(migrationPath) {
    return migrator.loadMigration(migrationPath);
  });
}

var commands = {
  run: function() {
    console.log('Running migrations');
    return loadMigrations(migrator, __dirname + '/migrations')
      .then(function() {
        return migrator.up('migration');
      })
      .catch(function(err) {
        console.log(err.stack);
        console.log('');
        console.log('Migration error');
        return 1;
      });
  },

  new: function(argv) {
    console.log('Creating migration');
    var name = argv._[1];
    if (!name) {
      console.error('Migration name required');
      process.exit(1);
    }

    return migrator.createMigration(name, __dirname + '/migrations')
      .then(function(path) {
        console.log('Created:', path);
      });
  }
};

Promise.resolve(commands[argv._[0] || 'run'](argv))
  .finally(function() {
    db.close();
  })
  .done(function(statusCode) {
    if (statusCode) process.exit(statusCode);
  });
