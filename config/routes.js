var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')

module.exports = function(app) {
    //pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user
        app.locals.user = _user
        next()
    })

   //index page
   app.get('/', Index.index)

   //User
   app.post('/user/signup', User.signup) //signup
   app.post('/user/signin', User.signin) //signin
   app.get('/signin', User.showSignin) //signin
   app.get('/signup', User.showSignup) //signup
   app.get('/logout', User.logout) //logout
   app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list) //userlist
   
   //Movie
   app.get('/movie/:id', Movie.detail) //movie Detail
   app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new) // movie new page
   app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update) // admin update page
   app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save) //admin post movie
   app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list) // movielist
   app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del) //moviedel

   //comment
   app.post('/user/comment', User.signinRequired, Comment.save) //admin post movie
    
   //category
   app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new) // category new page
   app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list) // categorylist
   app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save) //admin post category

}
