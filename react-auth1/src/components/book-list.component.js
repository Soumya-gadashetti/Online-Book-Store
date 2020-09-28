import React, { Component } from "react";
// import BookDataService from "../services/book.service";
import axios from 'axios';
import { Link } from 'react-router-dom';
class BooksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            cart: []
        };

        this.addCart = this.addCart.bind(this);
        this.addC = this.addC.bind(this);
        // this.cart = this.cart.bind(this);
    }

    //New from old one
    addCart = (id) => {
        const { books, cart } = this.state;
        const data = books.filter(book => {
            return book._id === id
        })
        this.setState({ cart: [...cart, ...data] })

    }

    addC() {
        console.log("Cart");
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/books/g").then((res) => {
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
        )
    }
}

export default BooksList;


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
