/*
* Methonds@基类Model
* */
const Mysql = require('mysql');
const DB=require('../config/config')
class Model{
    constructor(db){
        this.db=DB;
    }
    async connectTest(){
       var connection=await Mysql.createConnection(this.db.dbinfo);
        await connection.connect(err=>{
            if (err) {
                console.error('error connecting: ' + err.stack);
                return ;
            }else{
                console.info('sucess mysql connect!!!')
            }
        });
        connection.on('error', function(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('db error执行重连:'+err.message);
                new Model().connectTest();
            } else {
                throw err;
            }
        });
        return connection
    }

    async querySql(sql){
        var res=await this.connectTest();
        return new Promise(function(resolve, reject){
            res.query(sql,(error, results, fields)=>{
                if (error) throw error;
                resolve(results);
            })
            /*执行完毕关闭连接*/
            res.end();
        })
    }
}

module.exports= Model;