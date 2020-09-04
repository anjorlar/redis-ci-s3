const passport = require('passport')

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => res.redirect('/blogs')
  )

  app.get('/auth/logout', (req, res) => {
    console.log('logged out');
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    let User = req.user;
    // console.log('current user gotten', User);
    res.send(User);
  })
}
