var level = require('level');
var db = level('/tmp/users.db', { valueEncoding: 'json' });
var insert = require('../');

var key = 'users!' + process.argv[2];
var value = { bio: process.argv[3] };

insert(db, key, value, function (err) {
    if (err) {
        console.error(err);
        process.exit(1)
    }
});
