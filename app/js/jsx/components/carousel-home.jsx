/**
 * Gallery Component
 * @author Gaston Briones briones.gaston@gmail.com
 * @version 1.0
 */
import React from 'react'
import ReactDOM from 'react-dom'
import ImageGallery from 'react-image-gallery'
import Axios from 'axios'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            isPlaying: true,
            showIndex: false,
            slideOnThumbnailHover: false,
            showBullets: false,
            infinite: true,
            showThumbnails: false,
            showNav: false,
            slideInterval: 5000,
            data: [],
        }

        this._processData = this._processData.bind(this);
    }

    _processData() {
        const array = [];
        let self = this;

        Axios.get(location.href+ '/mocs/carousel-home.json').then(function (response) {
            for (let value of response.data) {
                array.push({
                    original: value.original,
                    description: value.description
                });
            }
            self.setState({data:array});
        })
    }

    componentDidMount() {
        this._processData();
    }

    render() {
        return (
            <ImageGallery
                ref={i => this._imageGallery = i}
                items={this.state.data}
                lazyLoad={false}
                infinite={this.state.infinite}
                showBullets={this.state.showBullets}
                showThumbnails={this.state.showThumbnails}
                showIndex={this.state.showIndex}
                showNav={this.state.showNav}
                slideInterval={parseInt(this.state.slideInterval)}
                autoPlay={this.state.isPlaying}
                slideOnThumbnailHover={this.state.slideOnThumbnailHover}
            />
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('home-carousel'))