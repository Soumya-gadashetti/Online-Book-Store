import React from "react";
import axios from "axios";
import { getUserName } from "../services/auth-header";
class ViewDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: []
        };
        this.goBack = this.goBack.bind(this);
        this.addToCartHandler = this.addToCartHandler.bind(this);
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        console.log(id);
        axios.get(`http://localhost:8080/api/books/${id}`).then((res) => {
            this.setState({
                books: res.data
            });
            console.log(res.data);
        })
            .catch(e => {
                console.log(e);
            });
    }

    addToCartHandler = (id) => {
        console.log(id);
        axios.post(
            `http://localhost:8080/cart/addBook?id=${id}&user=${getUserName()}`
        ).then((res) => {
            console.log("cart");
            console.log(res.data.message);
            if (res.data.message === true) {
                this.props.history.push(`/cart`);
            } else {
                this.setState({
                    message: `Unable to add to cart please try again later`,
                });
                alert(this.state.message);
            }
        });
    };

    goBack = () => {
        this.props.history.push("/");
    };

    render() {
        const { books } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            {/* <img src={carousel1} className="card-img-top" alt="..." /> */}
                            <div className="card-body">
                                {/* <p className="card-text "><strong>Book Id:</strong>&nbsp;{books.id}</p> */}
                                <p className="card-text "><strong>Book Title:</strong>&nbsp;{books.title}</p>
                                <p className="card-text"><strong>Book Category:</strong>&nbsp;{books.category}</p>
                                <p className="card-text"><strong>Book Price:</strong>&nbsp;{books.price}</p>
                                <p className="card-text"><strong>Book Author:</strong>&nbsp;{books.author}</p>

                                <p className="card-text"><strong>Book Publisher:</strong>&nbsp;{books.publisher}</p>
                                <p className="card-text"><strong>Book Description:</strong>&nbsp;{books.description}</p>
                                <button onClick={this.goBack}>Go back to products</button>
                                {/* <a className="btn btn-danger">Buy</a> */}
                                {/* <a class="btn btn-success float-right">Add to Cart</a> */}
                                <button onClick={() => this.addToCartHandler(books.id)}>Add to cart</button>

                                {/* <Link to="/cart" className="cart">Cart</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewDetails;