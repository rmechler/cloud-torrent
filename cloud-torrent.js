var Client = require('node-torrent');
var client = new Client({logLevel: 'DEBUG'});
var url = process.argv.length > 2 ? process.argv[2] : 'a.torrent';
var torrent = client.addTorrent(url);

// when the torrent completes, move it's files to another area
torrent.on('complete', function() {
    console.log('complete!');
    torrent.files.forEach(function(file) {
        var newPath = '/tmp/' + file.path;
        fs.rename(file.path, newPath);
        // while still seeding need to make sure file.path points to the right place
        file.path = newPath;
    });
});