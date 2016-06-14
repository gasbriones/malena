'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactImageGallery = require('react-image-gallery');

var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Gallery Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Gaston Briones briones.gaston@gmail.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 1.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

        _this.state = {
            isPlaying: true,
            showIndex: false,
            slideOnThumbnailHover: false,
            showBullets: false,
            infinite: true,
            showThumbnails: false,
            showNav: false,
            slideInterval: 5000,
            data: []
        };

        _this._processData = _this._processData.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: '_processData',
        value: function _processData() {
            var array = [];
            var self = this;

            _axios2.default.get(location.href + '/mocs/carousel-home.json').then(function (response) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = response.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        array.push({
                            original: value.original,
                            description: value.description
                        });
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                self.setState({ data: array });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._processData();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(_reactImageGallery2.default, {
                ref: function ref(i) {
                    return _this2._imageGallery = i;
                },
                items: this.state.data,
                lazyLoad: false,
                infinite: this.state.infinite,
                showBullets: this.state.showBullets,
                showThumbnails: this.state.showThumbnails,
                showIndex: this.state.showIndex,
                showNav: this.state.showNav,
                slideInterval: parseInt(this.state.slideInterval),
                autoPlay: this.state.isPlaying,
                slideOnThumbnailHover: this.state.slideOnThumbnailHover
            });
        }
    }]);

    return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('home-carousel'));