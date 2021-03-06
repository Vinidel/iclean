

module.exports = function(app, passport){
    var userController  = require('../controllers/user');
    var livesession     = require('../middlewares/livesession');
    /* GET users list. */
    app.get('/users', livesession, userController.users);

    /* GET listing one User. */
    app.get('/users/:id', livesession, userController.find);

    /* GET users permissions listing. */
    app.get('/users/permissions', livesession, userController.permissions);


    /* POST users login to verification. */
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/error', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    /* POST to register a new user. */
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/error', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    /* GET to logout from current session. */
    app.get('/signout', livesession, userController.signout);
};
