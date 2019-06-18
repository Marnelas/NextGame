const passport = require('passport');

require('./serializers');
require('./Strategy');

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
 


}
