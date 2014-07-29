var test = require('tape');
var level = require('level-test')();
var db = level('users.db-' + Math.random(), { valueEncoding: 'json' });
var create = require('../');

test('useradd locked', function (t) {
    t.plan(2);
    
    create(db, 'substack', { bio: 'beep boop' }, function (err) {
        t.ifError(err);
    });
    
    create(db, 'substack', { bio: 'wot' }, function (err) {
        t.equal(err.code, 'LOCKED');
    });
});

test('useradd exists', function (t) {
    t.plan(1);
    
    create(db, 'substack', { bio: 'eek' }, function (err) {
        t.equal(err.code, 'EXISTS');
    });
});
