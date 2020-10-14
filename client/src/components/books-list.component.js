import React, { Component } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import "./css/booklist.css"
export default class BooksList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveBooks = this.retrieveBooks.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBook = this.setActiveBook.bind(this);

        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            books: [],
            currentBook: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveBooks();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveBooks() {
        UserService.getAll()
            .then(res => {
                this.setState({
                    books: res.data
                });
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveBooks();
        this.setState({
            currentBook: null,
            currentIndex: -1
        });
    }

    setActiveBook(book, index) {
        this.setState({
            currentBook: book,
            currentIndex: index
        });
    }



    searchTitle() {
        UserService.findByTitle(this.state.searchTitle)
            .then(res => {
                this.setState({
                    books: res.data
                });
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { books, currentBook, currentIndex } = this.state;

        return (
            <div className="list row">

                <div className="col-md-6">
                    <h4>Books List</h4>

                    <ul className="list-group">
                        {books &&
                            books.map((book, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveBook(book, index)}
                                    key={index}
                                >
                                    <thead>
                                        <th>Title</th>
                                        <tb>&nbsp;&nbsp;&nbsp;{book.title}</tb>
                                    </thead>
                                    {/* <ul>
                                        <li> {book.title}</li>
                                    </ul> */}

                                    {/* <div className="col-md-6">
                                        <div className="card">
                                            
                                            <div className="card-body" key={index}>
                                               
                                                <p className="card-text "><strong>Book Title:</strong>&nbsp;{book.title}</p>
                                                <p className="card-text"><strong>Book Category:</strong>&nbsp;{book.category}</p>
                                                
                                            </div>
                                        </div>
                                    </div> */}
                                </li>
                            ))}
                    </ul>


                </div>
                <div className="col-md-6">
                    {currentBook ? (
                        <div>
                            <h4>Book</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentBook.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Category:</strong>
                                </label>{" "}
                                {currentBook.category}
                            </div>

                            <div>
                                <label>
                                    <strong>Price:</strong>
                                </label>{" "}
                                {currentBook.price}
                            </div>

                            <div>
                                <label>
                                    <strong>Quantity:</strong>
                                </label>{" "}
                                {currentBook.quantity}
                            </div>

                            <div>
                                <label>
                                    <strong>Author:</strong>
                                </label>{" "}
                                {currentBook.author}
                            </div>

                            <div>
                                <label>
                                    <strong>Publisher:</strong>
                                </label>{" "}
                                {currentBook.publisher}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentBook.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Image:</strong>
                                </label>{" "}
                                {currentBook.photo}
                            </div>

                            <Link
                                to={"/books/" + currentBook.id}
                                className="badge badge-warning"
                            >
                                Edit
              </Link>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Please click on a Book...</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}
