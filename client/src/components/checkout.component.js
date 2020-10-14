import React, { Component } from "react";
import Axios from "axios";
import "../App.css";
import AuthService from "../services/auth.service";
// import pay from "../images/pay.jpg";

// const validcard = RegExp(
//     /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
// );
// const validmmyyyy = RegExp(/^((0[1-9])|(1[0-2]))\/((2009)|(20[1-2][0-9]))$/);
// const validcvv = RegExp(/^[0-9]{3}$/);
// const fname = RegExp(/^[a-zA-Z]+( [a-zA-Z]+)+$/);
// const lname = RegExp(/^[a-zA-Z]+( [a-zA-Z]+)+$/);
const validateForm = (errors) => {
    let valid = true;
    // Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};
export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            cardNumber: "",
            expityMonth: "",
            fname: "",
            lname: "",
            cvCode: "",
            totalAmount: 0,
            errors: {
                cardNumber: "",
                expityMonth: "",
                cvCode: "",
                fname: "",
                lname: ""
            },
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        // const { id, value } = event.target;
        // let errors = this.state.errors;
        // switch (id) {
        //     case "fname":
        //         errors.fname = fname.test(value) ? "" : "fname is not valid!";
        //         break;
        //     case "lname":
        //         errors.lname = lname.test(value) ? "" : "lname is not valid!";
        //         break;
        //     case "cardNumber":
        //         errors.cardNumber = validcard.test(value) ? "" : "Card is not valid!";
        //         break;
        //     case "expityMonth":
        //         errors.expityMonth = validmmyyyy.test(value)
        //             ? ""
        //             : "mm/yyyy is not valid!";
        //         break;
        //     case "cvCode":
        //         errors.cvCode = validcvv.test(value) ? "" : "CVV is not valid!";
        //         break;
        //     default:
        //         break;
        // }

        // this.setState({ errors, [id]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info("Valid Form");
            this.props.history.replace("/thankYou");
        } else {
            console.error("Invalid Form");
        }
    };
    // orderhandler = () => {
    //   this.props.history.push("/orders");
    // };
    componentDidMount() {

        Axios.get(
            `http://localhost:8080/cart/getCartItems?username=${this.state.currentUser.username}`
        ).then((res) => {
            console.log(this.state.currentUser.username);
            if (res.data.message === true) {
                this.setState({ cartItems: res.data.cartItems }, () => {
                    let sum = 0;
                    this.state.cartItems.map((cartItem) => {
                        // console.log(cartItem.book.price);
                        sum = sum + (cartItem.book.price * cartItem.quantity);

                        return sum;
                    });

                    // console.log(sum);
                    this.setState({ totalPrice: sum });
                    // console.log(this.state.totalAmount);
                });
            } else {
                this.setState({ message: res.data.message });
            }
        });
    }
    render() {
        //console.log(this.state.totalAmount);
        // const { errors } = this.state;
        return (
            <div className="container content">
                <div className="row ">
                    <div className="col-8">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3><strong style={{ color: "black" }}>
                                    Fill out your Details to pay<hr></hr>
                                </strong>
                                </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="fname">First Name</label>
                                                <div className="col-12">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fnam"
                                                        placeholder="first name"
                                                        required
                                                        onChange={this.handleChange}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 ">
                                            <div className="form-group">
                                                <label htmlFor="lname">Last Name</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="lname"
                                                    placeholder="last name"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="enter correct email "
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <div className="input-group">
                                            <textarea

                                                className="form-control"
                                                id="address"
                                                placeholder="Enter your full address "
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-group-inline">
                                                <label htmlFor="city">City</label>
                                                <div className="col-12 pl-ziro">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="city"
                                                        placeholder="city"
                                                        required
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 ">
                                            <div className="form-group">
                                                <label htmlFor="state">State</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="state"
                                                    placeholder="state"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4 ">
                                            <div className="form-group">
                                                <label htmlFor="pin">Pin Code</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="pin"
                                                    placeholder="pin code"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">CARD NUMBER</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cardNumbe"
                                                placeholder="xxxx xxxx xxxx xxxx"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group-inline">
                                                <label htmlFor="endate">EXPIRY DATE</label>
                                                <div className="col-12 pl-ziro">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="endate"
                                                        placeholder="mm/yyyy"
                                                        required
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 ">
                                            <div className="form-group">
                                                <label htmlFor="cvCode">CVV CODE</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="cvCod"
                                                    placeholder="CVV"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="submit">
                                        <button className="btn btn-success btn-lg btn-block">
                                            Pay Rs.{this.state.totalPrice}
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <p>hey</p>

                    </div>
                    {/* <div className="col-4 mt-5 mr-0">
                        <img src={pay} alt="security" />
                    </div> */}
                </div>
            </div>
        );
    }
}
