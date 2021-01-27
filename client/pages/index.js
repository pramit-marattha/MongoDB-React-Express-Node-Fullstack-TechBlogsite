import React, { useState } from "react";
import LandingLayout from "../components/LandingPage/Layout";
import Layout from "../components/Layout";
import Link from "next/link";
import Swal from "sweetalert2";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import BookIcon from "@material-ui/icons/Book";

const Index = () => {
  return (
    <>
      <LandingLayout
        title={"Tech Blogsite"}
        MetaDescription="Welcome to the Tech blogsite a very easy and elegant way to create and to browse a blog which is built entirely on MERN stack.The frontend of this site is created using nextjs and reactjs.Express and node is running on the backend and MongoDb is used as an Database for storing blogs as well as  user profiles.Join now and create your very own blog without any hassle."
      >
        <div style={{ backgroundColor: "white" }}>
          <section className="hero">
            <div className="info-hero">
              <div className="color-bg-hero"></div>
              <div className="texto-hero">
                <div>
                  <span className="selectionNone">Tech Blogsite</span>
                </div>
                <div className="hero-title">
                  <h1>
                    "Tech Blogsite" <br />
                    Browse as well as create blogs related to various different
                    kind technologies.
                  </h1>
                </div>
                <p>Take your blogging skills to next level</p>
                <Link href="/signup">
                  <a className="button-transparent selectionNone">
                    <div>
                      Get Started <DoubleArrowIcon />
                    </div>
                  </a>
                </Link>
              </div>
              {/* <span className="hero-effect abstract-effect selectionNone">
						Tech Blogs
						</span> */}
              <span className="hero-effect code-effect selectionNone">
                Blogs
              </span>
            </div>
            <div className="services-side-pannel"></div>
            <div className="scroll-icon"></div>
          </section>
          <section
            id="aboutblog"
            style={{ backgroundColor: "#5cdb95" }}
            className="info-landing yellow"
          >
            <div className="text-info">
              <span>Tech Blogsite</span>
              <h1>About this blog</h1>
              <br />
              <br />
              <p className="texto-landing">
                Welcome to the "tech blogsite" a very easy and elegant way to
                create and to browse a blog which is built entirely on MERN
                stack. The frontend of this site is created using nextjs and
                reactjs. Express and node is running on the backend and MongoDb
                is used as an Database for storing blogs as well as user
                profiles. Join now and create your very own blog without any
                hassle.
              </p>
              <Link href="#HomePage">
                <a className="button-black selectionNone">
                  <div>
                    <ArrowDownwardIcon />
                  </div>
                </a>
              </Link>
            </div>
            <img
              className="selectionNone img-info-landing"
              src="/static/assets/svg/graphs.svg"
              alt="img"
            />
          </section>
          <section
            id="HomePage"
            style={{ backgroundColor: "#edf5e1" }}
            className="info-landing wrap-reverse"
          >
            <img
              className="selectionNone HomePage-img-landing"
              src="/static/assets/GirlWritingBlog.svg"
              alt="img"
            />
            <div className="text-info">
              <span>Tech Blogsite</span>
              <h1 className="disminuir">
                Premium blog content with absolutely no subscribtion fees.
              </h1>
              <br />
              <br />
              <p>
                Each of blogs are curated from a detailed study, so it is
                attractive as well as informative. As always, following the
                current technical requirements and standards of the industry.The
                main purpose of this blogsite is to impact the whole world by
                providing them free technical skills, information and knowledge
                about technologies completely for free.
              </p>
            </div>
          </section>

          <section
            id="design-box"
            style={{ backgroundColor: "#edf5e1" }}
            className="info-landing-tech-feature gray design-box"
          >
            <div className="text-info">
              <span>Tech Blogsite</span>
              <h1>Easy and Perfect User Interface</h1>
              <br />
              <br />
              <p>
                Polished and refined blogs.It's hard to look away when faced
                with a minimalist yet striking design such as this blogsite. The
                dark and smoky black background coupled with a striking glass
                transparent effect make this a winning color scheme, which makes
                this site very eye pleasing.
              </p>
              <Link href="/blogs">
                <a className="button-black selectionNone">
                  <div>
                    <BookIcon /> Blogs
                  </div>
                </a>
              </Link>
            </div>
            <img
              className="selectionNone img-info-landing img-design-box"
              src="/static/assets/svg/developer.svg"
              alt="img"
            />
          </section>
          <section id="quotes" className="frase info-landing">
            <img
              className="selectionNone"
              src="/static/assets/coding.svg"
              alt="Bill Gates"
            />
            <div className="texto-frase">
              <p>
                <strong>
                  “Those who are happiest are those who do the most for others.”
                </strong>
              </p>
              <br />
              <span>— Booker T. Washington</span>
            </div>
          </section>
          <section
            id="contacto"
            style={{ backgroundColor: "#edf5e1" }}
            className="info-landing gray wrap-reverse"
          >
            <img
              className="selectionNone img-info-landing"
              src="/static/assets/BlogPostBack.svg"
              alt="img"
            />
          </section>
        </div>
      </LandingLayout>
    </>
  );
};

export default Index;
