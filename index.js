var lock = require('level-lock');

module.exports = function (db, key, value, options, cb) {
    if (typeof options === 'function') {
        cb = options;
        options = null;
    }

    var unlock = lock(db, key, 'w');
    if (!unlock) {
        return nextErr(cb, 'LOCKED', 'key is write-locked');
    }

    db.get(key, options, function (err, res) {
        if (err && err.type !== 'NotFoundError') {
            unlock();
            return cb && cb(err);
        }
        if (res) {
            unlock();
            return cb && cb(error('EXISTS', 'key already exists'));
        }

        db.put(key, value, options, function (err) {
            unlock();
            if (cb) cb(err);
        });
    });
};

function error (code, msg) {
    var err = new Error(msg);
    err.code = err.type = code;
    return err;
}

function nextErr (cb, code, msg) {
    var err = error(code, msg);
    process.nextTick(function () { cb(err) });
}
