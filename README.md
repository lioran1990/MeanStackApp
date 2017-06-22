- to install npm packages, you need to run `npm install` on two directories:
-   1. angular-src (client-side)
-   2. root folder (server-side)
-   

- before running `npm install`, verify you have lateset version of nodejs and npm (http://nodejs.org).
- 

```bash
$ nodejs --version
v8.1.2
```

# Install
- for linux (ubutnu) use this link: 
- https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
- 

- update npm
```bash
$ curl -L https://www.npmjs.com/install.sh | sh
```

- another way, use `nvm` to update to lastest node version
```bash
$ nvm install 8
Downloading https://nodejs.org/dist/v8.1.2/node-v8.1.2-linux-x64.tar.xz...
######################################################################## 100.0%
Now using node v8.1.2 (npm v5.0.3)
bityob:~/workspace (bit) $ nvm list
        v0.8.28
       v0.10.48
       v0.12.18
    iojs-v3.3.1
         v4.7.3
        v5.12.0
->       v8.1.2
         system
default -> 4 (-> v4.7.3)
node -> stable (-> v8.1.2) (default)
stable -> 8.1 (-> v8.1.2) (default)
iojs -> iojs-v3.3 (-> iojs-v3.3.1) (default)
$ node --version
v8.1.2
$ npm --version
5.0.3
```

- node lateset version is: v8.1.2
- npm lateset version is: v5.0.3
- 


# start app
`npm install -g angular-cli`

# use lateset with nvm
```bash
$ nvm list                                                                                                                     
        v0.8.28                                                                                                                                         
       v0.10.48                                                                                                                                         
       v0.12.18                                                                                                                                         
    iojs-v3.3.1                                                                                                                                         
->       v4.7.3                                                                                                                                         
        v5.12.0                                                                                                                                         
         v8.1.2                                                                                                                                         
         system                                                                                                                                         
default -> 4 (-> v4.7.3)                                                                                                                                
node -> stable (-> v8.1.2) (default)                                                                                                                    
stable -> 8.1 (-> v8.1.2) (default)                                                                                                                     
iojs -> iojs-v3.3 (-> iojs-v3.3.1) (default)                                                                                                            
$ nvm use v8.1.2                                                                                                               
Now using node v8.1.2 (npm v5.0.3)
```


# ng serve (set host and port)
`ng serve --host 0.0.0.0 --port 8080`


# init data in db
```bash
curl http://localhost:8080/shops/init
curl http://localhost:8080/products/init
```
