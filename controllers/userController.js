const User = require("../models/user");
const session = require('express-session');
exports.home = (req, res) => {
    res.render("home");
}
exports.register_sign = (req, res) => {
    res.render("register_sign");
}
exports.signin = (req, res) => {
    res.render("signin");
}
exports.register = (req, res) => {
    res.render("register");
}
//write code to control user databse here
exports.user_create = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    });
    user
        .save()
        .then(() => {
            res.redirect("/signin");
        })
        .catch((err) => {
            next(err);
        });
}
//write code for signin page and check bu its email and password from the databse
exports.signindone = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.redirect("/signin");
            }
            else {
                if (password === user.password) {
                    req.session.userId = user._id;
                    res.redirect(`/${user._id}/transaction`);
                }
                else {
                    res.redirect("/signin");
                }
            }
        })
        .catch((err) => {
            next(err);
        });
}
//write code for logout page
exports.logout = (req, res) => {
    req.session .destroy((err) => {
        if (err) {
          console.error(err);
        }
  res.redirect('/');
});
}