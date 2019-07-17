const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const koaRouter=require('koa-router');
const pathStatic=require('koa-static');
const cors = require('koa2-cors'); //允许跨域的插件
const koaBody = require('koa-body')
const json=require('koa-json')
const router = koaRouter();
const io = require('socket.io')(server);
const chat=require('./server/routes/chat');
const functions=require('./server/functions/function.class');
app.use(json())
app.context.io=io;
app.use(koaBody({
    multipart: true,  // 允许上传多个文件
    formidable: {
        uploadDir: 'public/upload',// 上传的文件存储的路径
        keepExtensions: true,  //
        /*文件上传前的一些设置操作*/
        onFileBegin:(name,file) => {
            // 获取文件后缀
            const ext = functions.getUploadFileExt(file.name);
            // 最终要保存到的文件夹目录
            const dirName = functions.getUploadDirName();
            const dir = path.join(__dirname, `public/upload/${dirName}`);
            // 检查文件夹是否存在如果不存在则新建文件夹
            functions.checkDirExist(dir);
            // 获取文件名称
            const fileName = functions.getUploadFileName(file.name);
            // 重新覆盖 file.path 属性
            file.path = `${dir}/${fileName}`;
            app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
            app.context.uploadpath[name] = `${dirName}/${fileName}`;
        },

        /*错误处理*/
        onError:(err)=>{
            console.info(err,'aaa--')
        },

    },
}))


// io.on('connection', socket => {
//     console.info('用户连接了')
//     socket.on('send', function(msg){
//         console.info(msg)
//         io.to(socket.id).emit('message','surprise');
//     })
//     socket.on('disconnect', function () {
//         io.emit('用户掉线');
//     });
// })

app.use(cors({
    // origin:'http://192.168.0.106:8082',/*支持单域名的访问*/
    origin:function (ctx) {               /*支持任意域名的访问,也可以加白名单来比对ctx.request.headers.origin来判断是否需要让访问*/
        // console.info(ctx.request.headers.origin,'aaa')

        /*允许白名单访问,实例*/
        // var has=Config.whitelist.indexOf(ctx.request.headers.origin)
        // if(has<0){
        //     return false
        // }
        return ctx.request.headers.origin;
    },
    credentials:true
}))


/*指定pulic可以对外访问*/
app.use(pathStatic(__dirname + "/public"));


router.use('',chat.routes());

app.use(router.routes())
server.listen(3000);