module.exports.home = function (req, res) {
    res.end("<h1>this is home controller</h1>");
};

module.exports.hello = function (req, res) {
    res.end("<h1>hello world</h1>");
};