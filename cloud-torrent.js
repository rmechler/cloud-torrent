var Client = require('node-torrent');
var client = new Client({logLevel: 'DEBUG'});
var torrentFile = 'a.torrent';
//var magnet = 'magnet:?xt=urn:btih:3842cd924a0a51142fa5a6520094fdc90df7c049&dn=Chuck+Klosterman+-+Sex%2C+Drugs%2C+and+Cocoa+Puffs%3A+A+Low+Culture+Ma&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337'
//var magnet = 'magnet:?xt=urn:btih:8e51615668c1d5a8a3e0c5dd7e245fe329cd2cf3&dn=Sex%2C+Drugs%2C+and+Cocoa+Puffs+%3A+A+Low+Culture+Manifesto+-+Chuck+Kl&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337';
//var magnet = 'magnet:?xt=urn:btih:3842cd924a0a51142fa5a6520094fdc90df7c049&dn=Chuck+Klosterman+-+Sex%2C+Drugs%2C+and+Cocoa+Puffs%3A+A+Low+Culture+Ma&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337';
var magnet = 'magnet:?xt=urn:btih:3c1cc4af717dd3c7655e7888ab8363e76edfead8&dn=The+Avett+Brothers+-+Another+Is+Waiting+%28Single%29+%282013%29+%5BAAC%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337';
//var magnet = 'magnet:?xt=urn:btih:5e1d6609b8774b7b9592fd161fb5651e74f71362&dn=Kanye+West+-+Yeezus&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337';
var torrentUrl = '';
var url = process.argv.length > 2 ? process.argv[2] : magnet;
var torrent = client.addTorrent(url);

process.setMaxListeners(1000);

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