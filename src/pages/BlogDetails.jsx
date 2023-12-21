import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";

import { useParams, useNavigate } from "react-router-dom";
import blogData from "../assets/data/blogData.js";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";

import commentImg from "../assets/all-images/ava-1.jpg";
import { useAuth } from "../components/Auth/AuthContext.jsx";
import "../styles/blog-details.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogData.find((blog) => blog.title === slug);
  const history = useNavigate();
  const auth = useAuth();
  const [comment, setComment] = useState("");


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!auth.isLoggedIn) {
      // Redirect to the login page if the user is not logged in
      history.push("/login");
      return;
    }

    // Your logic to handle the comment submission
    // For demonstration purposes, let's assume you have an API function to post a comment
    // Replace this with your actual API call or database operation
    postCommentToServer(comment);

    // Clear the comment field after submission
    setComment("");
  };

  const postCommentToServer = (comment) => {
    // Your logic to post the comment to the server
    console.log("Comment posted:", comment);
    // Here, you can make an API call or perform any action to save the comment
  };


  return (
    <Helmet title={blog.title}>
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8">
              <div className="blog__details">
                <img src={blog.imgUrl} alt="" className="w-100" />
                <h2 className="section__title mt-4">{blog.title}</h2>

                <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="blog__author">
                    <i className="ri-user-line"></i> {blog.author}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i> {blog.date}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i> {blog.time}
                  </span>
                </div>

                <p className="section__description">{blog.description}</p>
                <h6 className="ps-5 fw-normal">
                  <blockquote className="fs-4">{blog.quote}</blockquote>
                </h6>
                <p className="section__description">{blog.description}</p>
              </div>

              <div className="comment__list mt-5">
                <h4 className="mb-5">1 Comment</h4>

                <div className="single__comment d-flex gap-3">
                  <img src={commentImg} alt="" />
                  <div className="comment__content">
                    <h6 className=" fw-bold">David Visa</h6>
                    <p className="section__description mb-0">14 July, 2023</p>
                    <p className="section__description">
                      Good job, very helpful article
                    </p>

                    <span className="replay d-flex align-items-center gap-1">
                      <i className="ri-reply-line"></i> Reply
                    </span>
                  </div>
                </div>

                {/* =============== comment form ============ */}
                <div className="leave__comment-form mt-5">
                  <h4>Leave a Comment</h4>
                  <p className="section__description">
                    {auth.isLoggedIn
                      ? "Leave a comment below:"
                      : "You must sign in to make or comment a post"}
                  </p>

                  <Form onSubmit={handleFormSubmit}>
                    <FormGroup className=" d-flex gap-3">
                      <Input type="text" placeholder="Full name" value={auth.isLoggedIn ? auth.user.fullName : ""}
                        readOnly={auth.isLoggedIn} />
                      <Input type="email" placeholder="Email" value={auth.isLoggedIn ? auth.user.email : ""}
                        readOnly={auth.isLoggedIn} />
                    </FormGroup>

                    <FormGroup>
                      <textarea
                        rows="5"
                        className="w-100 py-2 px-3"
                        placeholder="Comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                    </FormGroup>

                    <button className="btn comment__btn mt-3">
                      Post a Comment
                    </button>
                  </Form>
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="recent__post mb-4">
                <h5 className=" fw-bold">Recent Posts</h5>
              </div>
              {blogData.map((item) => (
                <div className="recent__blog-post mb-4" key={item.id}>
                  <div className="recent__blog-item d-flex gap-3">
                    <img src={item.imgUrl} alt="" className="w-25 rounded-2" />
                    <h6>
                      <Link to={`/blogs/${item.title}`}>{blog.title}</Link>
                    </h6>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BlogDetails;
