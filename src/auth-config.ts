// client/src/auth-config.js

// Specific settings for our application's
// authentication context. These will override
// the default settings provided by aureliauth

var authConfig = {

  baseUrl: 'http://localhost:8000',
  loginUrl: 'login',
  loginRedirect: '#/home',
  tokenName: 'token',
  authHeader: 'AuthenticationToken'

}

export default authConfig;