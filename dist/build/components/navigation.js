'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = function () {
    function Navigation(opts) {
        _classCallCheck(this, Navigation);

        opts = {
            toggle: 'main .matters-title',
            css: 'closed'
        };

        this.opts = opts;
        this.init.call(this);
    }

    _createClass(Navigation, [{
        key: 'init',
        value: function init() {
            var self = this;

            self.el = {
                toggle: document.querySelector(self.opts.toggle)
            };

            self.el.wrapper = self.el.toggle.parentNode;

            for (var key in self.el) {
                if (self.isElement(self.el[key]) == false) {
                    console.log('no existe', key, self);
                    return false;
                }
            }

            setTimeout(function () {
                self.el.toggle.addEventListener('click', function () {
                    self.onClick(self);
                });
            }, 100);
        }
    }, {
        key: 'onClick',
        value: function onClick(self) {
            self.el.wrapper.classList.toggle(self.opts.css);
        }
    }, {
        key: 'isElement',
        value: function isElement(element) {
            return element === null ? false : true;
        }
    }]);

    return Navigation;
}();

exports.default = Navigation;