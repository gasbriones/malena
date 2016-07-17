import SliderHome from "../../../dist/build/components/slider-home.js";
import PublicationsHome from "../../../dist/build/components/publications-home.js";
import PublicationsExplore from "../../../dist/build/components/publications-explore.js"
import PublicationsResultado from "../../../dist/build/components/publications-resultado.js"

var page = document.getElementsByTagName("body")[0];

switch (page.getAttribute('data-page')) {
    case 'home':
        let sh = new SliderHome();
        sh._init();
        let ph = new PublicationsHome();
        ph._init();
        break;
    case 'explorer':
        let pe = new PublicationsExplore();
        pe._init();
        break;
    case 'result':
        let pr = new PublicationsResultado();
        pr._init();
        break;
}
