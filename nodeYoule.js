var http = require('http')
var fs = require('fs')
var path = require('path')
var hostPort = require('./js/hostPort')

var server = http.createServer(function(request, response) {
    var url = request.url
    if (url === '/') {
        fs.readFile(path.join(__dirname, 'template/base/baseTemplate.html'), 'utf8', function(err, base){
            if (err) {
                return response.end(err.message)
            }
            fs.readFile(path.join(__dirname, 'template/nav/officialNavTemplate.html'), 'utf8', function(err, nav){
                if (err) {
                    return response.end(err.message)
                }
                base = base.replace('<%导航条%>',nav)
                fs.readFile(path.join(__dirname, 'template/index/indexTemplate.html'), 'utf8', function(err, index){
                    if (err) {
                        return response.end(err.message)
                    }
                    base = base.replace('<%主内容%>',index)
                    response.writeHead(200, 'ok', {"content-Type": "text/html; charset=utf-8"})
                    response.end(base)
                })

            })
        })
    } else if (url === '/detail') {
        fs.readFile(path.join(__dirname, 'template/base/baseTemplate.html'), 'utf8', function(err, base){
            if (err) {
                return response.end(err.message)
            }
            fs.readFile(path.join(__dirname, 'template/nav/shopNavTemplate.html'), 'utf8', function(err, nav){
                if (err) {
                    return response.end(err.message)
                }
                base = base.replace('<%导航条%>',nav)
                fs.readFile(path.join(__dirname, 'template/detail/detailTemplate.html'), 'utf8', function(err, index){
                    if (err) {
                        return response.end(err.message)
                    }
                    base = base.replace('<%主内容%>',index)
                    response.writeHead(200, 'ok', {"content-Type": "text/html; charset=utf-8"})
                    response.end(base)
                })

            })
        })
    } else {
        var saftPath = path.join(__dirname, url)
        fs.readFile(saftPath, function(err, data){
            if (err) {
                return response.end(err.message)
            }
            response.end(data)
        })
    }
})
server.listen(hostPort.port, hostPort.host, function(){
    console.log(' server ' + hostPort.host + ':' + hostPort.port + ' ready')
})






