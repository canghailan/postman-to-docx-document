var fs = require('fs');

var input = './a.json';
var output = './a.md';

var markdown = fs.createWriteStream(output);
markdown.once('open', function() {
    fs.readFile(input, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            markdown.end();
            return;
        }

        var collection = JSON.parse(data);
        var requests = {};
        collection.requests.forEach(function(request) {
            requests[request.id] = request;
        });

        // 文档
        markdown.write(`# ${collection.name}\n`);
        markdown.write(`${collection.description}\n\n\n`);

        // 模块
        collection.folders.forEach(function(folder) {
            markdown.write(`## ${folder.name}\n`);
            markdown.write(`${folder.description}\n\n\n`);

            // 接口
            folder.order.forEach(function(requestId) {
                var request = requests[requestId];

                markdown.write(`### ${request.name}\n`);
                markdown.write('```\n');
                markdown.write(`${request.method} ${request.url}\n`);
                markdown.write(`${request.headers}`);
                markdown.write('```\n');
                markdown.write(`${request.description}\n\n`);
            });
        });

        markdown.end();
    });
});