# level-insert-unique

insert a key if and only if it doesn't already exist

# example

``` js
var level = require('level');
var db = level('/tmp/users.db', { valueEncoding: 'json' });
var insert = require('level-insert-unique');

var key = 'users!' + process.argv[2];
var value = { bio: process.argv[3] };

insert(db, key, value, function (err) {
    if (err) {
        console.error(err);
        process.exit(1)
    }
});
```

The first time this file is run with a username, it succeeds. The second time,
the program fails because the username already exists.

```
$ node example/useradd.js substack
$ node example/useradd.js substack
{ [Error: key already exists] code: 'EXISTS' }
```

If multiple requests try to create a key at the same time, the first key
[obtains a lock](https://npmjs.org/package/level-lock)
that prevents other updates from succeeding.

# methods

``` js
var insert = require('level-insert-unique')
```

## insert(db, key, value, cb)

Put `value` at `key` into the leveldb `db` if and only if the key doesn't
already exist in the database.

`cb(err)` fires with an `err.code` of `'EXISTS'` when the requested key already
exists and an `err.code` of `'LOCKED'` when the key has been write-locked by
another simultaneous request.

`cb(err)` will also forward errors from the underlying `db.put()`

The keyEncoding of `db` is respected for the provided `key`, which is
automatically encoded into the right format for setting locks.

# install

With [npm](https://npmjs.org) do:

```
npm install level-insert-unique
```

# license

MIT
