import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel"
import co from '../images/co.jpeg';
import c2 from "../images/c2.jpg";
import c3 from "../images/c3.jpg";
import "./css/booklist.css";
class Carousel1 extends React.Component {
    render() {
        return (
            <body>
                <div className="jumbotron">


                    {/* <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={c3}
                            alt="First slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={c2}
                            alt="Third slide"
                        />


                    </Carousel.Item>

                </Carousel> */}
                </div>
            </body>
            // <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            //     <ol className="carousel-indicators">
            //         <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            //         <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            //         <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            //     </ol>
            //     <div className="carousel-inner">
            //         <div className="carousel-item active">
            //             <img className="d-block " style={{ width: "100%", height: "300px", backgroundSize: "cover", border: "1px solid white", opacity: "1" }} src={co} alt="First slide" />
            //             <div class="carousel-caption d-none d-md-block">
            //                 <h5>There is no such thing as too many books</h5>
            //                 <p><a className="btn explorebtn">Explore More</a></p>
            //             </div>
            //         </div>
            //         <div className="carousel-item">
            //             <img className="d-block " style={{ width: "100%", height: "300px", backgroundSize: "cover", border: "1px solid white", opacity: "0.8" }} src={c2} alt="Second slide" />
            //             <div class="carousel-caption d-none d-md-block">
            //                 <h5>...</h5>
            //                 <p>...</p>
            //             </div>
            //         </div>
            //         <div className="carousel-item">
            //             <img className="d-block " style={{ width: "100%", height: "300px", backgroundSize: "cover", border: "1px solid white", opacity: "0.8" }} src={c3} alt="Third slide" />
            //             <div class="carousel-caption d-none d-md-block">
            //                 <h5>...</h5>
            //                 <p>...</p>
            //             </div>
            //         </div>
            //     </div>
            //     <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            //         <span className="sr-only">Previous</span>
            //     </a>
            //     <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
            //         <span className="sr-only">Next</span>
            //     </a>
            // </div>

        );
    }
}

export default Carousel1;