/**
 * GalleryPlayControl
 * @author Gaston Briones briones.gaston@gmail.com
 * @version 1.0
 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../components/home-carousel'
import Api from '../../api/'

export default class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            data: '',
        }
    }

    _processData(data) {
        const array = [];

        for (let value of data) {
            array.push({
                original: value.image.src,
                description: value.caption,
            });
        }
        return array;
    }

    componentDidMount() {
        Api.search('json/image-gallery.json').then(function (response) {
            var imgList = this._processData(response);
            this.setState({data: imgList});
        });
    }

    render() {
        return (
            <App items={this.state.data} />
        );
    }
}