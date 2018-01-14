const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mood';
//新增
const insertDocuments = function (db, table, data, callback) {
    switch (table) {
        case 'daily':
            var collection = db.collection('daily');
            collection.insertMany([
                {
                    healthScore: data.healthScore,
                    studyScore: data.studyScore,
                    relationshipScore: data.relationshipScore,
                    familyScore: data.familyScore,
                    societyScorce: data.societyScorce,
                    userId: data.userId,
                    datetime: new Date().toLocaleDateString()
                }
            ], function (err, result) {
                callback(result);
            });
            break;
        case 'user':
            var collection = db.collection('user');
            collection.insertMany([
                {
                    username: data.username,
                    password: data.password,
                    datetime: new Date().toLocaleDateString()
                }
            ], function (err, result) {
                callback(result);
            });
            break;
    }
}

//删除
const removeDocument = function (db, table, query, callback) {
    switch (table) {
        case 'daily':
            var collection = db.collection('daily');
            collection.deleteOne({ datetime: new Date().toLocaleDateString() }, function (err, result) {
                callback(result);
            });
            break;
        case 'user':
            var collection = db.collection('user');
            collection.deleteOne(query, function (err, result) {
                callback(result);
            });
            break;
    }
}

//修改
const updateDocument = function(db,table,query,newData, callback) {
    const collection = db.collection(table);
    collection.updateOne(query
      , { $set: newData }, function(err, result) {
      callback(result);
    });  
  }

//查询
const findDocuments = function (db, table, query, callback, user) {
    switch (table) {
        case 'daily':
            var collection = db.collection('daily');
            break;
        case 'user':
            var collection = db.collection('user');
            break;
    }
    collection.find(query).toArray(function (err, docs) {
        callback(docs);
    });
}

class IndexModel {
    getIndexInfo() {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve('这是首页信息。zz');
            }, 1000)
        });
    }
    submitTodayData(data) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                const db = client.db(dbName);
                removeDocument(db, 'daily', { userId: data.userId, datetime: new Date().toLocaleDateString() }, function () {
                    var result = insertDocuments(db,'daily', data, function (docs) {
                        client.close();
                        resolve(docs);
                    });
                });
            });
        });
    }
    submitTodayDescribe(data){
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                const db = client.db(dbName);
                var result = updateDocument(db,'daily', { userId: data.userId, datetime: new Date().toLocaleDateString() },data, function (docs) {
                    client.close();
                    resolve(docs);
                });
            });
        });
    }
    getAllData(userId) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                const db = client.db(dbName);
                var result = findDocuments(db, 'daily', { userId }, function (docs) {
                    client.close();
                    resolve(docs);
                });
            });
        });
    }
    getTodayData(userId) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                const db = client.db(dbName);
                var result = findDocuments(db, 'daily', { datetime: new Date().toLocaleDateString(), userId: userId }, function (docs) {
                    client.close();
                    resolve(docs);
                });
            });
        });
    }
    getAnydayData(userId,date){
        console.log('接受到的date：',date);
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                const db = client.db(dbName);
                var result = findDocuments(db, 'daily', { datetime: date, userId: userId }, function (docs) {
                    client.close();
                    resolve(docs);
                });
            });
        });
    }
    register(data) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                const db = client.db(dbName);
                findDocuments(db, 'user', data, function (docs) {
                    if (docs.length > 0) {
                        client.close();
                        resolve({ issuccess: false, message: '该账号已存在！' });
                    } else {
                        var result = insertDocuments(db,'user', data, function (docs) {
                            client.close();
                            resolve({ issuccess: true, message: '注册成功' });
                        }, 'user');
                    }
                });

            });
        });
    }
    login(data) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                const db = client.db(dbName);
                var result = findDocuments(db, 'user', data, function (docs) {
                    client.close();
                    console.log('login:', docs);
                    if (docs.length > 0) {
                        resolve({ message: true, id: docs[0]._id });
                    } else {
                        resolve({ message: false, id: '' });
                    }
                });
            });
        });
    }
}

export default IndexModel;