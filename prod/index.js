"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _routes = require("./routes");

var app = (0, _express["default"])();
var port = process.env.PORT || 8000;
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); // app.use(
//   express.static(path.resolve(__dirname, '../dist'), {
//     maxAge: '62d',
//     etag: false,
//   })
// )

(0, _routes.registerRoutes)(app); // const httpServer = http.createServer(app)
// app.get('*', (_, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// })
// httpServer.listen(port, () => {
//   console.log(`app listening on port ${port}`)
// })

app.listen(port, function () {
  console.log("app listening on port ".concat(port));
});