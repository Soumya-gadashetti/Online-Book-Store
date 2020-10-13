import React, { Component } from "react";
import axios from "axios";


export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            content: ""
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/get/user").then((res) => {
            this.setState({
                users: res.data
            });
            console.log(res.data);
        })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th>User Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        {this.state.users.map((user, index) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                </tbody>


                            )
                        })}
                    </table>
                </header>
            </div>
        );
    }
}

