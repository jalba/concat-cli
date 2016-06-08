var concat = require('concat');
var chalk = require('chalk');
var glob = require('glob');
var async = require('async');

function getFileExtension(file) {
    return file.substr((~-file.lastIndexOf(".") >>> 0) + 2);
}

function errorHandler(error) {
    if (error) {
        throw new Error(error);
    }
}

function getDestination(output, files) {
    if (!Array.isArray(files)) errorHandler('Files should be an Array');
    return (output === 'all') ? output + '.' + getFileExtension(files[0]) : output;
}

function concatFiles(files, output) {
    var destination = getDestination(output, files);

    globFiles(files, function (globFiles) {
        concat(globFiles, destination, function (concatError) {
            errorHandler(concatError);
            console.log(chalk.green('Files concatenated!'));
        });
    });
}

function globFiles(files, next) {
    var tasks = files.map(function (file) {
        return function (callback) {
            glob(file, {realpath: true}, callback);
        }
    });
    async.parallel(tasks, function (error, files) {
        errorHandler(error);
        next([].concat.apply(files[0], files.splice(1)));
    });
}

module.exports = {
    concatFiles: concatFiles,
    getDestination: getDestination,
    errorHandler: errorHandler,
    getFileExtension: getFileExtension,
    globFiles: globFiles
};