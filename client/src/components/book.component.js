//This is book component
import React, { Component } from "react";
import UserService from "../services/user.service";

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangePublisher = this.onChangePublisher.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.onChangePhoto = this.onChangePhoto.bind(this);
        this.getBook = this.getBook.bind(this);
        // this.updatePublished = this.updatePublished.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            currentBook: {
                id: null,
                title: "",
                category: "",
                price: 0,
                quantity: 0,
                author: "",
                publisher: "",
                description: "",
                // photo: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getBook(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBook: {
                    ...prevState.currentBook,
                    title: title
                }
            };
        });
    }

    onChangeCategory(e) {
        const category = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                category: category
            }
        }));
    }


    onChangePrice(e) {
        const price = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                price: price
            }
        }));
    }

    onChangeQuantity(e) {
        const quantity = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                quantity: quantity
            }
        }));
    }

    onChangeAuthor(e) {
        const author = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                author: author
            }
        }));
    }
    onChangePublisher(e) {
        const publisher = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                publisher: publisher
            }
        }));
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                description: description
            }
        }));
    }

    // onChangePhoto(e) {
    //     const photo = e.target.value;

    //     this.setState(prevState => ({
    //         currentBook: {
    //             ...prevState.currentBook,
    //             photo: photo
    //         }
    //     }));
    // }

    getBook(id) {
        UserService.get(id)
            .then(res => {
                this.setState({
                    currentBook: res.data
                });
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }



    updateBook() {
        UserService.update(
            this.state.currentBook.id,
            this.state.currentBook
        )
            .then(res => {
                console.log(res.data);
                this.setState({
                    message: alert("The Book got updated successfully")
                });
            })

            .catch(e => {
                console.log(e);
            });
        this.props.history.push("/books")
    }

    deleteBook() {
        UserService.delete(this.state.currentBook.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    message: alert("The Book got deleted successfully")

                });

            })
            .catch(e => {
                console.log(e);
            });
        this.props.history.push('/books')
    }

    goBack() {
        this.props.history.push('/books');
    }
    render() {
        const { currentBook } = this.state;

        return (
            <div>
                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={this.goBack}
                >
                    Go Back
            </button>
                {currentBook ? (
                    <div className="edit-form">
                        <h4>Book</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentBook.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    value={currentBook.category}
                                    onChange={this.onChangeCategory}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    value={currentBook.price}
                                    onChange={this.onChangePrice}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Quantity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quantity"
                                    value={currentBook.quantity}
                                    onChange={this.onChangeQuantity}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    value={currentBook.author}
                                    onChange={this.onChangeAuthor}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Publisher</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="publisher"
                                    value={currentBook.publisher}
                                    onChange={this.onChangePublisher}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentBook.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            {/*  */}

                            {/* <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentTutorial.published ? "Published" : "Pending"}
                            </div> */}
                        </form>

                        {/* {currentTutorial.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(true)}
                                >
                                    Publish
                                </button>
                            )} */}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteBook}
                        >
                            Delete
            </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateBook}
                        >
                            Update
            </button>


                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
            </div>
        );
    }
}
