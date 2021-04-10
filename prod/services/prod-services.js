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
    var client, db, eGuitarBar, aGuitarBar, aAmpBar, eAmpBar, pedalBar, browser, page, eGuitars, i, eGuitar, eGuitarId, inStock, j, price, data, _data, _data2, aGuitars, _i, aGuitar, aGuitarId, _j, _price, eAmps, count, _i2, eAmp, eAmpId, _j2, _price2, aAmps, _i3, aAmp, aAmpId, _j3, _price3, pedals, _i4, pedal, pedalId, _j4, _price4, _inStock, _data3, _data4;

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

            eGuitarBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            aGuitarBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            aAmpBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            eAmpBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            pedalBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
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
            eGuitarBar.start(eGuitars.length, 0);
            i = 0;

          case 26:
            if (!(i < eGuitars.length)) {
              _context.next = 65;
              break;
            }

            eGuitar = _objectSpread({}, eGuitars[i]);
            delete eGuitar._id;
            eGuitarId = eGuitars[i]._id;
            inStock = false;
            j = 0;

          case 32:
            if (!(j < eGuitar.prices.length)) {
              _context.next = 58;
              break;
            }

            price = void 0;

            if (!(eGuitar.prices[j].website === 'American Musical Supply')) {
              _context.next = 40;
              break;
            }

            _context.next = 37;
            return require("../../prod/services/scrape-services")["priceAMS"](eGuitar.prices[j].url, page);

          case 37:
            data = _context.sent;
            price = data.price;
            inStock = inStock ? inStock : data.inStock;

          case 40:
            if (!(eGuitar.prices[j].website === 'Sweetwater')) {
              _context.next = 47;
              break;
            }

            if (!eGuitar.prices[j].url) {
              _context.next = 47;
              break;
            }

            _context.next = 44;
            return require("../../prod/services/scrape-services")["priceSweetwater"](eGuitar.prices[j].url, page);

          case 44:
            _data = _context.sent;
            price = _data.price;
            inStock = inStock ? inStock : _data.inStock;

          case 47:
            if (!(eGuitar.prices[j].website === 'Musicians Friend')) {
              _context.next = 54;
              break;
            }

            if (!eGuitar.prices[j].url) {
              _context.next = 54;
              break;
            }

            _context.next = 51;
            return require("../../prod/services/scrape-services")["priceMF"](eGuitar.prices[j].url, page);

          case 51:
            _data2 = _context.sent;
            price = _data2.price;
            inStock = inStock ? inStock : _data2.inStock;

          case 54:
            if (price) eGuitar.prices[j].price = price;

          case 55:
            j++;
            _context.next = 32;
            break;

          case 58:
            eGuitar.inStock = inStock;
            _context.next = 61;
            return db.collection('electric-guitars').updateOne({
              _id: (0, _mongodb.ObjectId)(eGuitarId)
            }, {
              $set: eGuitar
            });

          case 61:
            eGuitarBar.increment();

          case 62:
            i++;
            _context.next = 26;
            break;

          case 65:
            eGuitarBar.stop();
            _context.next = 68;
            return db.collection('acoustic-guitars').find({}).toArray();

          case 68:
            aGuitars = _context.sent;
            console.log('Updating acoustic guitar prices...');
            aGuitarBar.start(aGuitars.length, 0); //TODO: update the other product categories to follow electric guitar alg

            _i = 0;

          case 72:
            if (!(_i < aGuitars.length)) {
              _context.next = 93;
              break;
            }

            aGuitar = _objectSpread({}, aGuitars[_i]);
            delete aGuitar._id;
            aGuitarId = eGuitars[_i]._id.$oid;
            _j = 0;

          case 77:
            if (!(_j < aGuitar.prices.length)) {
              _context.next = 87;
              break;
            }

            _price = void 0;

            if (!(aGuitar.prices[_j].website === 'American Musical Supply')) {
              _context.next = 83;
              break;
            }

            _context.next = 82;
            return require("../../prod/services/scrape-services")["priceAMS"](aGuitar.prices[_j].url, page);

          case 82:
            _price = _context.sent;

          case 83:
            //   if (aGuitar.prices[j].website === 'Sweetwater') {
            //     price = priceSweetwater(store.url, page)
            //   }
            //   if (aGuitar.prices[j].website === 'Musicians Friend') {
            //     price = priceMF(store.url, page)
            //   }
            if (_price) aGuitar.prices[_j].price = _price;

          case 84:
            _j++;
            _context.next = 77;
            break;

          case 87:
            _context.next = 89;
            return db.collection('acoustic-guitars').updateOne({
              _id: (0, _mongodb.ObjectId)(aGuitarId)
            }, {
              $set: aGuitar
            });

          case 89:
            aGuitarBar.increment();

          case 90:
            _i++;
            _context.next = 72;
            break;

          case 93:
            aGuitarBar.stop();
            _context.next = 96;
            return db.collection('electric-amps').find({}).toArray();

          case 96:
            eAmps = _context.sent;
            console.log('Updating electric amplifier prices...');
            eAmpBar.start(eAmps.length, 0);
            count = 0;
            _i2 = 0;

          case 101:
            if (!(_i2 < eAmps.length)) {
              _context.next = 122;
              break;
            }

            eAmp = _objectSpread({}, eAmps[_i2]);
            delete eAmp._id;
            eAmpId = eAmps[_i2]._id.$oid;
            _j2 = 0;

          case 106:
            if (!(_j2 < eAmp.prices.length)) {
              _context.next = 116;
              break;
            }

            _price2 = void 0;

            if (!(eAmp.prices[_j2].website === 'American Musical Supply')) {
              _context.next = 112;
              break;
            }

            _context.next = 111;
            return require("./scrape-services")["priceAMS"](eAmp.prices[_j2].url, page);

          case 111:
            _price2 = _context.sent;

          case 112:
            //   if (eAmp.prices[j].website === 'Sweetwater') {
            //     price = priceSweetwater(store.url, page)
            //   }
            //   if (eAmp.prices[j].website === 'Musicians Friend') {
            //     price = priceMF(store.url, page)
            //   }
            if (_price2) eAmp.prices[_j2].price = _price2;

          case 113:
            _j2++;
            _context.next = 106;
            break;

          case 116:
            _context.next = 118;
            return db.collection('electric-amps').updateOne({
              _id: (0, _mongodb.ObjectId)(eAmpId)
            }, {
              $set: eAmp
            });

          case 118:
            eAmpBar.increment();

          case 119:
            _i2++;
            _context.next = 101;
            break;

          case 122:
            eAmpBar.stop();
            _context.next = 125;
            return db.collection('acoustic-amps').find({}).toArray();

          case 125:
            aAmps = _context.sent;
            console.log('Updating acoustic amplifier prices...');
            aAmpBar.start(aAmps.length, 0);
            _i3 = 0;

          case 129:
            if (!(_i3 < aAmps.length)) {
              _context.next = 150;
              break;
            }

            aAmp = _objectSpread({}, aAmps[_i3]);
            delete aAmp._id;
            aAmpId = aAmps[_i3]._id.$oid;
            _j3 = 0;

          case 134:
            if (!(_j3 < aAmp.prices.length)) {
              _context.next = 144;
              break;
            }

            _price3 = void 0;

            if (!(aAmp.prices[_j3].website === 'American Musical Supply')) {
              _context.next = 140;
              break;
            }

            _context.next = 139;
            return require("../../prod/services/scrape-services")["priceAMS"](aAmp.prices[_j3].url, page);

          case 139:
            _price3 = _context.sent;

          case 140:
            //   if (aAmp.prices[j].website === 'Sweetwater') {
            //     price = priceSweetwater(store.url, page)
            //   }
            //   if (aAmp.prices[j].website === 'Musicians Friend') {
            //     price = priceMF(store.url, page)
            //   }
            if (_price3) aAmp.prices[_j3].price = _price3;

          case 141:
            _j3++;
            _context.next = 134;
            break;

          case 144:
            _context.next = 146;
            return db.collection('acoustic-amps').updateOne({
              _id: (0, _mongodb.ObjectId)(aAmpId)
            }, {
              $set: aAmp
            });

          case 146:
            aAmpBar.increment();

          case 147:
            _i3++;
            _context.next = 129;
            break;

          case 150:
            aAmpBar.stop();
            _context.next = 153;
            return db.collection('effect-pedals').find({}).toArray();

          case 153:
            pedals = _context.sent;
            console.log('Updating effect pedal prices...');
            pedalBar.start(pedals.length, 0);
            _i4 = 0;

          case 157:
            if (!(_i4 < pedals.length)) {
              _context.next = 195;
              break;
            }

            pedal = _objectSpread({}, pedals[_i4]);
            delete pedal._id;
            pedalId = pedals[_i4]._id.$oid;
            _j4 = 0;

          case 162:
            if (!(_j4 < pedal.prices.length)) {
              _context.next = 189;
              break;
            }

            _price4 = void 0;
            _inStock = false;

            if (!(pedal.prices[_j4].website === 'American Musical Supply')) {
              _context.next = 170;
              break;
            }

            if (!pedal.prices[_j4].url) {
              _context.next = 170;
              break;
            }

            _context.next = 169;
            return require("../../prod/services/scrape-services")["priceAMS"](pedal.prices[_j4].url, page);

          case 169:
            _price4 = _context.sent;

          case 170:
            if (!(pedal.prices[_j4].website === 'Sweetwater')) {
              _context.next = 177;
              break;
            }

            if (!pedal.prices[_j4].url) {
              _context.next = 177;
              break;
            }

            _context.next = 174;
            return require("../../prod/services/scrape-services")["priceSweetwater"](pedal.prices[_j4].url, page);

          case 174:
            _data3 = _context.sent;
            _price4 = _data3.price;
            _inStock = _data3.inStock;

          case 177:
            if (!(pedal.prices[_j4].website === 'Musicians Friend')) {
              _context.next = 184;
              break;
            }

            if (!pedal.prices[_j4].url) {
              _context.next = 184;
              break;
            }

            _context.next = 181;
            return require("../../prod/services/scrape-services")["priceMF"](pedal.prices[_j4].url, page);

          case 181:
            _data4 = _context.sent;
            _price4 = _data4.price;
            _inStock = _data4.inStock;

          case 184:
            if (_price4) pedal.prices[_j4].price = _price4;
            pedal.inStock = _inStock;

          case 186:
            _j4++;
            _context.next = 162;
            break;

          case 189:
            _context.next = 191;
            return db.collection('effect-pedals').updateOne({
              _id: (0, _mongodb.ObjectId)(pedalId)
            }, {
              $set: pedal
            });

          case 191:
            pedalBar.increment();

          case 192:
            _i4++;
            _context.next = 157;
            break;

          case 195:
            pedalBar.stop();
            _context.next = 198;
            return browser.close();

          case 198:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _scrapePrices.apply(this, arguments);
}