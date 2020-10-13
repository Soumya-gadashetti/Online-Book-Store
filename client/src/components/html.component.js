import React, { Component } from "react";
// import BookDataService from "../services/book.service";
// import { getCurrentUser } from "../services/auth-header";
import axios from 'axios';
import AuthService from "../services/auth.service";
export default class HtmlBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            cart: [],
            currentUser: AuthService.getCurrentUser()
        };

        this.addToCartHandler = this.addToCartHandler.bind(this);
        this.viewDetail = this.viewDetail.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.goBack = this.goBack.bind(this);
        // this.cart = this.cart.bind(this);
    }

    //New from old one

    addC() {
        console.log("Cart");
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/books/category?category=html").then((res) => {
            this.setState({
                books: res.data
            });
            console.log(res.data);
        })
            .catch(e => {
                console.log(e);
            });
    }



    addToCartHandler = (id) => {
        console.log(id);
        axios.post(
            `http://localhost:8080/cart/addBook?id=${id}&username=${this.state.currentUser.username}`
        ).then((res) => {
            console.log(this.state.currentUser.username);
            console.log(res.data.message);
            // if (this.state.currentUser.username === '') {
            //     this.props.history.push('/login');
            // }
            if (res.data.message === true) {
                this.props.history.push(`/cart`);
            } else {
                this.setState({
                    message: `Unable to add to cart please try again later`,
                });
                alert(this.state.message);
            }
        });
    };

    viewDetail = (id) => {
        console.log(id);
        this.props.history.push(`/view/${id}`);
    };

    goToLogin() {
        this.props.history.push('/login');
    }

    goBack() {
        this.props.history.push("/");
    }

    render() {
        console.log(this.state);
        const { currentUser } = this.state;
        return (

            <div className="container">
                <button onClick={this.goBack}>Go Back</button>
                <div className="row">
                    {this.state.books.map((book, index) => {
                        return (

                            <div className="card-deck col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7">
                                <div id="card1" className="card mt-4">
                                    <img src={`http://localhost:8080/${book.productImage}`}
                                        className="card-img-top mx-auto"
                                        style={{
                                            height: "225px",
                                            width: "170px",
                                            alignItems: "center",
                                        }} alt="book" />
                                    <div className="card-body" key={index}>

                                        <p className="card-text font-weight-bolder "><span style={{ fontSize: '15px' }}>{book.title}</span></p>
                                        <p className="card-text"><strong>Book Price:$</strong>&nbsp;{book.price}</p>

                                        {!currentUser ?
                                            <div className="card-footer">
                                                <button className="fill" onClick={this.goToLogin}>Cart</button>
                                                <button className="fill" onClick={() => this.viewDetail(book.id)}>View</button>
                                            </div> : <div className="card-footer">
                                                <button className="fill" onClick={() => this.addToCartHandler(book.id)}>Cart</button>
                                                <button className="fill" onClick={() => this.viewDetail(book.id)}>View</button>
                                            </div>

                                        }
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




