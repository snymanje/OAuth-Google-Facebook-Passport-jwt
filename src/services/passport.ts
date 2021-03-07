import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import JWTStrategy from 'passport-jwt';
import config from '../config';

// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: config.GoogleClientId!,
      clientSecret: config.GoogleClientSecret!,
      callbackURL: '/auth/google/callback',
    },
    (_accessToken, _refreshToken, profile, done) => {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      done(undefined, profile);
    }
  )
);

passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: config.FacebookClientId!,
      clientSecret: config.FacebookClientSecret!,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'picture'],
    },
    (_accessToken, _refreshToken, profile, done) => {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      done(undefined, profile);
    }
  )
);

passport.use(
  new JWTStrategy.Strategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies.jwt;
        }
        return token;
      },
      secretOrKey: config.SessionSecret,
    },
    (jwtPayload, done) => {
      if (!jwtPayload) {
        return done('No token found...');
      }

      return done(null, jwtPayload);
    }
  )
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});
