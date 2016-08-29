import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'

class CommentList extends React.Component {

    constructor() {
        super()
    }
    render() {
        let self = this;

        let publicationsNodes = this.props.data.map(function (publication, index) {
            var url = self.props.baseUrl + "/items/show/" + publication.id,
                style = {
                color: publication.flag
            }
            return (
                <div key={index} className={self.props.colClass || 'item col-12_sm-12'}>
                    <div className="item-border">
                        <h2 className="item-title"><a className="item-link" href={url}>{publication.title}</a></h2>
                        <p className="item-autor">
                            <i className="icon icon-user"/>
                            {publication.author}
                        </p>
                        <p className="item-autor">
                            <i className="icon icon-issn"/>
                            {publication.issn}
                        </p>
                        <p className="item-section">
                            <i className="icon icon-books"/>
                            {publication.section}
                        </p>
                        <i className="icon icon-flag" style={style}/>
                    </div>
                </div>
            );
        });

        return (
            <div className="col-12 grid-center">
                <div className="col-10_md-11 grid-spaceAround">
                    <div className="col-12_md-12_sm-12">
                        <h1 className="title">Resultados</h1></div>
                </div>
                <div className="col-10_md-11 explore-grid grid-spaceBetween">
                    {publicationsNodes}
                </div>
            </div>
        )
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            offset: 0
        }
    }

    _init(){
        var el = document.getElementById('result');
        ReactDOM.render(
            <App url={el.dataset['baseurl'] + '/services/publications'}
                 perPage={10} baseUrl={this.props.baseUrl}/>,
            el
        );
    }

    loadCommentsFromServer() {
        let self = this;
        var instance = Axios.create({
            headers: {
                "Access-Control-Allow-Origin": "http://localhost"
            }
        });

        instance.get(self.props.url, {params: {limit: self.props.perPage, offset: self.state.offset}}).then(function (response) {
            self.setState({
                data: response.data.publications,
                pageNum: Math.ceil(response.data.meta.total_count / response.data.meta.limit)
            });
        })
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);

        this.setState({offset: offset}, () => {
            this.loadCommentsFromServer();
        });
    };

    render() {
        return (
            <div className={"col-12 grid-center sort-" + this.props.sort}>
                <CommentList data={this.state.data} colClass={this.props.colClass} baseUrl={this.props.baseUrl}/>
                <ReactPaginate previousLabel={"«"}
                               nextLabel={"»"}
                               breakLabel={<a href="">...</a>}
                               pageNum={this.state.pageNum}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               clickCallback={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"}/>
            </div>
        );
    }
}


