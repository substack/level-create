var test = require('tape');
var level = require('level-test')();
var db = level('users.db-' + Math.random(), { valueEncoding: 'json' });
var create = require('../');

test('no callback', function (t) {
    create(db, 'substack', { bio: 'beep boop' });
    create(db, 'xyz', { bio: 'beep boop' });
    t.end();
});
