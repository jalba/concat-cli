var concatFunctions = require('./../concatFunctions');

var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var path = require('path');

describe('The concatFunctions module', function() {
	beforeEach(function() {
        sinon.spy(console, 'log');
    });
    afterEach(function() {
        console.log.restore();
    });

    it('should expose an getDestination method that returns the output file string', function() {
    	var dest = 'bundle.js';
    	var files = ['*.js'];
        expect(concatFunctions.getDestination('all', files)).to.equal('all.js');
        expect(concatFunctions.getDestination(dest, files)).to.equal(dest);
        expect(function() { concatFunctions.getDestination('all', '') }).to.throw(Error);
    });
    it('should return list of files', function (done) {
        var filesMask = ['test/files/*.css']; // process.cwd() now is root of concat-cli directory.
        var filesCSS = [path.join(__dirname, '/files/a.css'), path.join(__dirname, '/files/b.css'), path.join(__dirname, '/files/c.css')];
        concatFunctions.globFiles(filesMask, function (files) {
            expect(files.toString()).to.equal(filesCSS.toString());
            done();
        });
    });
    it('should expose an concatFiles method that concatenates the files passed to it', function(done) {
    	var dest = 'bundle.js';
        var filesCSS = ['test/files/*.css']; // process.cwd() now is root of concat-cli directory.
    	var destCSS = path.join(__dirname, '/dest/bundle.css');

        if (fs.existsSync(destCSS)) {
            fs.unlinkSync(destCSS);
        }
    	concatFunctions.concatFiles(filesCSS, destCSS);
    	setTimeout(function() {
    		var calledArgs = console.log.getCall(0).args[0];
    	    var condition = calledArgs.indexOf('Files concatenated!') > -1;
            expect(function() { concatFunctions.concatFiles('', 'all') }).to.throw(Error);
            expect(condition).to.equal(true);
            done();
    	}, 400);
    });
});