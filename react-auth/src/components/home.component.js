import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/user.service";
import BooksList from "./book-list.component.js";
import FullstackBooksList from "./fullstackBooksList.component";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    // componentDidMount() {
    //     UserService.getPublicContent().then(
    //         response => {
    //             this.setState({
    //                 content: response.data
    //             });
    //         },
    //         error => {
    //             this.setState({
    //                 content:
    //                     (error.response && error.response.data) ||
    //                     error.message ||
    //                     error.toString()
    //             });
    //         }
    //     );
    // }

    // render() {
    //     return (
    //         <div className="container">
    //             <header className="jumbotron">
    //                 <h3>{this.state.content}</h3>
    //             </header>
    //         </div>
    //     );
    // }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand  ">

                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/books"} className="nav-link">
                                All Category Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/fullstack"} className="nav-link">
                                Full Stack Developer Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/react"} className="nav-link">
                                Reack Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/java"} className="nav-link">
                                Java Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/css"} className="nav-link">
                                CSS Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/html"} className="nav-link">
                                HTML Books
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
              </Link>
                        </li> */}
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route path={["/", "/books"]} component={BooksList} />
                        <Route path="/fullstack" component={FullstackBooksList} />
                        {/* <Route path={["/react"]} component={ReactBooksList} />
                        <Route path={["/java"]} component={JavaBooksList} />
                        <Route path={["/css"]} component={CssBooksList} />
                        <Route path={["/html"]} component={HtmlBooksList} /> */}
                        {/* <Route exact path="/add" component={AddTutorial} />
                        <Route path="/books/:id" component={Tutorial} /> */}
                    </Switch>
                </div>
            </div>
        );
    }
}
