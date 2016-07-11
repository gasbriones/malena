'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPaginate = require('react-paginate');

var _reactPaginate2 = _interopRequireDefault(_reactPaginate);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentList = function (_React$Component) {
    _inherits(CommentList, _React$Component);

    function CommentList() {
        _classCallCheck(this, CommentList);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CommentList).call(this));
    }

    _createClass(CommentList, [{
        key: 'render',
        value: function render() {
            var self = this;

            var publicationsNodes = this.props.data.map(function (publication, index) {
                var url = "/items/show/" + publication.id,
                    style = {
                    color: publication.flag
                };
                return _react2.default.createElement(
                    'div',
                    { key: index, className: self.props.colClass || 'item col-12_sm-12' },
                    _react2.default.createElement(
                        'div',
                        { className: 'item-border' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'item-title' },
                            _react2.default.createElement(
                                'a',
                                { className: 'item-link', href: url },
                                publication.title
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'item-autor' },
                            _react2.default.createElement('i', { className: 'icon icon-user' }),
                            publication.author
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'item-section' },
                            _react2.default.createElement('i', { className: 'icon icon-books' }),
                            publication.section
                        ),
                        _react2.default.createElement('i', { className: 'icon icon-flag', style: style })
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'col-12 grid-center' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-10_md-11 grid-spaceAround' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12_md-12_sm-12' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'title' },
                            'Resultados'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-10_md-11 explore-grid grid-spaceBetween' },
                    publicationsNodes
                )
            );
        }
    }]);

    return CommentList;
}(_react2.default.Component);

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App(props) {
        _classCallCheck(this, App);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

        _this2.handlePageClick = function (data) {
            var selected = data.selected;
            var offset = Math.ceil(selected * _this2.props.perPage);

            _this2.setState({ offset: offset }, function () {
                _this2.loadCommentsFromServer();
            });
        };

        _this2.state = {
            data: [],
            offset: 0
        };
        return _this2;
    }

    _createClass(App, [{
        key: '_init',
        value: function _init() {
            _reactDom2.default.render(_react2.default.createElement(App, { url: '/services/publications',
                perPage: 6 }), document.getElementById('result'));
        }
    }, {
        key: 'loadCommentsFromServer',
        value: function loadCommentsFromServer() {
            var self = this;
            var instance = _axios2.default.create({
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost"
                }
            });

            instance.get(self.props.url, { limit: self.props.perPage, offset: self.state.offset }).then(function (response) {
                self.setState({
                    data: response.data.publications,
                    pageNum: Math.ceil(response.data.meta.total_count / response.data.meta.limit)
                });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadCommentsFromServer();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'col-12 grid-center' },
                _react2.default.createElement(CommentList, { data: this.state.data, colClass: this.props.colClass }),
                _react2.default.createElement(_reactPaginate2.default, { previousLabel: "«",
                    nextLabel: "»",
                    breakLabel: _react2.default.createElement(
                        'a',
                        { href: '' },
                        '...'
                    ),
                    pageNum: this.state.pageNum,
                    marginPagesDisplayed: 2,
                    pageRangeDisplayed: 5,
                    clickCallback: this.handlePageClick,
                    containerClassName: "pagination",
                    subContainerClassName: "pages pagination",
                    activeClassName: "active" })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;