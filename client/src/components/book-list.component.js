import React, { Component } from "react";

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

                        <div className="card-deck col-lg-4">
                            <div className="card">
                                {/* <img src={carousel1} className="card-img-top" alt="..." /> */}
                                <div className="card-body" key={index}>

                                    <p className="card-text "><strong>Book Title:</strong>&nbsp;{book.title}</p>
                                    <p className="card-text"><strong>Book Category:</strong>&nbsp;{book.category}</p>
                                    <p className="card-text"><strong>Book Price:</strong>&nbsp;{book.price}</p>
                                    <p className="card-text"><strong>Book Author:</strong>&nbsp;{book.author}</p>

                                    <p className="card-text"><strong>Book Publisher:</strong>&nbsp;{book.publisher}</p>

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
                })

            }
        }
        else {
            return this.state.books.map((book, index) => {
                return (

                    <div className="col-md-6">
                        <div className="card">
                            {/* <img src={carousel1} className="card-img-top" alt="..." /> */}
                            <div className="card-body" key={index}>

                                <p className="card-text "><strong>Book Title:</strong>&nbsp;{book.title}</p>
                                <p className="card-text"><strong>Book Category:</strong>&nbsp;{book.category}</p>
                                <p className="card-text"><strong>Book Price:</strong>&nbsp;{book.price}</p>
                                <p className="card-text"><strong>Book Author:</strong>&nbsp;{book.author}</p>

                                <p className="card-text"><strong>Book Publisher:</strong>&nbsp;{book.publisher}</p>

                                {!currentUser ?
                                    <>
                                        <button onClick={this.goToLogin}>Add to cart</button>
                                        <button onClick={() => this.viewDetail(book.id)}>View Details</button>
                                    </> : <>
                                        <button onClick={() => this.addToCartHandler(book.id)}>Add to cart</button>
                                        <button onClick={() => this.viewDetail(book.id)}>View Details</button>
                                    </>

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

    render() {
        console.log(this.state);
        return (

            <div className="container">
                <input type="text" name="search" placeholder="Search by author,title and category" onChange={this.search} />&ensp;
                <div className="row">

                    {this.renderAllProducts()}
                </div>
            </div>
        )
    }
}




//     constructor(props) {
//         super(props);
//         this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
//         this.retrieveBooks = this.retrieveBooks.bind(this);
//         this.refreshList = this.refreshList.bind(this);
//         this.setActiveBook = this.setActiveBook.bind(this);
//         this.removeAllBooks = this.removeAllBooks.bind(this);
//         this.searchTitle = this.searchTitle.bind(this);

//         this.state = {
//             books: [],
//             currentBook: null,
//             currentIndex: -1,
//             searchTitle: ""
//         };
//     }

//     componentDidMount() {
//         this.retrieveBooks();
//     }

//     onChangeSearchTitle(e) {
//         const searchTitle = e.target.value;

//         this.setState({
//             searchTitle: searchTitle
//         });
//     }

//     retrieveBooks() {
//         BookDataService.getAll()
//             .then(response => {
//                 this.setState({
//                     books: response.data
//                 });
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     refreshList() {
//         this.retrieveBooks();
//         this.setState({
//             currentBook: null,
//             currentIndex: -1
//         });
//     }

//     setActiveBook(book, index) {
//         this.setState({
//             currentBook: book,
//             currentIndex: index
//         });
//     }

//     removeAllBooks() {
//         BookDataService.deleteAll()
//             .then(response => {
//                 console.log(response.data);
//                 this.refreshList();
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     searchTitle() {
//         BookDataService.findByTitle(this.state.searchTitle)
//             .then(response => {
//                 this.setState({
//                     books: response.data
//                 });
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     render() {
//         const { searchTitle, books, currentBook, currentIndex } = this.state;

//         return (
//             <div className="list row">
//                 <div className="col-md-8">
//                     <div className="input-group mb-3">
//                         <h3>Book List</h3>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search by title"
//                             value={searchTitle}
//                             onChange={this.onChangeSearchTitle}
//                         />
//                         <div className="input-group-append">
//                             <button
//                                 className="btn btn-outline-secondary"
//                                 type="button"
//                                 onClick={this.searchTitle}
//                             >
//                                 Search
//               </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     <h4>Books List</h4>

//                     <ul className="list-group">
//                         {books &&
//                             books.map((book, index) => (
//                                 <li
//                                     className={
//                                         "list-group-item " +
//                                         (index === currentIndex ? "active" : "")
//                                     }
//                                     onClick={() => this.setActiveTutorial(book, index)}
//                                     key={index}
//                                 >
//                                     {book.title}
//                                 </li>
//                             ))}
//                     </ul>

//                     <button
//                         className="m-3 btn btn-sm btn-danger"
//                         onClick={this.removeAllBooks}
//                     >
//                         Remove All
//           </button>
//                 </div>
//                 <div className="col-md-6">
//                     {currentBook ? (
//                         <div>
//                             <h4>Book</h4>
//                             <div>
//                                 <label>
//                                     <strong>Title:</strong>
//                                 </label>{" "}
//                                 {currentBook.title}
//                             </div>
//                             <div>
//                                 <label>
//                                     <strong>Description:</strong>
//                                 </label>{" "}
//                                 {currentBook.description}
//                             </div>
//                             {/* <div>
//                                 <label>
//                                     <strong>Status:</strong>
//                                 </label>{" "}
//                                 {currentTutorial.published ? "Published" : "Pending"}
//                             </div> */}

//                             <Link
//                                 to={"/books/" + currentBook.id}
//                                 className="badge badge-warning"
//                             >
//                                 Edit
//               </Link>
//                         </div>
//                     ) : (
//                             <div>
//                                 <br />
//                                 <p>Please click on a Book</p>
//                             </div>
//                         )}
//                 </div>
//             </div>
//         );
//     }
// }}
