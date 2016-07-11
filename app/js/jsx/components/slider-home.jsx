import React from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-slick'
import Axios from 'axios'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            items: []
        }
        this._processData = this._processData.bind(this)
    }

    init(){
        ReactDOM.render(<App/>, document.getElementById('slider'))
    }

    _processData() {
        let self = this;
        const array = [];

        Axios.get('/services/featured').then(function (response) {

            for (let value of response.data) {
                array.push({
                    id: "/items/show/" + value.id,
                    title: value.title,
                    author: value.author,
                    section: value.section,
                    flag: value.flag
                });
            }

            self.setState({items: array});
        })
    }

    componentDidMount() {
        this._processData();
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {breakpoint: 768, settings: {slidesToShow: 1}}
            ]
        };
        return (
            <Slider {...settings}>
                {this.state.items.map(function (row, index) {
                    var style = {
                        color: row.flag
                    }
                    return <div key={index} className="item">
                        <div className="item-border">
                            <h2 className="item-title">{row.title}</h2>
                            <p className="item-autor">
                                <i className="icon icon-user"/>
                                {row.author}
                            </p>
                            <p className="item-section">
                                <i className="icon icon-books"/>
                                {row.section}
                            </p>
                            <i className="icon icon-flag" style={style}/>
                        </div>
                    </div>
                })}
            </Slider>
        );
    }
}

