'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

        _this.state = {
            items: []
        };
        _this._processData = _this._processData.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: '_init',
        value: function _init() {
            _reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('slider'));
        }
    }, {
        key: '_processData',
        value: function _processData() {
            var self = this;
            var array = [];

            _axios2.default.get('/services/featured').then(function (response) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {

                    for (var _iterator = response.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        array.push({
                            id: "/items/show/" + value.id,
                            title: value.title,
                            author: value.author,
                            section: value.section,
                            flag: value.flag
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

                self.setState({ items: array });
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
            var settings = {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
            };
            return _react2.default.createElement(
                _reactSlick2.default,
                settings,
                this.state.items.map(function (row, index) {
                    var style = {
                        color: row.flag
                    };
                    return _react2.default.createElement(
                        'div',
                        { key: index, className: 'item' },
                        _react2.default.createElement(
                            'div',
                            { className: 'item-border' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'item-title' },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'item-link', href: row.title },
                                    row.title
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'item-autor' },
                                _react2.default.createElement('i', { className: 'icon icon-user' }),
                                row.author
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'item-section' },
                                _react2.default.createElement('i', { className: 'icon icon-books' }),
                                row.section
                            ),
                            _react2.default.createElement('i', { className: 'icon icon-flag', style: style })
                        )
                    );
                })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;