import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import db from '../db.js'

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.CALLBACK_URL}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const google_id = profile.id
    const name = profile.displayName
    let user = await db.findUserByGoogleId(google_id)
    if (!user) {
      user = await db.createGoogleUser({ google_id, name })
    }
    done(null, user)
  } catch (err) {
    done(err)
  }
}))

