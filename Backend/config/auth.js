module.exports = {
    ensureAuthenticated: function(req, res, next) {

      console.log(req.user)
      if (req.isAuthenticated()) {
        return next();
      }
  
    console.log("Not authendicated! redirecting to login...")
    //TODO redirect to login
      res.send('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    }
  };


    //   req.flash('error_msg', 'Please log in to view that resource');