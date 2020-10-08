import React, { Component } from "react";
// import BookDataService from "../services/book.service";
// import { getCurrentUser } from "../services/auth-header";
import axios from 'axios';
import AuthService from "../services/auth.service";
export default class AuthorSoumya extends Component {
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
        axios.get("http://localhost:8080/api/books/author?author=soumya").then((res) => {
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
            `http://localhost:8080/cart/addBook?id=${id}&user=${this.state.currentUser.username}`
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

                            <div className="col-md-6" key={index}>
                                <div className="card">
                                    {/* <img src={carousel1} className="card-img-top" alt="..." /> */}
                                    <div className="card-body" key={index}>
                                        {/* <p className="card-text "><strong>Book Id:</strong>&nbsp;{book.id}</p> */}
                                        {/* <img src={book.productImage} alt="book"></img> */}
                                        {/* <p className="card-text "><strong>Book Title:</strong>&nbsp;{book.productImage}</p> */}
                                        <p className="card-text "><strong>Book Title:</strong>&nbsp;{book.title}</p>
                                        <p className="card-text"><strong>Book Category:</strong>&nbsp;{book.category}</p>
                                        <p className="card-text"><strong>Book Price:</strong>&nbsp;{book.price}</p>
                                        <p className="card-text"><strong>Book Author:</strong>&nbsp;{book.author}</p>

                                        <p className="card-text"><strong>Book Publisher:</strong>&nbsp;{book.publisher}</p>
                                        {/* <p className="card-text"><strong>Book Description:</strong>&nbsp;{book.description}</p> */}
                                        {/* <a className="btn btn-danger">Buy</a> */}
                                        {/* <a class="btn btn-success float-right">Add to Cart</a> */}
                                        {!currentUser ?
                                            <>
                                                <button onClick={this.goToLogin}>Add to cart</button>
                                                <button onClick={() => this.viewDetail(book.id)}>View Details</button>
                                            </> : <>
                                                <button onClick={() => this.addToCartHandler(book.id)}>Add to cart</button>
                                                <button onClick={() => this.viewDetail(book.id)}>View Details</button>
                                            </>

                                        }

                                        {/* <Link to="/cart" className="cart">Cart</Link> */}
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




