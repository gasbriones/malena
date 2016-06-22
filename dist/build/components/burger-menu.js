'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = require('react-burger-menu').nameOfAnimation;


var Example = _react2.default.createClass({
    displayName: 'Example',

    showSettings: function showSettings(event) {
        event.preventDefault();
    },
    render: function render() {
        return _react2.default.createElement(
            Menu,
            null,
            _react2.default.createElement(
                'a',
                { id: 'home', className: 'menu-item', href: '/' },
                'Home'
            ),
            _react2.default.createElement(
                'a',
                { id: 'about', className: 'menu-item', href: '/about' },
                'About'
            ),
            _react2.default.createElement(
                'a',
                { id: 'contact', className: 'menu-item', href: '/contact' },
                'Contact'
            ),
            _react2.default.createElement(
                'a',
                { onClick: this.showSettings, className: 'menu-item--small', href: '' },
                'Settings'
            )
        );
    }
});

_reactDom2.default.render(_react2.default.createElement(Example, null), document.getElementById('burger'));