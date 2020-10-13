import React, { Component } from "react";
import "./css/booklist.css";
import "./css/backround.css";
import Carousel1 from "./carousel.js";
import axios from 'axios';
import AuthService from "../services/auth.service";
export default class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            cart: [],
            BookList: [],
            currentUser: AuthService.getCurrentUser(),
            searchValue: ''
        };

        this.addToCartHandler = this.addToCartHandler.bind(this);
        this.viewDetail = this.viewDetail.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.renderAllProducts = this.renderAllProducts.bind(this);
        // this.cart = this.cart.bind(this);
    }

    //New from old one

    addC() {
        console.log("Cart");
    }

    componentWillMount() {

        this.getAllBooks()


    }

    // componentDidMount() {
    //     window.location.reload();
    // }

    getAllBooks = () => {
        console.log("get books");
        axios.get("http://localhost:8080/api/books/g").then((res) => {
            this.setState({
                books: res.data
            });
            console.log(res.data);
        })
            .catch(e => {
                console.log(e);
            });
        this.props.history.push("/")

    }

    search = (word) => {
        // this.setState({ sortedProducts: this.state.products.sort((a, b) => { return a.stock - b.stock }) })
        if (word.target.value === "") {
            this.getAllBooks()
        }
        this.setState({ searchValue: word.target.value })
        let values = this.state.books.filter(e => {
            return (e.title.toLocaleLowerCase().includes(word.target.value.toLocaleLowerCase())) ||
                (e.category.toLocaleLowerCase().includes(word.target.value.toLocaleLowerCase())) ||
                (e.author.toLocaleLowerCase().includes(word.target.value.toLocaleLowerCase()))
        })
        this.setState({ BookList: values })
    }

    renderAllProducts = () => {
        const { currentUser } = this.state;
        if (this.state.searchValue !== "") {
            if (this.state.BookList.length === 0) {
                return (
                    <h5>"Sorry ! No Such Book Found !"</h5>)
            }
            else {

                return this.state.BookList.map((book, index) => {
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
                })

            }
        }
        else {
            return this.state.books.map((book, index) => {
                return (

                    <div className="card-deck col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7">
                        <div id="card1" className="card mt-4">
                            {/* <img src={carousel1} className="card-img-top" alt="..." /> */}
                            <img src={`http://localhost:8080/${book.productImage}`} style={{ height: "100px" }} alt="book" />
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
            })


        }
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

    render() {
        console.log(this.state);

        return (

            <div className="container-fluid">
                <div id="marquee">
                    <marquee behavior="scroll" direction="left"><b>Welcome To Online Book Store</b></marquee>
                </div>
                <div className="container-fluid">
                    <div className="search" style={{ float: "center" }}>
                        <input type="text" style={{ marginLeft: "20%", marginBottom: "5%" }} name="search" placeholder="Search by author,title and category" onChange={this.search} />&ensp;
                    </div>



                    <Carousel1 />



                    {/* <div className="container-fluid">
                        <div className="row">
                            <div className="col-4">

                            </div>
                            <div className="col-8">
                                {this.renderAllProducts()}
                            </div>
                        </div>
                    </div> */}
                    <div className="row" style={{ marginLeft: "5%" }}>

                        {this.renderAllProducts()}
                    </div>
                </div>
                <footer className="bg-dark-custom fixed-bottom bg-dark">
                    <div className=" text-center text-muted">
                        <span> © 2020 Copyright: onlineBookStore.com</span>
                    </div>
                </footer>
            </div>


        )
    }
}




