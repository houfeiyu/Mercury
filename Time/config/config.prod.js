// 外部配置，返回一个对象

var config = {
    appPath: (function() {
        var pathname = window.location.pathname
        pathname = pathname.replace(/(\/([a-zA-Z]+.html)?)$/gi, '')
        return pathname
    })(),
    wsPath: (function() {
        var pathname = window.location.pathname
        pathname = pathname.replace(/(\/([a-zA-Z]+.html)?)$/gi, '')
        return pathname
    })(),
    proxyUrl: 'proxyHandler?url='
}

return config
