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
    var client, db, eGuitars, aGuitars, eAmps, aAmps, pedals, eGuitarBar, aGuitarBar, aAmpBar, eAmpBar, pedalBar, browser, page, i, eGuitar, eGuitarId, j, price, _i, aGuitar, aGuitarId, _j, _price, count, _i2, eAmp, eAmpId, _j2, _price2, _i3, aAmp, aAmpId, _j3, _price3, _i4, pedal, pedalId, _j4, _price4;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _connect.connectClient)();

          case 2:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            console.log('updating product prices...'); //get all product data

            _context.next = 7;
            return db.collection('electric-guitars').find({}).toArray();

          case 7:
            eGuitars = _context.sent;
            _context.next = 10;
            return db.collection('acoustic-guitars').find({}).toArray();

          case 10:
            aGuitars = _context.sent;
            _context.next = 13;
            return db.collection('electric-amps').find({}).toArray();

          case 13:
            eAmps = _context.sent;
            _context.next = 16;
            return db.collection('acoustic-amps').find({}).toArray();

          case 16:
            aAmps = _context.sent;
            _context.next = 19;
            return db.collection('effect-pedals').find({}).toArray();

          case 19:
            pedals = _context.sent;
            eGuitarBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            aGuitarBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            aAmpBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            eAmpBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            pedalBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            _context.next = 27;
            return _puppeteer["default"].launch();

          case 27:
            browser = _context.sent;
            _context.next = 30;
            return browser.newPage();

          case 30:
            page = _context.sent;
            _context.next = 33;
            return page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');

          case 33:
            _context.next = 35;
            return page.setDefaultNavigationTimeout(0);

          case 35:
            // page.on('console', (msg) => console.log('PAGE LOG:', msg.text()))
            console.log('Updating electric guitar prices...');
            eGuitarBar.start(eGuitars.length, 0);
            i = 0;

          case 38:
            if (!(i < eGuitars.length)) {
              _context.next = 60;
              break;
            }

            eGuitar = _objectSpread({}, eGuitars[i]);
            delete eGuitar._id;
            eGuitarId = eGuitars[i]._id.$oid;
            j = 0;

          case 43:
            if (!(j < eGuitar.prices.length)) {
              _context.next = 54;
              break;
            }

            price = void 0;

            if (!(eGuitar.prices[j].website === 'American Musical Supply')) {
              _context.next = 50;
              break;
            }

            _context.next = 48;
            return require("../../prod/services/scrape-services")["priceAMS"](eGuitar.prices[j].url, page);

          case 48:
            price = _context.sent;
            console.log(price);

          case 50:
            //   if (eGuitar.prices[j].website === 'Sweetwater') {
            //     price = priceSweetwater(store.url, page)
            //   }
            //   if (eGuitar.prices[j].website === 'Musicians Friend') {
            //     price = priceMF(store.url, page)
            //   }
            if (price) eGuitar.prices[j].price = price;

          case 51:
            j++;
            _context.next = 43;
            break;

          case 54:
            _context.next = 56;
            return db.collection('electric-guitars').updateOne({
              _id: (0, _mongodb.ObjectId)(eGuitarId)
            }, {
              $set: eGuitar
            });

          case 56:
            eGuitarBar.increment();

          case 57:
            i++;
            _context.next = 38;
            break;

          case 60:
            eGuitarBar.stop();
            console.log('Updating acoustic guitar prices...');
            aGuitarBar.start(aGuitars.length, 0);
            _i = 0;

          case 64:
            if (!(_i < aGuitars.length)) {
              _context.next = 85;
              break;
            }

            aGuitar = _objectSpread({}, aGuitars[_i]);
            delete aGuitar._id;
            aGuitarId = eGuitars[_i]._id.$oid;
            _j = 0;

          case 69:
            if (!(_j < aGuitar.prices.length)) {
              _context.next = 79;
              break;
            }

            _price = void 0;

            if (!(aGuitar.prices[_j].website === 'American Musical Supply')) {
              _context.next = 75;
              break;
            }

            _context.next = 74;
            return require("../../prod/services/scrape-services")["priceAMS"](aGuitar.prices[_j].url, page);

          case 74:
            _price = _context.sent;

          case 75:
            //   if (aGuitar.prices[j].website === 'Sweetwater') {
            //     price = priceSweetwater(store.url, page)
            //   }
            //   if (aGuitar.prices[j].website === 'Musicians Friend') {
            //     price = priceMF(store.url, page)
            //   }
            if (_price) aGuitar.prices[_j].price = _price;

          case 76:
            _j++;
            _context.next = 69;
            break;

          case 79:
            _context.next = 81;
            return db.collection('acoustic-guitars').updateOne({
              _id: (0, _mongodb.ObjectId)(aGuitarId)
            }, {
              $set: aGuitar
            });

          case 81:
            aGuitarBar.increment();

          case 82:
            _i++;
            _context.next = 64;
            break;

          case 85:
            aGuitarBar.stop();
            console.log('Updating electric amplifier prices...');
            eAmpBar.start(eAmps.length, 0);
            count = 0;
            _i2 = 0;

          case 90:
            if (!(_i2 < eAmps.length)) {
              _context.next = 111;
              break;
            }

            eAmp = _objectSpread({}, eAmps[_i2]);
            delete eAmp._id;
            eAmpId = eAmps[_i2]._id.$oid;
            _j2 = 0;

          case 95:
            if (!(_j2 < eAmp.prices.length)) {
              _context.next = 105;
              break;
            }

            _price2 = void 0;

            if (!(eAmp.prices[_j2].website === 'American Musical Supply')) {
              _context.next = 101;
              break;
            }

            _context.next = 100;
            return require("../../prod/services/scrape-services")["priceAMS"](eAmp.prices[_j2].url, page);

          case 100:
            _price2 = _context.sent;

          case 101:
            //   if (eAmp.prices[j].website === 'Sweetwater') {
            //     price = priceSweetwater(store.url, page)
            //   }
            //   if (eAmp.prices[j].website === 'Musicians Friend') {
            //     price = priceMF(store.url, page)
            //   }
            if (_price2) eAmp.prices[_j2].price = _price2;

          case 102:
            _j2++;
            _context.next = 95;
            break;

          case 105:
            _context.next = 107;
            return db.collection('electric-amps').updateOne({
              _id: (0, _mongodb.ObjectId)(eAmpId)
            }, {
              $set: eAmp
            });

          case 107:
            eAmpBar.increment();

          case 108:
            _i2++;
            _context.next = 90;
            break;

          case 111:
            eAmpBar.stop();
            console.log('Updating acoustic amplifier prices...');
            aAmpBar.start(aAmps.length, 0);
            _i3 = 0;

          case 115:
            if (!(_i3 < aAmps.length)) {
              _context.next = 136;
              break;
            }

            aAmp = _objectSpread({}, aAmps[_i3]);
            delete aAmp._id;
            aAmpId = aAmps[_i3]._id.$oid;
            _j3 = 0;

          case 120:
            if (!(_j3 < aAmp.prices.length)) {
              _context.next = 130;
              break;
            }

            _price3 = void 0;

            if (!(aAmp.prices[_j3].website === 'American Musical Supply')) {
              _context.next = 126;
              break;
            }

            _context.next = 125;
            return require("../../prod/services/scrape-services")["priceAMS"](aAmp.prices[_j3].url, page);

          case 125:
            _price3 = _context.sent;

          case 126:
            //   if (aAmp.prices[j].website === 'Sweetwater') {
            //     price = priceSweetwater(store.url, page)
            //   }
            //   if (aAmp.prices[j].website === 'Musicians Friend') {
            //     price = priceMF(store.url, page)
            //   }
            if (_price3) aAmp.prices[_j3].price = _price3;

          case 127:
            _j3++;
            _context.next = 120;
            break;

          case 130:
            _context.next = 132;
            return db.collection('acoustic-amps').updateOne({
              _id: (0, _mongodb.ObjectId)(aAmpId)
            }, {
              $set: aAmp
            });

          case 132:
            aAmpBar.increment();

          case 133:
            _i3++;
            _context.next = 115;
            break;

          case 136:
            aAmpBar.stop();
            console.log('Updating effect pedal prices...');
            pedalBar.start(pedals.length, 0);
            _i4 = 0;

          case 140:
            if (!(_i4 < pedals.length)) {
              _context.next = 161;
              break;
            }

            pedal = _objectSpread({}, pedals[_i4]);
            delete pedal._id;
            pedalId = pedals[_i4]._id.$oid;
            _j4 = 0;

          case 145:
            if (!(_j4 < pedal.prices.length)) {
              _context.next = 155;
              break;
            }

            _price4 = void 0;

            if (!(pedal.prices[_j4].website === 'American Musical Supply')) {
              _context.next = 151;
              break;
            }

            _context.next = 150;
            return require("../../prod/services/scrape-services")["priceAMS"](pedal.prices[_j4].url, page);

          case 150:
            _price4 = _context.sent;

          case 151:
            //   if (pedal.prices[j].website === 'Sweetwater') {
            //     price = priceSweetwater(store.url, page)
            //   }
            //   if (pedal.prices[j].website === 'Musicians Friend') {
            //     price = priceMF(store.url, page)
            //   }
            if (_price4) pedal.prices[_j4].price = _price4;

          case 152:
            _j4++;
            _context.next = 145;
            break;

          case 155:
            _context.next = 157;
            return db.collection('effect-pedals').updateOne({
              _id: (0, _mongodb.ObjectId)(pedalId)
            }, {
              $set: pedal
            });

          case 157:
            pedalBar.increment();

          case 158:
            _i4++;
            _context.next = 140;
            break;

          case 161:
            pedalBar.stop();
            _context.next = 164;
            return browser.close();

          case 164:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _scrapePrices.apply(this, arguments);
}