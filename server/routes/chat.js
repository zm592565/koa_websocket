// 这是chat模块的路由配置文件
const koaRouter=require('koa-router')
const router = koaRouter()
const chatcontroller=require('../controller/chatController.class');

router.get('/chat',new chatcontroller().index)


module.exports=router