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
        this.onChangeImage = this.onChangeImage.bind(this);
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
            file: "",
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

    onChangeImage(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

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
        // var data = {
        //     title: this.state.title,
        //     category: this.state.category,
        //     price: this.state.price,
        //     quantity: this.state.quantity,
        //     author: this.state.author,
        //     publisher: this.state.publisher,
        //     description: this.state.description,

        //     };
        const formData = new FormData();
        // formData.append('id', this.state.id);
        formData.append('title', this.state.title);
        formData.append('category', this.state.category);
        formData.append('price', this.state.price);
        formData.append('quantity', this.state.quantity);
        formData.append('author', this.state.author);
        formData.append('publisher', this.state.publisher);
        formData.append('description', this.state.description);
        formData.append('productImage', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        UserService.create(formData, config)
            .then(res => {
                // this.setState({
                alert("The file is successfully uploaded");
                //     title: res.formData.title,
                //     category: res.formData.title,
                //     price: res.formData.price,
                //     quantity: res.formData.quantity,
                //     author: res.formData.author,
                //     publisher: res.formData.publisher,
                //     description: res.formData.description,
                //     productImage: res.formData.productImage,
                //     submitted: true
                // });
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
                                <label htmlFor="category">Category</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    required
                                    value={this.state.category}
                                    onChange={this.onChangeCategory}
                                    name="category"
                                >
                                    <option>Select a category</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="react">React</option>
                                    <option value="full stack developer">Full Stack Developer</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
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
                                <label htmlFor="quantity">Quantity</label>
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
                                <label htmlFor="author">Author</label>
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
                                <label htmlFor="publisher">publisher</label>
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

                            <div className="form-group">
                                <label htmlFor="productImage">ProductImage</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="productImage"
                                    required
                                    value={this.state.productImage}
                                    onChange={this.onChangeImage}
                                    name="productImage"
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