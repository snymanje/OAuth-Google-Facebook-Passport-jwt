import { Router } from 'express';
import passport from 'passport';

import generateJwtToken from '../services/generateJwtToken';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    res.render('home', { user: req.user });
  }
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateJwtToken(req.user);
    res.cookie('jwt', token);
    res.redirect('/');
  }
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateJwtToken(req.user);
    res.cookie('jwt', token);
    res.redirect('/');
  }
);

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/login');
});

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    res.render('profile', { user: req.user });
  }
);

export default router;
