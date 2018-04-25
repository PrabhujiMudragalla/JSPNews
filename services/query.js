const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const Q = require('q');

exports.create = (collection, body, unique_fields) => {

    let deferred = Q.defer();

    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            if (!unique_fields) {

                db.collection(collection).save(body, (err, success) => {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(success);
                    }
                    client.close();
                })


            }
            else {

                db.collection(collection).createIndex(unique_fields, { unique: true }, (error, uniq_success) => {
                    if (error) {
                        deferred.reject(error);
                    } else {
                        db.collection(collection).save(body, (err, success) => {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(success);
                            }
                            client.close();
                        })
                    }
                })

            }

        }

    })
    return deferred.promise;

}

exports.findByFilter = (collection, query, limitedFileds, page, limit) => {
    var deferred = Q.defer();
    page = parseInt(page);
    limit = parseInt(limit);

    MongoClient.connect('mongodb://localhost', (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);

            db.collection(collection).find(query, limitedFileds).skip((page - 1) * limit).limit(limit).sort({ _id: -1 }).toArray(
                (err, success) => {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(success);
                    }
                    client.close();
                })
        }
        //client.close();

    })

    return deferred.promise;

}
exports.count = (collection, query) => {
    var deferred = Q.defer();
    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            db.collection(collection).count(query,
                (err, success) => {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        // console.log(success)
                        deferred.resolve(success);
                    }
                    client.close();
                })
        }

        //client.close();
    })

    return deferred.promise;

}
exports.findById = (collection, id, limitedFileds) => {
    var deferred = Q.defer();
    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            db.collection(collection).find({
                _id: ObjectId(id),
                limitedFileds
            }).toArray(
                (err, success) => {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        // console.log(success)
                        deferred.resolve(success);
                    }
                    client.close();
                })
        }
        //client.close();

    })

    return deferred.promise;

}
exports.findOneAndUpdate = (collection, body) => {
    var deferred = Q.defer();
    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            var id =body._id;
            delete body._id;
            console.log({ _id:  ObjectId(id)});
            db.collection(collection).updateOne({ _id: ObjectId(id)}, {$set:body},  (err, success) => {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(success);
                }
                client.close();
            })
        }


        //client.close();
    })
    return deferred.promise;

}
exports.findOneAndUpdateByCustomQuery = (collection, query, body) => {
    var deferred = Q.defer();
    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            // step1: fetch _id by using custom query. Because From events request we might not get _id.
            // Step2: assign _id to request and update the record.
            db.collection(collection).find(query).toArray((e, filter_data) => {
                if (e) {
                    deferred.reject(e);
                } else if (filter_data.length < 1) {
                    deferred.reject("No records found");
                } else {
                    body._id = ObjectId(filter_data[0]._id);
                    db.collection(collection).update(query, body, (err, success) => {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(success);
                        }
                        client.close();
                    })

                }
            })

        }


    })
    return deferred.promise;

}
exports.findOneAndUpdateByCustomQueryAndCustomFiled = (collection, query, update_query, upsert) => {
    var deferred = Q.defer();
    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            // step1: fetch _id by using custom query. Because From events request we might not get _id.
            // Step2: assign _id to request and update the record.
            db.collection(collection).find(query).toArray((e, filter_data) => {
                if (e) {
                    deferred.reject(e);
                } else if (filter_data.length < 1) {
                    deferred.reject("No records found");
                } else {

                    db.collection(collection).update(query, update_query, upsert, (err, success) => {
                        if (err) {

                            deferred.reject(err);
                        } else {

                            deferred.resolve(success);
                        }
                        client.close();
                    })

                }
            })

        }


    })
    return deferred.promise;

}
exports.findOneAndUpdateByField = (collection, query, set, upsert) => {
    var deferred = Q.defer();
    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            // body._id = ObjectId(body._id);
            db.collection(collection).update(query, set, upsert, (err, success) => {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(success);
                }
                client.close();
            })
        }



    })
    return deferred.promise;

}
exports.findOneAndRemove = (collection, query) => {
    var deferred = Q.defer();
    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            db.collection(collection).remove(query, (err, success) => {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(success);
                }
                client.close();
            })
        }


    })
    return deferred.promise;


}

exports.aggregations = (collection, query) => {
    var deferred = Q.defer();
    MongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) {
            deferred.reject(err);
        } else {
            const db = client.db(DATABASE_NAME);
            db.collection(collection).aggregate(query, (err, success) => {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(success);
                }
                client.close();
            })
        }


    })
    return deferred.promise;


}