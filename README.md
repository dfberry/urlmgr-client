![data](./UX.png)

This is a url manager. The client is written in angular 2 with 
state maintained by a remote datasource, returning JSON managed 
by ngrx. 

```
http://localhost:3000
```

## Example /app/config/config.json

The app expects the config file to be named config.json and located at /app/config. The contents of 
the file are below. The file is ignored by .gitignore.

```
{
     "clientHost": "localhost:3000",
     "apiUrl": "http://localhost:3001/",
     "debugging": true
 }
```

An example of state is in the ./example_state.json file.

## helpful blogs:

[*Build a Better Angular 2 Application with Redux and ngrx](http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/)
[https://egghead.io/lessons/angular-2-ngrx-store-in-10-minutes](https://egghead.io/lessons/angular-2-ngrx-store-in-10-minutes)
[https://github.com/btroncone/ngrx-examples](https://github.com/btroncone/ngrx-examples)
[https://gist.github.com/btroncone/a6e4347326749f938510#actions](https://gist.github.com/btroncone/a6e4347326749f938510#actions)
[https://www.youtube.com/watch?v=mhA7zZ23Odw](https://www.youtube.com/watch?v=mhA7zZ23Odw)
[http://stackoverflow.com/questions/39593151/how-to-configure-system-config-js-for-ngrx-store-2-2-1](http://stackoverflow.com/questions/39593151/how-to-configure-system-config-js-for-ngrx-store-2-2-1)

## example repos:

[https://github.com/ngrx/example-app.git](https://github.com/ngrx/example-app.git)
[https://github.com/btroncone/ngrx-examples](https://github.com/btroncone/ngrx-examples)
[https://github.com/onehungrymind/fem-ng2-ngrx-app](https://github.com/onehungrymind/fem-ng2-ngrx-app)

