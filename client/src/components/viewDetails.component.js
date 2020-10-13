import React from "react";
import axios from "axios";
import "./css/booklist.css";
import AuthService from "../services/auth.service";
class ViewDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            currentUser: AuthService.getCurrentUser(),
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
            `http://localhost:8080/cart/addBook?id=${id}&username=${this.state.currentUser.username}`
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div id="card1" className="card">
                            <div class="card-horizontal" style={{ display: "flex", flex: "1 1 auto" }}>
                                <div class="img-square-wrapper">
                                    <img src={`http://localhost:8080/${books.productImage}`} style={{
                                        marginTop: "20%",
                                        marginLeft: "10%",
                                        height: "auto",
                                        width: "100%",
                                        padding: "10px",
                                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                        alignItems: "center",
                                    }} alt="book" />
                                </div>
                                <div class="card-body" style={{ marginLeft: "10%" }}>
                                    <h2 id="view" style={{ color: "Black", fontWeight: "bold", fontSize: "30px" }}>{books.title}</h2>
                                    <p style={{ color: "blue", fontWeight: "bold", fontSize: "30px" }}>$:{books.price}.00</p>
                                    <hr />
                                    <p style={{ color: "grey" }}>falls under&nbsp;<strong style={{ fontSize: "15px", fontWeight: "bold", color: "black" }}>"{books.category}"</strong>&nbsp;category</p>
                                    <p style={{ color: "grey" }}>written by&nbsp;<strong style={{ fontSize: "15px", fontWeight: "bold", color: "black" }}>"{books.author}"</strong></p>
                                    <p style={{ color: "grey" }}>published by&nbsp;<strong style={{ fontSize: "15px", fontWeight: "bold", color: "black" }}>"{books.publisher}"</strong></p>
                                    <hr />
                                    <p className="card-text">&nbsp;<strong>{books.description}</strong></p>
                                    <p className="button-horizontal" style={{ display: "flex", flex: "1 1 auto" }}>
                                        <button className="fill" onClick={this.goBack}>Go back</button>

                                        <button className="fill" onClick={() => this.addToCartHandler(books.id)}>Add to cart</button>
                                    </p>
                                </div>

                            </div>
                            {/* <div className="card-body">
                                <img src={`http://localhost:8080/${books.productImage}`} style={{
                                    height: "225px",
                                    width: "170px",
                                    alignItems: "center",
                                }} alt="book" />
                 
                                <p className="card-text "><strong>Book Title:</strong>&nbsp;{books.title}</p>
                                <p className="card-text"><strong>Book Category:</strong>&nbsp;{books.category}</p>
                                <p className="card-text"><strong>Book Price:</strong>&nbsp;{books.price}</p>
                                <p className="card-text"><strong>Book Author:</strong>&nbsp;{books.author}</p>

                                <p className="card-text"><strong>Book Publisher:</strong>&nbsp;{books.publisher}</p>
                                <p className="card-text"><strong>Book Description:</strong>&nbsp;{books.description}</p>
                                <button className="fill" onClick={this.goBack}>Go back</button>
                                
                                <button className="fill" onClick={() => this.addToCartHandler(books.id)}>Add to cart</button>

                               
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewDetails;