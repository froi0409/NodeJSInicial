let http = require('http');
let fs = require('fs');

http.createServer(function(request, response) {
    if(request.url.indexOf('favicon.ico') > 0) {
        return;
    }

    if(request.url == '/web/index') {
        fs.readFile('./web/index.html', function(error, html) {
            let html_string = html.toString();
            let variables = html_string.match(/[^\{\}]+(?=\})/g);
            let texto = 'HOLA MUNDO DESDE NODEJS : 201830121';

            for(let i = variables.length - 1; i >=0 ; i--){
                let value = eval(variables[i]);
                html_string = html_string.replace("{"+variables[i]+"}",value);
            };

            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(html_string);
            response.end();

        });
    } else {
        fs.readFile('./web/404.html', function(error, html) {
            response.write(html);
            response.end();
        })
    }

}).listen(4000);