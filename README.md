# STD 2017 source code project

Made with the help of "Angular JumpStart with TypeScript".
Help tool for organizing Seek The Duck event.

## Running the Application

### In dev mode:

Terminal 1

1. install node
2. npm install -g @angular/cli
3. (WINDOWS PRE6REQUESITE - DURING up to 1 hour !) npm install --global --production windows-build-tools
4. npm install
5. ng build --watch

Terminal 2

1. npm start 

### Compile for prod mode:

1. ng build --watch --configuration=production

## Sending statics to github pages

Must be in mappercoderz.github.io repo to work.

1. npm install -g angular-cli-ghpages
2. ng build --prod
3. ngh
4. open the static website: https://mappercoderz.github.io !

See https://alligator.io/angular/deploying-angular-app-github-pages/
See https://github.com/DanWahlin/Angular-JumpStart

