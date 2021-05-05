module.exports.profile = function (req, res) {
    return res.render('home', {
        title: "Profile"
    });
};


module.exports.sign_up = function (req, res) {
    return res.render('sign_up', {
        title: "sign_up"
    });
};


module.exports.sign_in = function (req, res) {
    return res.render('sign_in', {
        title: "sign_in"
    });
};