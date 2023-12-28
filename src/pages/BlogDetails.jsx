import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import { useParams } from "react-router-dom";
import blogData from "../assets/data/blogData.js";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commentImg from "../assets/all-images/ava-1.jpg";
import axios from 'axios';
import "../styles/blog-details.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogData.find((blog) => blog.title === slug);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [randomComment, setRandomComment] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchComments();
    fetchRandomComment();
  }, [blog]);

  const fetchComments = async () => {
    try {
      // Make a request to get comments for the specific blog post
      const response = await axios.get('http://127.0.0.1:5555/comments');
      // Update the comments state with the fetched comments
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchRandomComment = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5555/comments');
      const randomIndex = Math.floor(Math.random() * response.data.length);
      const randomComment = response.data[randomIndex];
      setRandomComment(randomComment);
    } catch (error) {
      console.error('Error fetching random comment:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: name,
        email: email,
        comment: comment
      };

      const response = await axios.post('http://127.0.0.1:5555/comments', formData);

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      setName('');
      setEmail('');
      setComment('');
    } catch (error) {
      toast.error('Failed to post comment', {
        position: toast.POSITION.TOP_CENTER
      });
    }
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
                <h4 className="mb-4">{comments.length} Comment(s)</h4>

                {/* Show only one comment initially */}
                {!showAllComments && randomComment && (
                  <div key={randomComment.id} className="single__comment d-flex gap-3">
                    <img src={commentImg} alt="" />
                    <div className="comment__content">
                      <h6 className="fw-bold">{randomComment.name}</h6>
                      <p className="section__description">{randomComment.comment}</p>
                      <p className="section__description mb-0">{randomComment.date}</p>
                      <span className="replay d-flex align-items-center gap-1">
                        <i className="ri-reply-line"></i> Reply
                      </span>
                    </div>
                  </div>
                )}

                {/* Button to show/hide all comments */}
                <button className="btn comment__btn mt-3 mb-3" onClick={() => setShowAllComments(!showAllComments)}>
                  {showAllComments ? 'Show Less Comments' : 'Show All Comments'}
                </button>

                {/* Show rest of the comments if the button is clicked or always */}
                {(showAllComments || !randomComment) && comments.map((comment) => (
                  <div key={comment.id} className="single__comment d-flex gap-3">
                    <img src={commentImg} alt="" />
                    <div className="comment__content">
                      <h6 className="fw-bold">{comment.name}</h6>
                      <p className="section__description">{comment.comment}</p>
                      <p className="section__description mb-0">{comment.date}</p>
                      <span className="replay d-flex align-items-center gap-1">
                        <i className="ri-reply-line"></i> Reply
                      </span>
                    </div>
                  </div>
                ))}
              </div>


              {/* =============== comment form ============ */}
              <div className="leave__comment-form mt-5">
                <h4>Leave a Comment</h4>
                <p className="section__description">Leave a comment below:</p>

                <Form onSubmit={handleFormSubmit}>
                  <FormGroup className=" d-flex gap-3">
                    <Input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
      <ToastContainer />
    </Helmet>
  );
};

export default BlogDetails;
