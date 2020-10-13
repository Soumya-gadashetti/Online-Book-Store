import React from "react";
//import Auth from "../../actions/authActions";
import Axios from "axios";

// import { getCurrentUser } from "../services/auth-header";
import AuthService from "../services/auth.service";
import { withRouter } from "react-router";
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
            currentUser: AuthService.getCurrentUser()
        };
        this.checkout = this.checkout.bind(this);

    }

    componentDidMount() {
        if (!this.state.currentUser) {
            this.props.history.push("/login");
        } else {

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
    }
    logoutHandler = () => {
        this.auth.logout();
    };

    checkout = () => {

        // browserHistory.push("/checkout");
        this.props.history.push("/checkout");
        console.log("this works");
    };

    decrementHandler = (id) => {
        console.log(id);
        Axios.post(
            `http://localhost:8080/cart/dec?id=${id}&username=${this.state.currentUser.username}`
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
            `http://localhost:8080/cart/inc?id=${id}&username=${this.state.currentUser.username}`
        ).then((res) => {
            console.log(res.data.message);
            if (res.data.message === true) {
                this.setState({ message: `incremented Successfully` });
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
            `http://localhost:8080/cart/deleteBook?id=${id}&username=${this.state.currentUser.username}`
        ).then((res) => {
            console.log(res.data.message);
            if (res.data.message === true) {
                this.setState({ message: `Deleted Successfully` });
                window.location.reload();
            } else {
                this.setState({
                    message: `Unable to do the action please try again later`,
                });
                alert(this.state.message);
            }
        });
    };

    error = () => {
        alert("Add more than 1 item to buy");
        this.props.history.push("/");
    }

    continueShopping = () => {
        this.props.history.push("/");
    }
    render() {
        const color = {
            color: 'black'
        }
        return (
            <div className="container-fluid">

                <div className="row">
                    <div>
                        <p className="ml-5 mt-5">

                            <h3 style={color}>Shopping Cart</h3>
                            <button className="btn btn-primary" style={{ width: "40%", marginLeft: "80%" }} onClick={this.continueShopping}>Continue Shopping</button>
                        </p>
                        {(!this.state.cartItems.length) ? <>
                            <h1>No Cart Items</h1>

                        </> :
                            <>
                                <div className="row" style={{ display: "flex" }}>
                                    <div className="col-12 ml-5" style={{ display: "flex" }}>
                                        <table className="table table-bordered">
                                            <thead style={color}>
                                                <th>Book Name</th>
                                                <th>Category</th>
                                                <th>Price</th>

                                                <th>Author</th>
                                                <th>Publisher</th>
                                                <th></th>
                                                {/* <th>Total</th> */}
                                                <th></th>

                                            </thead>

                                            {this.state.cartItems.map((cartItem, index) => {
                                                return (
                                                    <tbody style={color} key={index}>
                                                        <td>{cartItem.book.title}</td>
                                                        <td>{cartItem.book.category}</td>
                                                        <td>{cartItem.book.price}</td>

                                                        <td>{cartItem.book.author}</td>
                                                        <td>{cartItem.book.publisher}</td>


                                                        <td>
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
                                                        {/* <td><b style={color}>{this.state.totalPrice}</b></td> */}
                                                        <td>
                                                            <span
                                                                // className="btn btn-danger "

                                                                className="btn"
                                                                onClick={() => this.deletecartItem(cartItem.book._id)}
                                                            >
                                                                <i class="fa fa-trash"></i>
                                                            </span>
                                                        </td>

                                                    </tbody>
                                                );
                                            })}
                                            <tbody>
                                                {" "}
                                                <td colspan="6" className="text-light" style={{ textAlign: "center", color }}>

                                                    <b style={color}>Total ({this.state.cartItems.length} items) : ₹{this.state.totalPrice}</b>
                                                    {(this.state.totalPrice === 0) ?
                                                        <>
                                                            <button className="btn btn-custom-cartbuy btn-primary form-control mt-4"
                                                                style={color} type="button" onClick={this.error}>Buy Now</button>
                                                        </> : <>
                                                            <button
                                                                className="btn btn-custom-cartbuy btn-primary form-control mt-4"
                                                                type="button"
                                                                onClick={() => this.checkout()}
                                                            >
                                                                Buy Now
                                                                </button>
                                                        </>


                                                    }

                                                </td>
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </>}

                    </div>

                </div>

            </div>
        );
    }
}
