/**
 * Gallery Component
 * @author Gaston Briones briones.gaston@gmail.com
 * @version 1.0
 */
import React from 'react'
import ReactDOM from 'react-dom'
import ImageGallery from 'react-image-gallery'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            showIndex: true,
            slideOnThumbnailHover: false,
            showBullets: false,
            infinite: false,
            showThumbnails: false,
            showNav: true,
            slideInterval: 2000,
            images: props.items
        }
    }

    render() {
        return (
            <ImageGallery
                items={this.state.images}
                slideInterval={2000}
            />
        );
    }
}