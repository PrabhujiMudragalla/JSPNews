const db_query = require('./query');
const Q = require('q');
const ObjectId = require('mongodb').ObjectID;

exports.createNews = (req) => {
    let deferred = Q.defer();
    let unique_fileds = null;
    let body = req.body;
    /***
     * @params - title, description, image, thumbnail, category, tags, language
     * @params - status{saved, published}, isCancelled, isSendNotification
     * @params - platforms{web, pwa, ANdroid, IOS}, sequence numbers,
     * @params - created
    */
    body.created = new Date();
    db_query.create('News', body, unique_fileds).then((data) => {
        deferred.resolve({ status: "success", message: data });
    }).fail((err) => {
        deferred.reject({ status: "error", message: err });
    })
    return deferred.promise;

}
exports.getNews = (req) => {
    let deferred = Q.defer();
    let limitedFileds = null,
        page = 1,
        limitPerPage = 1000;
    let query = {};
    if (req.query.start_date && req.query.end_date) {
        query.published_on = { $gte: new Date(req.query.start_date), $lt: new Date(req.query.end_date) };
    }
    if (req.query.tags) {
        var tags = req.query.tags.split(",");
        query.tags = { $in: tags };
    }


    db_query.findByFilter('News', query, limitedFileds, page, limitPerPage).then((data) => {
        db_query.count('News', query).then((total_count) => {
            deferred.resolve({ status: "success", message: data, total_items: total_count });
        }).fail((error) => {
            deferred.reject({ status: "error", message: error });
        })

    }).fail((err) => {
        deferred.reject({ status: "error", message: err });
    })
    return deferred.promise;

}
exports.getNewsById = (req) => {
    let deferred = Q.defer();
    let limitedFileds = null;
    db_query.findById('News', req.params.id, limitedFileds).then((data) => {
        deferred.resolve({ status: "success", message: data });
    }).fail((err) => {
        deferred.reject({ status: "error", message: err });
    })
    return deferred.promise;

}
exports.publishNews = (req) => {
    let deferred = Q.defer();
    let body = req.body;
    body.last_updated = new Date();
    body.published_on = new Date();
    //check push notification flag -> if Yes send to all
    /***
     * @Push notification pending
    */
    db_query.findOneAndUpdate('News', body).then((data) => {
        deferred.resolve({ status: "success", message: data });
    }).fail((err) => {
        deferred.reject({ status: "error", message: err });
    })
    return deferred.promise;

}
exports.updateNewsById = (req) => {
    let deferred = Q.defer();
    let body = req.body;
    body.last_updated = new Date();
    db_query.findOneAndUpdate('News', body).then((data) => {
        deferred.resolve({ status: "success", message: data });
    }).fail((err) => {
        deferred.reject({ status: "error", message: err });
    })
    return deferred.promise;

}
exports.deleteNews = (req) => {
    let deferred = Q.defer();
    let query = { _id: ObjectId(req.params.id) };
    db_query.findOneAndRemove('News', query).then((data) => {
        deferred.resolve({ status: "success", message: data });
    }).fail((err) => {
        deferred.reject({ status: "error", message: err });
    })
    return deferred.promise;

}