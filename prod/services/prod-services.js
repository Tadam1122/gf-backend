"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapePrices = scrapePrices;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _mongodb = require("mongodb");

var _connect = require("../db/connect");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var cliProgress = require('cli-progress');

function scrapePrices() {
  return _scrapePrices.apply(this, arguments);
}

function _scrapePrices() {
  _scrapePrices = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client, db, eGuitarBar, aGuitarBar, aAmpBar, eAmpBar, pedalBar, browser, page, eGuitars, aGuitars, eAmps, aAmps, pedals;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _connect.connectClient)();

          case 2:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            eGuitarBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            aGuitarBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            aAmpBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            eAmpBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            pedalBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            console.log('updating product prices...');
            _context.next = 12;
            return _puppeteer["default"].launch();

          case 12:
            browser = _context.sent;
            _context.next = 15;
            return browser.newPage();

          case 15:
            page = _context.sent;
            _context.next = 18;
            return page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');

          case 18:
            _context.next = 20;
            return page.setDefaultNavigationTimeout(0);

          case 20:
            _context.next = 22;
            return db.collection('electric-guitars').find({}).toArray();

          case 22:
            eGuitars = _context.sent;
            console.log('Updating electric guitar prices...');
            _context.next = 26;
            return scrapeProducts(eGuitars, 'electric-guitars', eGuitarBar, page, db);

          case 26:
            _context.next = 28;
            return db.collection('acoustic-guitars').find({}).toArray();

          case 28:
            aGuitars = _context.sent;
            console.log('Updating acoustic guitar prices...');
            _context.next = 32;
            return scrapeProducts(aGuitars, 'acoustic-guitars', aGuitarBar, page, db);

          case 32:
            _context.next = 34;
            return db.collection('electric-amps').find({}).toArray();

          case 34:
            eAmps = _context.sent;
            console.log('Updating electric amplifier prices...');
            _context.next = 38;
            return scrapeProducts(eAmps, 'electric-amps', eAmpBar, page, db);

          case 38:
            _context.next = 40;
            return db.collection('acoustic-amps').find({}).toArray();

          case 40:
            aAmps = _context.sent;
            console.log('Updating acoustic amplifier prices...');
            _context.next = 44;
            return scrapeProducts(aAmps, 'acoustic-amps', aAmpBar, page, db);

          case 44:
            _context.next = 46;
            return db.collection('effect-pedals').find({}).toArray();

          case 46:
            pedals = _context.sent;
            console.log('Updating effect pedal prices...');
            _context.next = 50;
            return scrapeProducts(pedals, 'effect-pedals', pedalBar, page, db);

          case 50:
            _context.next = 52;
            return browser.close();

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _scrapePrices.apply(this, arguments);
}

function scrapeProducts(_x, _x2, _x3, _x4, _x5) {
  return _scrapeProducts.apply(this, arguments);
}

function _scrapeProducts() {
  _scrapeProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(products, tableName, productBar, page, db) {
    var i, product, productId, inStock, j, price, data, _data, _data2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            productBar.start(products.length, 0);
            i = 0;

          case 2:
            if (!(i < products.length)) {
              _context2.next = 44;
              break;
            }

            product = _objectSpread({}, products[i]);
            delete product._id;
            productId = products[i]._id;
            inStock = false;
            j = 0;

          case 8:
            if (!(j < product.prices.length)) {
              _context2.next = 37;
              break;
            }

            price = void 0;

            if (!(product.prices[j].website === 'American Musical Supply')) {
              _context2.next = 17;
              break;
            }

            _context2.next = 13;
            return require("../../prod/services/scrape-services")["priceAMS"](product.prices[j].url, page);

          case 13:
            data = _context2.sent;
            product.prices[j].inStock = data.inStock;
            price = data.price;
            inStock = inStock ? inStock : data.inStock;

          case 17:
            if (!(product.prices[j].website === 'Sweetwater')) {
              _context2.next = 25;
              break;
            }

            if (!product.prices[j].url) {
              _context2.next = 25;
              break;
            }

            _context2.next = 21;
            return require("../../prod/services/scrape-services")["priceSweetwater"](product.prices[j].url, page);

          case 21:
            _data = _context2.sent;
            product.prices[j].inStock = _data.inStock;
            price = _data.price;
            inStock = inStock ? inStock : _data.inStock;

          case 25:
            if (!(product.prices[j].website === 'Musicians Friend')) {
              _context2.next = 33;
              break;
            }

            if (!product.prices[j].url) {
              _context2.next = 33;
              break;
            }

            _context2.next = 29;
            return require("../../prod/services/scrape-services")["priceMF"](product.prices[j].url, page);

          case 29:
            _data2 = _context2.sent;
            product.prices[j].inStock = _data2.inStock;
            price = _data2.price;
            inStock = inStock ? inStock : _data2.inStock;

          case 33:
            if (price) product.prices[j].price = price;

          case 34:
            j++;
            _context2.next = 8;
            break;

          case 37:
            product.inStock = inStock;
            _context2.next = 40;
            return db.collection(tableName).updateOne({
              _id: (0, _mongodb.ObjectId)(productId)
            }, {
              $set: product
            });

          case 40:
            productBar.increment();

          case 41:
            i++;
            _context2.next = 2;
            break;

          case 44:
            productBar.stop();

          case 45:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _scrapeProducts.apply(this, arguments);
}