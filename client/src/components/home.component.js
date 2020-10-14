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


                <div className="container mt-3">
                    <Switch>
                        <Route path={["/"]} component={BookList} />

                    </Switch>
                </div>


            </div>
        );
    }
}