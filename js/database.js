/**
 * Created by cdchenjia on 2016/6/8.
 */
const mongodb = require('mongodb');
const server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
const db = new mongodb.Db('checker', server, {safe: true});

//连接db
// db.open(function (err, db) {
//     if (!err) {
//         console.log('connect db');
//         db.createCollection('mycoll', {safe: true}, function (err, collection) {
//             if (err) {
//                 // console.log(err);
//             } else {
//                 //新增数据
//                 // var tmp1 = {id: '2', title: 'hello2', number: 1};
//                 // collection.save(tmp1, {safe: true}, function (err, result) {
//                 //     console.log(result);
//                 //     db.close();
//                 // });
//                 // 更新数据
//                 collection.update({id: '1'}, {$set: {number: 3}}, {safe: true}, function (err, result) {
//                     console.log(result);
//                     db.close();
//                 });
//                 // 删除数据
//                 // collection.remove({title:'hello'},{safe:true},function(err,result){
//                 //                   console.log(result);
//                 //               });
//
//                 // console.log(collection);
//                 // 查询数据
//                 // var tmp1 = {title:'hello'};
//                 // var tmp2 = {title:'world'};
//                 // collection.insert([tmp1,tmp2],{safe:true},function(err,result){
//                 //     console.log(result);
//                 // });
//                 // collection.find().toArray(function(err,docs){
//                 //     console.log('find');
//                 //     console.log(docs);
//                 // });
//                 // collection.findOne(function(err,doc){
//                 //     console.log('findOne');
//                 //     console.log(doc);
//                 // });
//             }
//
//         });
//         // console.log('delete ...');
//         // //删除Collection
//         // db.dropCollection('mycoll',{safe:true},function(err,result){
//
//         //           if(err){
//
//         //         console.log('err:');
//         //         console.log(err);
//         //     }else{
//         //         console.log('ok:');
//         //         console.log(result);
//         //     }
//         //       });
//     } else {
//         // console.log(err);
//     }
// });

let mydb = function () {
};


/**
 * data: {
 *     "name": "body .class .class p img",
 *     "count": 1
 * }
 * @param data
 */
mydb.prototype.save = function (data) {
    db.open(function (err, db) {
        if (!err) {
            //新增数据
            let data = {
                "name": "",
                "count": 1
            };
            collection.save(tmp1, {safe: true}, function (err, result) {
                console.log(result);
                db.close();
            });
        } else {
            console.log(err);
        }
    });
};

mydb.prototype.update = function (data) {
    db.open(function (err, db) {
        if (!err) {
            //更新数据
            collection.update({name: data.name}, {$set: {count: data.count}}, {safe: true}, function (err, result) {
                console.log(result);
                db.close();
            });
        } else {
            console.log(err);
        }
    });
};

module.exports = mydb;