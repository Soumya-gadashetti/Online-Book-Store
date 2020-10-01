import React from "react";
//import Auth from "../../actions/authActions";
import Axios from "axios";

import { getUserName } from "../services/auth-header";
//import Navbar from "../layout/Navbar";
export default class Cart extends React.Component {
    state = {
        searchItem: "",
        display: true,
        result: [],
        message: "",
        totalPrice: 0,
    };
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            message: "",
            totalPrice: 0,
            displayCart: false,
        };
    }
    componentDidMount() {
        Axios.get(
            `http://localhost:8080/cart/getCartItems?user=${getUserName()}`
        ).then((res) => {
            if (res.data.message === true) {
                this.setState({ cartItems: res.data.cartItems }, () => {
                    let sum = 0;
                    this.state.cartItems.map((cartItem) => {
                        sum = sum + (cartItem.price);
                        console.log("SUm");
                        console.log(sum);
                        return sum;
                    });
                    //console.log(sum);
                    this.setState({ totalPrice: sum });
                    // console.log(this.state.totalAmount);
                });
            } else {
                this.setState({ message: res.data.message });
            }
        });
    }
    logoutHandler = () => {
        this.auth.logout();
    };

    decrementHandler = (id) => {
        console.log(id);
        Axios.post(
            `http://localhost:8080/cart/dec?id=${id}&user=${getUserName()}`
        ).then((res) => {
            console.log(res.data.message);
            if (res.data.message === true) {
                this.setState({ message: `decremented Successfully` });
                window.location.reload();
            } else {
                this.setState({
                    message: `Unable to do the action please try again later`,
                });
                alert(this.state.message);
            }
        });
    };
    incrementHandler = (id) => {
        console.log(id);
        Axios.post(
            `http://localhost:8080/cart/inc?id=${id}&user=${getUserName()}`
        ).then((res) => {
            console.log(res.data.message);
            if (res.data.message === true) {
                this.setState({ message: `increemented Successfully` });
                window.location.reload();
            } else {
                this.setState({
                    message: `Unable to do the action please try again later`,
                });
                alert(this.state.message);
            }
        });
    };
    deletecartItem = (id) => {
        console.log(id);
        Axios.post(
            `http://localhost:8080/cart/deleteBook?id=${id}&user=${getUserName()}`
        ).then((res) => {
            console.log(res.data.message);
            if (res.data.message === true) {
                this.setState({ message: `increemented Successfully` });
                window.location.reload();
            } else {
                this.setState({
                    message: `Unable to do the action please try again later`,
                });
                alert(this.state.message);
            }
        });
    };
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-lg-8">
                        <p className="ml-5 mt-5">
                            <p>
                                {" "}
                Pay faster for all your shopping needs{" "}
                                <span style={{ color: "red" }}>with Store Pay balance</span>
                                <br />
                Get Instant refund on cancellations | Zero payment failures
              </p>
                            <h3>Shopping Cart</h3>
                        </p>

                        <div className="col-xl-10 ml-5">
                            <table className="table table-bordered">
                                <thead>
                                    <th>Book Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Author</th>
                                    <th>Publisher</th>


                                    <th></th>
                                </thead>

                                {this.state.cartItems.map((cartItem, index) => {
                                    return (
                                        <tbody>
                                            <td>{cartItem.book.title}</td>
                                            <td>{cartItem.book.category}</td>
                                            <td>{cartItem.book.price}</td>
                                            <td>{cartItem.book.quantity}</td>
                                            <td>{cartItem.book.author}</td>
                                            <td>{cartItem.book.publisher}</td>

                                            <td style={{ width: "150px" }}>
                                                <div className="input-group">
                                                    <div class="input-group-prepend">
                                                        <span
                                                            className="input-group-text"
                                                            type="button"
                                                            onClick={() =>
                                                                this.decrementHandler(cartItem.book._id)
                                                            }
                                                        >
                                                            <b>-</b>
                                                        </span>
                                                    </div>

                                                    <input
                                                        type="text"
                                                        className="border-0 text-center "
                                                        value={cartItem.quantity}
                                                        style={{ width: "35px" }}
                                                    />
                                                    <div class="input-group-append">
                                                        <span
                                                            className="input-group-text"
                                                            type="button"
                                                            onClick={() =>
                                                                this.incrementHandler(cartItem.book._id)
                                                            }
                                                        >
                                                            <b>+</b>
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger "
                                                    type="button"
                                                    onClick={() => this.deletecartItem(cartItem.book._id)}
                                                >
                                                    <i
                                                        className="fa fa-trash"
                                                        aria-hidden="true"
                                                        style={{ margin: "0px" }}
                                                    ></i>
                                                </button>
                                            </td>
                                        </tbody>
                                    );
                                })}
                                <tbody>
                                    {" "}
                                    <td colspan="6" style={{ textAlign: "center" }}>
                                        total :{" "}
                                        <b className="text-danger">{this.state.totalPrice}</b>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="card-custom w-75 m-5 border">
                            <div className="card-title text-center mt-3 mb-3">
                                <i class="fa fa-shield " style={{ fontSize: "16px" }}>
                                    &nbsp; Part of your order qualifies for FREE Delivery.
                </i>
                            </div>
                            <div className="card-body card-custom-bg">
                                <div className="card-custom-bg">
                                    Subtotal ({this.state.cartItems.length} items) : ₹
                  <b>{this.state.totalPrice}</b>
                                </div>
                                <div class="form-check mt-2">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id="exampleCheck1"
                                    />
                                    <label class="form-check-label" for="exampleCheck1">
                                        <p>Donate 1 ₹ – Give a Little. Change a Lot</p>
                                    </label>
                                </div>
                                <button
                                    className="btn btn-custom-cartbuy form-control mt-4"
                                    type="button"
                                >
                                    Proceed to Buy
                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
