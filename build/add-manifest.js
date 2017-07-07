console.log('Adding appcache manifest to index.html');
const someFile = 'dist/index.html'
var fs = require('fs')
fs.readFile(someFile, 'utf8', function (err, data) {
    if (err) { return console.log(err); }

    var result = data.replace(/<html[^>]*>/g, '<html manifest="cache.manifest">');

    fs.writeFile(someFile, result, 'utf8', function (err) {
        if (err) return console.log(err);
        console.log('Appcache manifest complete');
    });
});