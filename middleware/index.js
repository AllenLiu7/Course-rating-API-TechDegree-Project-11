const auth = require("basic-auth");
const User = require("../src/models/users");

const authenticateUser = (req, res, next) => {
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  if (credentials) {
    User.authenticate(credentials.name, credentials.pass, (error, user) => {
      if (error || !user) {
        let err = new Error("Authentication fails");
        err.status = 401;
        return next(err);
      } else {
        console.log(`Authentication successful for username: ${user.fullName}`);
        req.currentUser = user;
        return next();
      }
    });
  } else {
    const err = new Error("Authentication header not found");
    err.status = 401;
    return next(err);
  }
};

module.exports.authenticateUser = authenticateUser;
