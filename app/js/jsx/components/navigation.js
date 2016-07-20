export default class Navigation {
    constructor(opts) {
        opts = {
            toggle: 'main .matters-title',
            css: 'closed'
        };

        this.opts = opts;
        this.init.call(this);
    }

    init() {
        var self = this;

        self.el = {
            toggle: document.querySelector(self.opts.open),
            wrapper: self.el.toggle.parentNode
        };

        for (var key in self.el) {
            if (self.isElement(self.el[key]) == false) {
                console.log('no existe', key, self)
                return false;
            }
        }

        setTimeout(function () {
            self.el.toggle.addEventListener('click', function () {
                self.onClick(self);
            });
        }, 100);
    }


    onClick(self) {
        self.el.toggle.classList.toggle(self.opts.css);
    }

    isElement(element) {
        return element === null ? false : true;
    }
}
