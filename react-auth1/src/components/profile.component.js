import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                {/* <header className="jumbotron">
                    <h3>
                        Welcome <strong>{currentUser.username}</strong>
                    </h3>
                </header> */}
                {/* <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p> */}
                {/* <p>
                    <strong>Id:</strong>{" "}
                    {currentUser.id}
                </p> */}
                <p>
                    <strong>UserName:</strong>{" "}
                    {currentUser.username}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                </p>
                <strong>User:</strong>
                <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        );
    }
}