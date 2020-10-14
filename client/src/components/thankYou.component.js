import React from "react";
import Axios from "axios";
import "./css/thankyou.css";
import AuthService from "../services/auth.service";
class ThankYou extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            currentUser: AuthService.getCurrentUser()
        };

    }
    download() {
        window.print();
        alert("Thank you for shopping");
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
    render() {
        return (
            <div className="row">
                <div class="col-6">
                    <div class="card">
                        <div class="card-header">
                            <div class="d-inline h4">Order Details</div>
                            <div class="d-inline float-right"></div>
                        </div>
                        {this.state.cartItems.map((cartItem, index) => {
                            return (
                                <div class="card-body">
                                    <dl class="row">
                                        <dd class="col-sm-4">Title</dd>
                                        <dt class="col-sm-8">{cartItem.book.title}</dt>
                                        <dd class="col-sm-4">Price</dd>
                                        <dt class="col-sm-8">{cartItem.book.price}</dt>
                                    </dl>
                                    <hr />
                                </div>
                            );
                        })}
                        <dl class="row">
                            <dd class="col-sm-4">Discount</dd>
                            <dt class="col-sm-8">Yes</dt>
                            <dd class="col-sm-4">Total Price</dd>
                            <dt class="col-sm-8">{this.state.totalPrice} <br />
                                <button className="btn btn-success" onClick={this.download}>Print Invoice</button>
                            </dt>
                        </dl>
                    </div>
                </div>
                <div id="wrapper" class="col-6">
                    <h1>
                        <underline>Thank you!</underline>
                    </h1>
                    <h4>

                        <marquee behavior="scroll" direction="left"><b>For being such an awesome person.</b></marquee>
                    </h4>

                    <marquee behavior="scroll" direction="left"><b>Keep Shopping with us..</b></marquee>
                </div>

            </div>
        );
    }
}
export default ThankYou;