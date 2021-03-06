var assert = require("assert");
var parser = require("../lib/orientdb/connection/parser");
var _ = require("lodash");

var orient = require("../lib/orientdb"),
    Db = orient.Db,
    Server = orient.Server;

var serverConfig = require("../config/test/serverConfig");
var dbConfig = require("../config/test/dbConfig");

var server = new Server(serverConfig);
var db = new Db("temp", server, dbConfig);

db.open(function(err, result) {

    assert(!err, "Error while opening the database: " + err);

    db.command("SELECT FROM OUser", function(err, results) {

        assert(!err, "Error while executing a SELECT command: " + err);

        assert.equal(results.length, 3, "Weren't there 3 users in this database?");

        for (var idx = 0, length = results.length; idx < length; idx++) {
            assert(_.isString(results[idx]["@rid"]));
        }

        console.log("Received results: " + JSON.stringify(results));

        db.close();
    });
});

