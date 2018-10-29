const express = require('express');
const expressSession=require('express-session');
class App{
    public express;
    constructor(){
        this.express=express();
        this.express.use(require('cookie-parser')());
        this.express.use(require('body-parser').urlencoded({
            extended:true
        }));
        this.express.use(require('body-parser').json());
        this.express.use(expressSession({
            secret:'testKeys'
        }));
        var allowCrossDomaine=function(req,res,next){
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
            res.header('Access-control-Allow-Headers','Content-Type');
            next();
        };
        this.express.use('allowCrossDomaine');
        this.setUpRoutes();
    }
    setUpRoutes(){
        
    }
}