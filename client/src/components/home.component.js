import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BookList from "./book-list.component.js";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
        this.allBook = this.allBook.bind(this);
        this.allCss = this.allCss.bind(this);
        this.allHtml = this.allHtml.bind(this);
        this.authorSoumya = this.authorSoumya.bind(this);
    }

    allBook() {
        this.props.history.push("/book");
    }

    allCss() {
        this.props.history.push("/css");
    }

    allHtml() {
        this.props.history.push("/html");
    }

    authorSoumya() {
        this.props.history.push("/soumya");
    }

    render() {
        return (
            <div>
                {/* <nav className="navbar navbar-expand  ">

                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <button onClick={this.allBook}>All Category Books</button>
                        </li>

                        <li className="nav-item">
                            <button onClick={this.allCss}>CSS Books</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={this.allHtml}>HTML Books</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={this.authorSoumya}>Author Soumya</button>
                        </li>





                    </div>
                </nav> */}

                <div className="container mt-3">
                    <Switch>
                        <Route path={["/"]} component={BookList} />

                    </Switch>
                </div>


            </div>
        );
    }
}