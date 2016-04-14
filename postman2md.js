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

        var dump = JSON.parse(data);
        var requests = {};
        dump.requests.forEach(function(request) {
            requests[request.id] = request;
        });

        // 文档
        markdown.write(`# ${dump.name}\n`);
        markdown.write(`${dump.description}\n\n\n`);

        // 模块
        dump.folders.forEach(function(folder, folderIndex) {
            markdown.write(`## ${folderIndex + 1}、 ${folder.name}\n`);
            markdown.write(`${folder.description}\n\n\n`);

            // 接口
            folder.order.forEach(function(requestId, requestIndex) {
                var request = requests[requestId];

                markdown.write(`### ${folderIndex + 1}.${requestIndex + 1}、 ${request.name}\n`);
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
