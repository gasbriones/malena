import SliderHome from "../../../dist/build/components/slider-home.js";
import PublicationsHome from "../../../dist/build/components/publications-home.js";
import PublicationsExplore from "../../../dist/build/components/publications-explore.js"
import PublicationsResultado from "../../../dist/build/components/publications-resultado.js"
import Navigation from "../../../dist/build/components/navigation.js"

switch (document.body.dataset['page']) {
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
    case 'matters':
        let nv = new Navigation();
        nv._init();
        break;            
}
