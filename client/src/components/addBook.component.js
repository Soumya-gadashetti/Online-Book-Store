import React, { Component } from "react";
import UserService from "../services/user.service";



export default class AddBook extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangePublisher = this.onChangePublisher.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.onChangeImage = this.onChangeImage.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.newBook = this.newBook.bind(this);

        this.state = {
            id: null,
            title: "",
            category: "",
            price: 0,
            quantity: 0,
            author: "",
            publisher: "",
            description: "",
            // productImage: "",
            // multerImage:DefaultImg,
            submitted: false
        };

    }//constructoe ends

    //Image
    //     setDefaultImage(uploadType){
    //         if(uploadType === "multer"){
    //             this.setState({
    //             multerImage:DefaultImg            
    // });
    //         }
    //     }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangePublisher(e) {
        this.setState({
            publisher: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    // onChangeImage(e) {
    //     this.setState({
    //         productImage: e.target.value
    //     });
    // }

    //Image
    // uploadImage(e,method){
    //     let imgObj ={};

    //     if(method === "multer"){
    //         let imageFormObj = new FormData();
    //         imageFormObj.append("imageName","multer-image-"+new Date().toISOString().replace(/:/g, "-"));
    //         imageFormObj.append("productImage",e.target.files[0]);

    //         this.setState({
    //             multerImage:URL.createObjectURL(e.target.files[0])
    //         });
    //     }
    // }

    saveBook() {
        var data = {
            title: this.state.title,
            category: this.state.category,
            price: this.state.price,
            quantity: this.state.quantity,
            author: this.state.author,
            publisher: this.state.publisher,
            description: this.state.description,
            // productImage: this.state.productImage
        };

        UserService.create(data)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    title: res.data.title,
                    category: res.data.title,
                    price: res.data.price,
                    quantity: res.data.quantity,
                    author: res.data.author,
                    publisher: res.data.publisher,
                    description: res.data.description,
                    // productImage: res.file.path,
                    submitted: true
                });
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
        console.log("added");
    }


    newBook() {
        // this.setstate = ({
        //     id: null,
        //     title: "",
        //     category: "",
        //     price: 0,
        //     quantity: 0,
        //     author: "",
        //     publisher: "",
        //     description: "",
        //     submitted: false
        // });
        // console.log("new add");
        this.props.history.push("/add");
        console.log("this works");
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newBook}>
                            Click on Add Products to add more books
                        </button>
                    </div>
                ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    name="title"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Category</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    required
                                    value={this.state.category}
                                    onChange={this.onChangeCategory}
                                    name="title"
                                >
                                    <option>Select a category</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="react">React</option>
                                    <option value="full stack developer">Full Stack Developer</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    required
                                    value={this.state.price}
                                    onChange={this.onChangePrice}
                                    name="price"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Quantity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quantity"
                                    required
                                    value={this.state.quantity}
                                    onChange={this.onChangeQuantity}
                                    name="quantity"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Author</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    required
                                    value={this.state.author}
                                    onChange={this.onChangeAuthor}
                                    name="author"
                                >
                                    <option >Select an auther</option>
                                    <option value="Soumya Gadashetti" >Soumya</option>
                                    <option value="Meena Chowdary">Meena Chowdary</option>
                                    <option value="Chetan Bhagat">Chethan Bhagat</option>

                                </select>

                            </div>

                            <div className="form-group">
                                <label htmlFor="title">publisher</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="publisher"
                                    required
                                    value={this.state.publisher}
                                    onChange={this.onChangePublisher}
                                    name="publisher"
                                />
                            </div>




                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    name="description"
                                />
                            </div>


                            <button onClick={this.saveBook} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
            </div>
        );
    }

}