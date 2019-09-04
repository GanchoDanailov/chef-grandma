const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const { Nuxt } = require('nuxt-start');

const nuxtConfig = require('./nuxt.config.js');

const config = {
  ...nuxtConfig,
  dev: false,
  buildDir: 'nuxt',
};
const nuxt = new Nuxt(config);

exports.ssrapp = functions.https.onRequest((req, res) => nuxt.render(req, res));

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
    .then(() => ({ messages: `Request fulfilled! ${data.email} is now a moderator.` }))
    .catch(error => error);
});
