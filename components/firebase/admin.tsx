//admin.js

const admin = require('firebase-admin');

admin.initializeApp();

const admindb = admin.firestore();

module.exports = { admin, admindb };