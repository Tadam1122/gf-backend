"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = require("./routes");

var app = (0, _express["default"])();
var port = process.env.PORT || 8000;
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
(0, _routes.registerRoutes)(app); // app.get('/', (req, res) => {
//   console.log('client connected')
//   res.send({ message: 'hello from server!' })
// })

app.listen(port, function () {
  console.log('app listening on port 8000');
});