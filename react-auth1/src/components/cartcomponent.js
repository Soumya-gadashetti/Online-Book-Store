import React, { Component } from "react";
// import BookDataService from "../services/book.service";
import axios from 'axios';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: []
        };


        // this.cart = this.cart.bind(this);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.cart.map((book, index) => {
                        return (

                            <div className="col-md-6">
                                <div className="card">
                                    {/* <img src={carousel1} className="card-img-top" alt="..." /> */}
                                    <div className="card-body" key={index}>
                                        <p className="card-text "><strong>Book Id:</strong>&nbsp;{book.id}</p>
                                        <p className="card-text "><strong>Book Title:</strong>&nbsp;{book.title}</p>
                                        <p className="card-text"><strong>Book Category:</strong>&nbsp;{book.category}</p>
                                        <p className="card-text"><strong>Book Price:</strong>&nbsp;{book.price}</p>
                                        <p className="card-text"><strong>Book Author:</strong>&nbsp;{book.author}</p>

                                        <p className="card-text"><strong>Book Publisher:</strong>&nbsp;{book.publisher}</p>
                                        <p className="card-text"><strong>Book Description:</strong>&nbsp;{book.description}</p>
                                        <a class="btn btn-danger">Buy</a>
                                        {/* <a class="btn btn-success float-right">Add to Cart</a> */}
                                        <button onClick={() => this.addCart(book._id)}>Add to cart</button>
                                        {/* <Link to="/cart" className="cart">Cart</Link> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        );
    }
}

export default Cart;