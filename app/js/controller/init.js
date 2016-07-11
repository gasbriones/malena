import SliderHome from "../../../dist/build/components/slider-home.js";
import PublicationsHome from "../../../dist/build/components/publications-home.js";
import PublicationsExplore from "../../../dist/build/components/publications-explore.js"
import PublicationsResultado from "../../../dist/build/components/publications-resultado.js"

var page = document.getElementsByTagName("body")[0];

switch (page.getAttribute('data-page')) {
    case 'home':
        var sh = new SliderHome(),
            ph = new PublicationsHome();
    break;
    case 'explorer':
        var pe = new PublicationsExplore();
    break;
    case 'result':
        var pr = new PublicationsResultado();
    break;
}
