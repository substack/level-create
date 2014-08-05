var test = require('tape');
var level = require('level-test')();
var db = level('users.db-' + Math.random());
var create = require('../');

test('options', function (t) {
    t.plan(3);

    var options = { valueEncoding: 'json' };

    create(db, 'substack', { bio: 'beep boop' }, options, function (err) {
        t.ifError(err);
        db.get('substack', options, function (err, user) {
            t.ifError(err);
            t.equal(user.bio, 'beep boop');
        });
    });
});
