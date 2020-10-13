import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()

        };

        this.editUser = this.editUser.bind(this);
    }

    editUser = (id) => {
        console.log(id);
    }
    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                <div className="col-md-6">
                    <div>
                        <label>
                            <strong>User Name:</strong>
                        </label>{" "}
                        {currentUser.username}
                    </div>

                    <div>
                        <label>
                            <strong> User Email:</strong>
                        </label>{" "}
                        {currentUser.email}
                    </div>
                </div>


                {/* <p>
                    <strong>UserName:</strong>{" "}
                    {currentUser.username}
                </p> */}
                {/* <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                </p> */}
                <Link
                    to={"/edit/" + currentUser.id}
                    className="badge badge-warning"
                >
                    Edit
              </Link>



            </div>
        );
    }
}


