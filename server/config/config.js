/*其他配置信息*/
var config={

    /*appkey*/
    appkeys:'koa:sess',

    /*jwt配置*/
    jwtconfig:{
        secret:'jwtSecret',
        info:{
            'warning':'Protected resource, use Authorization header to get access'
        },
        /*忽略jwt验证*/
        unlessrouter:[/^\/api\/todolist/,/^\/api\/checkcode/,/^\/api\/login/,/^\/api\/uploadImg/]
    },

    /*session配置*/
    sessionconfig:{
        key: 'koa:sess',   //cookie key (default is koa:sess)
        maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
        overwrite: true,  //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true,   //签名默认true
        rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false,  //(boolean) renew session when session is nearly expired,
    },

    /*数据库配置*/
    dbinfo:{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'node_cms',
        port:'3306'
    },
    prefix:'b_',/*数据库前缀*/

    tokenExpiresIn:'24h',/*token过期时间,默认24小时*/

    /*接口报错信息*/
    apiwarning:'接口发生错误,请联系管理员...',


    /*允许访问白名单*/
    whitelist:[
        'http://192.168.0.106:8081',
        'http://192.168.0.106:8082',
        'http://192.168.0.106:8083'
    ],

    /*上传文件配置*/
    staticPath:'upload/'
}

module.exports=config