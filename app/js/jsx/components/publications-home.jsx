import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'

class CommentList extends React.Component {
    render() {
        let commentNodes = this.props.data.map(function (comment, index) {
            return (
                <div key={index} className="item col-6">
                    <div className="item-border">
                        <h2 className="item-title">{comment.username}</h2>
                        <p className="item-autor">
                            <i className="icon icon-user"/>
                            {comment.comment}
                        </p>
                        <p className="item-section">
                            <i className="icon icon-books"/>
                            {comment.comment}
                        </p>
                    </div>
                </div>
            );
        });

        return (
            <div className="grid-spaceBetween">
                {commentNodes}
            </div>
        );
    }
}
;

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            offset: 0
        }
    }

    loadCommentsFromServer() {
        let self = this;

        // Set config defaults when creating the instance
        var instance = Axios.create({
            headers: {
                "Access-Control-Allow-Origin":"http://localhost"
            }
        });

        instance.get(this.props.url,{limit: this.props.perPage, offset: this.state.offset}).then(function (response) {
            self.setState({
                data: response.data.comments,
                pageNum: Math.ceil(response.data.meta.total_count / response.data.meta.limit)
            });
        })
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);

        this.setState({offset: offset}, function () {
            this.loadCommentsFromServer();
        });
    };

    render() {
        return (
            <div className="commentBox">
                <CommentList data={this.state.data}/>
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
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

ReactDOM.render(
    <App url={'http://localhost:3000/comments'}
         perPage={5}/>,
    document.getElementById('react-paginate')
);
