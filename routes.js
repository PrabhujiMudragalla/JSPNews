const Tokens = require('csrf');

module.exports = (app) => {
    var news = require('./apis/news');
    let tokens = new Tokens();
    let secret = tokens.secretSync();

    checkAuthentication = (req, res, next) => {
        let token = req.headers['csrf'];
        if (!tokens.verify(secret, token)) {
            // res.send({ status: "error", message: "invalid token!" });
            next();
        } else {
            next();
        }


    }
    app.use('/token', (req, res) => {
        var token = tokens.create(secret);
        res.send(token);
    })
    app.use("/api/", checkAuthentication, news);

}