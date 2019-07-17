const Controller = require('./Controller.class')

class chatController extends Controller {
    constructor() {
        super()
    }
    async index(ctx, next) {
        ctx.set('charset','utf-8')
        ctx.set('Content-Type','text/plain')
        var usocket = {},user = [];
        var chat = ctx.io.of('/chat')
            .on('connection', function (socket) {
               socket.on('send', data => {
                   socket.emit('message',data);      
                })
                setTimeout(()=>{
                    chat.emit('message', Buffer.from(JSON.stringify({
                        everyone: 'in'
                        , '/chat': 'will get'
                    })))
                },3000)
                socket.on('disconnect', function () {
                    ctx.io.emit('用户掉线');
                });
            });
    }
    
    static test(){
        console.info('aa')
    }
}
module.exports = chatController;