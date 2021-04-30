"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _mongodb = require("mongodb");

var _cliProgress = _interopRequireDefault(require("cli-progress"));

var _connect = require("../db/connect");

var _priceUtil = require("../utilities/priceUtil");

var _wishlistService = require("./wishlistService");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function scrapePrices() {
  return _scrapePrices.apply(this, arguments);
}

function _scrapePrices() {
  _scrapePrices = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client, db, aGuitarBar, browser, page, aGuitars, pages;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _connect.connectClient)();

          case 2:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            aGuitarBar = new _cliProgress["default"].SingleBar({}, _cliProgress["default"].Presets.shades_classic);
            console.log('updating product prices...');
            _context.next = 8;
            return _puppeteer["default"].launch({
              args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

          case 8:
            browser = _context.sent;
            _context.next = 11;
            return browser.newPage();

          case 11:
            page = _context.sent;
            page.setDefaultNavigationTimeout(0);
            _context.next = 15;
            return db.collection('acoustic-guitars').find({}).toArray();

          case 15:
            aGuitars = _context.sent;
            console.log('Updating acoustic guitar prices...');
            _context.next = 19;
            return scrapeProducts(aGuitars, 'acoustic-guitars', page, db, aGuitarBar);

          case 19:
            console.log('Acoustic guitar prices updated.');
            _context.next = 22;
            return client.close();

          case 22:
            _context.next = 24;
            return browser.pages();

          case 24:
            pages = _context.sent;
            _context.next = 27;
            return Promise.all(pages.map(function (page) {
              return page.close();
            }));

          case 27:
            _context.next = 29;
            return browser.close();

          case 29:
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
  _scrapeProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(products, tableName, page, db, productBar) {
    var i, product, productId, inStock, j, price, data, _data, _data2, priceNum, lowestPrices, priceDiff;

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
            if (price) {
              //update new product price
              product.prices[j].price = price; //update wishlists with products

              priceNum = (0, _priceUtil.priceToNumber)(price);
              lowestPrices = (0, _priceUtil.getLowestNumber)(product.prices);

              if (priceNum < lowestPrices) {
                priceDiff = lowestPrices - priceNum;
                (0, _wishlistService.updateWishlists)(db, priceDiff, productId);
              }
            }

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

scrapePrices();