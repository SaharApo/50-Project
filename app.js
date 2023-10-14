require("dotenv").config({ path: `.env.${process.env.ENVIRONMENT}` });

var cors = require('cors')
var fetch = require('node-fetch')

var express = require('express');
var SecretsManager = require('./SecretsManager');
const bodyParser = require("body-parser");
var app = express();

//setting middleware
app.use(express.static(__dirname + '')); //Serves resources from public folder

// create application/json parser
var jsonParser = bodyParser.json()

app.options('*', cors());

app.get('/healthcheck', (req, res) => res.send('Healthcheck SUCCESS'));
app.post('/generate',cors(),jsonParser, async (req, res) => {

    let {prompt,n} = req.body;

    console.log(`Generating ${n} images for ${prompt}`);
    console.log("Getting secret API key...");

    try{
        // 1 - Get the secret from AWS
        let secretsmanager = new SecretsManager();
        let mysecret = await secretsmanager.getData("SAHAR_OPENAPI");

        console.log("Generated images..")
        // 2 - Use the API Key to send a request to the OpenAi API to generate images based on user inputs
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${mysecret}`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: parseInt(n),
                size: "512x512",
                response_format: "b64_json"
            })
        });
        if (!response.ok) throw new Error('Failed to generate images! Please try again.');

        const {data} = await response.json();  // get data from response

        console.log("DONE");

        // 3 - Return the images to the client
        res.status(200).json({data:data});
    }catch (e) {
        console.log(e);
        res.status(500).json({error:e});
    }
});

let PORT = process.env.PORT;
app.listen(PORT, (err) => {
            if (err) throw err
            console.log(`> Ready on port ${PORT} for environment ${process.env.ENVIRONMENT}`)
        })


process.on('uncaughtException', err => {
    // console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    // process.exit(1);
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