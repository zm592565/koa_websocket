/*
* name@公共方法
* class
* */
const MD5 = require('js-md5');
const path = require('path');
const fs = require('fs');
const config=require('../config/config')
const Controller=require('../controller/Controller.class')

const Functions={

    /*密码构造
    * params@明文密码   是由随机字符串+名字密码 加密而成
    * */
     getPassword:(value)=>{
        return MD5(value)
     },

    /*生成随机字符串*/
     randomChar:(len)=>{
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
     },

    /*格式化时间*/
    formatterTime(timeobj=new Date(),type=1){
        var year=timeobj.getFullYear();
        var month=timeobj.getMonth()+1;
        var day=timeobj.getDate();
        var hour=timeobj.getHours();
        var min=timeobj.getMinutes();
        var sec=timeobj.getSeconds();
        var back='';
        switch (type){
            case 1:
                back=`${year}-${month}-${day} ${hour}:${min}:${sec}`;
                break;
            case 2:
                back=year+''+month+''+day;
                break;

        }
        return back;

    },

    backInfo(code=200,type=true,data=null,updatatoken=false){
        var back={
            state:type
        };

        if (type) {
            back = Object.assign(back,{code},{data:data})
        }else{
            back = Object.assign(back,{code},{data:data})
        }
        return back;
    },


    /*格式化栏目数据*/
     formatterCategoryData:async (data)=>{

             // 删除 所有 children,以防止多次调用
             data.forEach(function (item) {
                 delete item.children;
             });

             // 将数据存储为 以 id 为 KEY 的 map 索引数据列
             var map = {};
             data.forEach(function (item) {
                 map[item.id] = Object.assign(item,{title:item.name,label:item.name,value:item.id});
             });

             var val = [];
             data.forEach(function (item) {
                 // 以当前遍历项，parent,去map对象中找到索引的id
                 var parent = map[item.parent];
                 // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
                 if (parent) {
                     (parent.children || ( parent.children = [] )).push(item);
                 } else {
                     //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                     item=Object.assign(item,{expand: true})
                     val.push(item);
                 }
             });
             return val;

    },


    /*获取文件名后缀*/
    getUploadFileExt(name) {
        let ext = name.split('.');
        return ext[ext.length - 1];
    },


    /*生成文件夹名称*/
     getUploadDirName(){
        const date = new Date();
        let month = Number.parseInt(date.getMonth()) + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        const dir = `${date.getFullYear()}${month}${date.getDate()}`;
        return dir;
    },

    /*检查文件路径是否存在*/
     checkDirExist(p) {
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
     },

    /*获取上传文件名*/
    getUploadFileName(name){
        const date = new Date();
        var filename=date.getTime()+'_'+name;
        return filename;
    }






}

module.exports= Functions;