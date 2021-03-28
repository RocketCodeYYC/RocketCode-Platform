module.exports = {
  // The public URL of your app.
  // This will appear in the link that is used to verify email addresses and reset passwords.
  // Set the mount path as it is in serverURL
  publicServerURL: 'http://localhost:1347/parse',

  // Your apps name. This will appear in the subject and body of the emails that are sent.
  appName: 'RocketCode App',

  // Enable email verification
  verifyUserEmails: false,

  // set preventLoginWithUnverifiedEmail to false to allow user to login without verifying their email
  // set preventLoginWithUnverifiedEmail to true to prevent user from login if their email is not verified
  preventLoginWithUnverifiedEmail: false, // defaults to false

  /*
  emailAdapter: {
    module: '@parse/simple-mailgun-adapter',
    options: {
      // The address that your emails come from
      fromAddress: 'no-reply@mail.domain.ca',
      // Your domain from mailgun.com
      domain: 'mail.domain.ca',
      // Your API key from mailgun.com
      apiKey: 'someapikey',
    }
  },
  */

  /*
  customPages: {
    invalidLink: 'https://myapp.com/invalid-link',
    verifyEmailSuccess: 'https://myapp.com/verify-email-success',
    choosePassword: 'https://myapp.com/choose-password',
    passwordResetSuccess: 'https://myapp.com/password-reset-success',
  }*/
  /*
  customPages: {
    passwordResetSuccess: 'http://localhost:8000/password_reset_success.html'
  },*/
  allowClientClassCreation: false, // RESTRICTING (PUBLIC) CLASS CREATION
}