
var express = require('express');
var app = express();

//setting middleware
app.use(express.static(__dirname + '')); //Serves resources from public folder





app.get('/healthcheck', (req, res) => res.send('Healthcheck SUCCESS'));

app.listen(80, (err) => {
            if (err) throw err
            console.log('> Ready on port '+80)
        })


        process.on('uncaughtException', err => {
            console.log('UNCAUGHT EXCEPTION!!! shutting down...');
            console.log(err.name, err.message);
            process.exit(1);
        });


// const express = require('express')
// const next = require('next')
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()
//
// // ======== EXTERNAL API ROUTES ==========
//
// // ======== EXTERNAL API ROUTES ==========
//
// const hpp = require('hpp');
// const xss = require('xss-clean');
// const cookieParser = require('cookie-parser');
//
// app.prepare()
//     .then(() => {
//         const server = express();
//
//         // Data sanitization against XSS(clean user input from malicious HTML code)
//         server.use(xss());
//
//         // Prevent parameter pollution
//         server.use(hpp());
//
//         // Allow cookie parsing
//         server.use(cookieParser());
//
//         // Parser
//         var bodyParser = require('body-parser')
//         server.use( bodyParser.json() );       // to support JSON-encoded bodies
//         server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//             extended: true
//         }));
//
//         // ====== API ======
//
//         // ====== API ======
//
//         // ====== ROUTES ======
//         server.get('/healthcheck', (req, res) => res.send('Healthcheck SUCCESS'));
//
//         server.get('/nivtest', (req, res) => res.send('Healthcheck nivtest'));
//
//
//         server.get('/',(req, res) => {
//             return handle(req, res)
//         })
//
//         server.get('*',(req, res) => {
//             return handle(req, res)
//         })
//         // ====== ROUTES ======
//
//         var port = (process.env.NODE_ENV == 'production') ? process.env.PROD_PORT : process.env.DEV_PORT;
//         server.listen(port, (err) => {
//             if (err) throw err
//             console.log('> Ready on port '+port)
//         })
//
//         process.on('uncaughtException', err => {
//             console.log('UNCAUGHT EXCEPTION!!! shutting down...');
//             console.log(err.name, err.message);
//             process.exit(1);
//         });
//
//     })
//     .catch((ex) => {
//         console.error(ex.stack)
//         process.exit(1)
//     })