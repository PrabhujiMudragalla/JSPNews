const service = require('../services/news');

exports.createNews = (req, res) => {
    try {
        service.createNews(req).then((data) => {
            res.send(data);
        }).fail((err) => {
            res.send(err);
        })
    } catch (e) {
        res.send({ status: "error", message: e });
    }

}
exports.getNews = (req, res) => {
    try {
        service.getNews(req).then((data) => {
            res.send(data);
        }).fail((err) => {
            res.send(err);
        })
    } catch (e) {
        res.send({ status: "error", message: e });
    }

}
exports.getNewsById = (req, res) => {
    try {
        service.getNewsById(req).then((data) => {
            res.send(data);
        }).fail((err) => {
            res.send(err);
        })
    } catch (e) {
        res.send({ status: "error", message: e });
    }

}
exports.publishNews = (req, res) => {
    try {
        service.publishNews(req).then((data) => {
            res.send(data);
        }).fail((err) => {
            res.send(err);
        })
    } catch (e) {
        res.send({ status: "error", message: e });
    }

}
exports.updateNewsById = (req, res) => {
    try {
        service.updateNewsById(req).then((data) => {
            res.send(data);
        }).fail((err) => {
            res.send(err);
        })
    } catch (e) {
        res.send({ status: "error", message: e });
    }

}
exports.deleteNews = (req, res) => {
    try {
        service.deleteNews(req).then((data) => {
            res.send(data);
        }).fail((err) => {
            res.send(err);
        })
    } catch (e) {
        res.send({ status: "error", message: e });
    }

}