"use strict";

var _ = require( 'underscore' );
var cookieParser = require( 'cookie-parser' );
var compress = require( 'compression' );
var express = require( 'express' );
var http = require( 'http' );
var methodOverride = require( 'method-override' );
var morgan = require( 'morgan' );
var path = require( 'path' );
var url = require( 'url' );

var app = module.exports = express();

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.set( 'port', process.env.PORT || 3000 );

app.use( function( req, res, next ) {
    res.header( 'Cache-Control', 'private, no-cache, no-store, must-revalidate' );
    res.header( 'Expires', '-1' );
    res.header( 'Pragma', 'no-cache' );

    next();
});

app.use( methodOverride() );
app.use( cookieParser() );
app.use( compress() );
app.use( morgan( 'dev' ) );

app.get( '/', function( req, res ) {
    res.render( 'index', {} );
});

http.createServer( app ).listen( app.get( 'port' ) );
console.log( 'Express server listening on port %d', app.get( 'port' ) );
