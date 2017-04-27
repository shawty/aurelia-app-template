# aurelia-app-template
My base template for creating Aurelia JS applications

a few notes:

This uses aurelia-auth and aurelia-validation to provide application authentication and validation services.

After you clone it, you MUST do the following:

Make sure you have the following tools NPM installed and available globally.

* aurelia-cli
* jspm
* typescript
* typings
* tsd

once you've done that, cd into the application folder (Same location as packages.json) and perform an

`npm install`

YOU MIGHT ALSO NEED TO DO A

`jspm install`

too, but before you try, do an

`au build`

and an

`au run`

from the command line first.

if all goes ok, you should be able to hit http://localhost:9000/ as usual and run the app.

Initially however, your login wont work, beacuse the default configuration is set to look for a /login endpoint running on port 8000.

You can change these in 'src/auth-config.ts' , do a gsearch for aurelia-auth to get everything you can configure, there's plenty of blogs
and docs out there.

For this sample however:

* baseUrl: Is the base url of your API

* loginUrl: Is the leaf node of your login route

* loginRedirect: is the aurelia route to redirect to when you log in

* tokenName: is the name of the JSON property that aurelia-auth will look for in the json reply from the login route on your API, if the property exists but is empty, your login will be considered a failiure

* authHeader: is the name of the HTTP header the JWT token will be sent back to your API in each time you make a call using the http service lib

It may not be a feature rich as the ones provided by the aurelia team, but it get's me up and running with auth and validation, quick as you like everytime.

This is not a supported thing, it's here mostly for my own use, so issues/pull requests etc will mostly go unanswered, if somethings broken, and you want to fix it, clone it and go to town on it.

That said, if you are stuck, and you ask me nicely via twitter @shawtyds I may help you if I have time.

Shawty
