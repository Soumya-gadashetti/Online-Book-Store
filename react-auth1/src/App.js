import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Cart from "./components/cartcomponent";
// import FullstackBooksList from "./components/fullstackBooksList.component";
import AddBook from "./components/addBook.component";
// import BooksList from "./components/books-list.component";
// import Book from "./components/book.component";
class App extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        // contextType = BooksList;
        this.state = {
            // showModeratorBoard: false,
            books: [],
            showAdminBoard: false,
            currentUser: undefined,
            cart: [],
            searchTitle: ""
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
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

    logOut() {
        AuthService.logout();
    }

    render() {
        const { searchTitle, currentUser, showAdminBoard } = this.state;
        // const { cart } = this.context;
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Online Book Store
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                BookList
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to={"/books"} className="nav-link">
                                Books
              </Link>
                        </li> */}


                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                </Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/add"} className="nav-link">
                                    Add Products
                </Link>
                            </li>
                        )}

                        {/* search button */}
                        {/* <li>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={this.onChangeSearchTitle}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={this.searchTitle}
                                    >
                                        Search
                                </button>
                                </div>
                            </div>
                        </li> */}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link" onClick={this.logOut}>
                                    LogOut
                </a>
                            </li>
                        </div>
                    ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                </Link>
                                </li>
                            </div>
                        )}
                    <li className="nav-item">
                        {/* <span>{cart.length}</span> */}
                        <Link to={"/cart"} className="nav-link">
                            Cart
                            </Link>
                    </li>


                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {/* <Route exact path="/books" component={BooksList} />
                        <Route exact path="/books/:id" component={Book} /> */}
                        <Route exact path="/add" component={AddBook} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/user" component={BoardUser} />
                        {/* <Route path="/mod" component={BoardModerator} /> */}
                        <Route path="/admin" component={BoardAdmin} />
                        <Route path="/cart" component={Cart} />
                        {/* <Route path="/full" component={FullstackBooksList} /> */}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;