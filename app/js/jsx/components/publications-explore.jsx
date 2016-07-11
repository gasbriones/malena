import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'

class CommentList extends React.Component {

    constructor() {
        super()
    }

    _sortByCell() {
        ReactDOM.render(
            <App url={'/demos/malena/dist/mocs/publications-home.json'}
                 perPage={6} colClass={'item col-6'}/>,
            document.getElementById('explore')
        )
    }

    _sortByCol() {
        ReactDOM.render(
            <App url={'/demos/malena/dist/mocs/publications-home.json'}
                 perPage={6} colClass={'item col-12'}/>,
            document.getElementById('explore')
        )
    }

    render() {
        let self = this;
        let publicationsNodes = this.props.data.map(function (publication, index) {
            var  url = "/items/show/" + publication.id,
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
                    <div className="col-6_md-4_sm-12">
                        <h1 className="title">Explorar publicaciones</h1></div>
                    <div className="col-6_md-8_sm-12">
                        <ul className="sort">
                            <li>
                                <ul className="sort-style">
                                    <li>
                                        <select>
                                            <option>Ordenar por</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                        </select>
                                    </li>
                                    <li>
                                        <button className="btn-img" onClick={this._sortByCell}>
                                            <img src="themes/malena/images/sort-icon-grid.png"/></button>
                                    </li>
                                    <li>
                                        <button className="btn-img" onClick={this._sortByCol}>
                                            <img src="themes/malena/images/sort-icon-column.png"/></button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
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
        this._init();
    }

    _init(){
        ReactDOM.render(
            <App url={'/services/publications'}
                 perPage={6}/>,
            document.getElementById('explore')
        );
    }


    loadCommentsFromServer() {
        let self = this;

        Axios.get(self.props.url, {limit: self.props.perPage, offset: self.state.offset}).then(function (response) {
            console.log(response);
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
            <div className="col-12 grid-center">
                <CommentList data={this.state.data} colClass={this.props.colClass}/>
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


