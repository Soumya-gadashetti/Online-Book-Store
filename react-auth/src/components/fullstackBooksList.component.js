import React, { Component } from "react";
// import BookDataService from "../services/book.service";

import axios from 'axios';

export default class FullstackBooksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: []
        };
    }
    componentDidMount() {
        axios.get("http://localhost:8080/api/books/fullstack").then((res) => {
            this.setState({
                books: res.data
            });
            console.log(Response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }



    render() {
        console.log(this.state);
        return (

            <div className="container">
                <div className="row">
                    {this.state.books.map((book, index) => {
                        return (

                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="card">
                                    {/* <img src={carousel1} className="card-img-top" alt="..." /> */}
                                    <div className="card-body" key={index}>
                                        <p className="card-text font-weight-bold">{book.title}</p>
                                        <p className="card-text">{book.category}</p>
                                        <p className="card-text">{book.price}</p>
                                        <p className="card-text">{book.author}</p>

                                        <p className="card-text">{book.publisher}</p>
                                        <p className="card-text">{book.description}</p>
                                        <a class="btn btn-danger">Buy</a>
                                        <a class="btn btn-success float-right">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}


