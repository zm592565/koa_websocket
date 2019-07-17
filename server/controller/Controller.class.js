/* 逻辑基类 */
"use strict";
const Koa = require('koa');
const app = new Koa();
const config=require('../config/config')
class Controller{
    constructor(){
        this.test();
    }
    async test(ctx,next){
        // console.info('adddadd---')
        return '----';
    }
}
module.exports=Controller;