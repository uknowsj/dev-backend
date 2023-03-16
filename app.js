const express = require('express');
const cors = require('cors');
const util = require('./util');
const cookieParser = require("cookie-parser");


require("dotenv").config();

const app = express(); //Express app 객체로 모든 서버의 일을 처리
const port = 8000;

let corsWhiteList = [
	"http://localhost:3000",
	"http://localhost:3001",
	"http://localhost:4000",
];

let corsOptions = {
	credentials: true,
	origin: (origin, callback) => {
		if (!origin || corsWhiteList.indexOf(origin) !== -1) {
			callback(null, true);
		}
	},
};
app.use(cors(corsOptions));

// Cookie Parser
app.use(
	cookieParser(process.env.COOKIE_HASH_KEY, {
		sameSite: "none",
		secure: true,
	})
);

// Rouer
app.get('/',(req,res)=>{ //localhost:port/ 접근시 
    res.send("hello express"); //response로 그냥 문자만 띄움
});

app.post('/send-cookie', (req, res) => {
    util.createToken(req, res);
    res.send("send cookie router");
});

app.post('/check-cookie', (req, res) => {
    util.checkToken(req, res);
    res.send("get cookie router");
})

app.listen(port,()=>{//http.listen()과 같음 express 내부에서 http 모듈 처리
    console.log("Express Listening on port",port);
});