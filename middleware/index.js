const auth = require("basic-auth");
const User = require("../src/models/users");

const authenticateUser = (req, res, next) => {
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  User.authenticate(credentials.name, credentials.pass, function(error, user) {
    if (error || !user) {
      let err = new Error("Authentication fail");
      err.status = 401;
      return next(err);
    } else {
      console.log(`Authentication successful for username: ${user.fullName}`);
      req.currentUser = user;
      next();
    }
  });
};

module.exports.authenticateUser = authenticateUser;
