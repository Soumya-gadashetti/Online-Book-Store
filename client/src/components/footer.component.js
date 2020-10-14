import React from "react";
//import { Button } from "../../Button";
import "./css/booklist.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";

class Footer extends React.Component {

    render() {
        return (
            <div className="footer-container">

                <section className="footer-subscription">
                    <p className="footer-subscription-heading">
                        Join our exclusive membership to receive the latest news and trends
            <p> The More You Read The more You Grow</p>
                    </p>
                </section>

                <div className="footer-links">
                    <div className="footer-link-wrapper">
                        <div className="footer-link-items">
                            <h2>About Us</h2>
                            <Link to="" >How it works</Link>
                            <Link to="" >Testimonials</Link>
                            <Link to="" >Privacy Policy</Link>
                            <Link to="" >Terms of Service</Link>
                        </div>
                        <div className="footer-link-items">
                            <h2>Contact Us</h2>
                            <Link to="" >Contact</Link>
                            <Link to="" >Support</Link>
                            <Link to="">Destinations</Link>
                            <Link to="" >CustomerSupport</Link>
                        </div>
                        <div className="footer-link-items">
                            <h2>SocialMedia</h2>
                            <Link to="" >Instagram</Link>
                            <Link to="">Facebook</Link>
                            <Link to="" >Youtube</Link>
                            <Link to="">Twitter</Link>
                        </div>
                    </div>
                </div>

                <section className="social-media">
                    <div className="social-media-wrap">
                        <div className="footer-logo">
                            <Link to={"#"} className="social-logo">
                                <GiBookshelf className="navbar-icon" />
                    PRO-BOOKS
                     </Link>
                        </div>
                        <div>
                            <small className="website-rights">PROBOOKS © 2020</small>
                        </div>
                        <div className="social-icons">
                            <Link
                                className="social-icon-link"
                                to={"//www.facebook.com"}
                                target="_blank"
                                aria-label="Facebook"
                            >
                                <FaFacebook />
                            </Link>
                            <Link
                                className="social-icon-link"
                                to={"//www.instagram.com"}
                                target="_blank"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </Link>
                            <Link
                                className="social-icon-link"
                                to={
                                    "//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber"
                                }
                                target="_blank"
                                aria-label="Youtube"
                            >
                                <FaYoutube />
                            </Link>
                            <Link
                                className="social-icon-link"
                                to={"//www.twitter.com"}
                                target="_blank"
                                aria-label="Twitter"
                            >
                                <FaTwitter />
                            </Link>
                            <Link
                                className="social-icon-link"
                                to={"//www.twitter.com"}
                                target="_blank"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }


}






export default Footer;