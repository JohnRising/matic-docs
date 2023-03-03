import * as React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import { firstRow, secondRow, thirdRow, networkBanner } from "../data/features";
import SearchBar from '@theme-original/SearchBar'; // Import the SearchBar component

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function NetworkBanner({title, class_name, description, linkUrl, imageUrl}) {
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className={`banner d-flex ${ class_name }`}>
          <div className="icon-wrapper col-2">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="details col-10">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function FirstRow({ title, status, description, linkUrl, imageUrl }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (

    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="status">{status}</div>
          <div className="title">{title}</div>
          <div className="descriptions">{description}</div>
        </div>
      </Link>
    </div>

  );
}

function SecondRow({ title, status, description, linkUrl, imageUrl }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="status">{status}</div>
          <div className="title">{title}</div>
          <div className="descriptions">{description}</div>
        </div>
      </Link>
    </div>
  );
}

function ThirdRow({ title, status, description, linkUrl, imageUrl }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="status">{status}</div>
          <div className="title">{title}</div>
          <div className="descriptions">{description}</div>
        </div>
      </Link>
    </div>
  );
}

function BigBlock({title, status, description, linkUrl, imageUrl}) {
  return (
    <div className="col-md-12 p-8" style={{textAlign: 'center'}}>
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className="show-card">
          <div className="big-block-content">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
            <div className="text">
              <div className="status">{status}</div>
              <div className="title">{title}</div>
              <div className="descriptions">{description}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop
    });
  }
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout>
      <div className="bootstrap-wrapper">
        <br />
        <div className="container">
          <div className="row">
          <div className="index-page">
          <section className="section container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h1 className="mt-0"><a href="https://polygon.technology" class="landing-page-link">polygon</a> wiki</h1>
                <h3 className="mt-0"> The official documentation for <a href="https://polygon.technology" class="landing-page-link">0xPolygon</a></h3>
                <p className="lead">The <b>Polygon Wiki</b> is the source of truth for Polygon, providing comprehensive documentation, community resources, and guides for enthusiasts and developers interested in learning about or building on Polygon.</p>
                <a href="docs/home/new-to-polygon/" style={{ color: '#ffffff' }}>
                  <button className="btn btn-custom">Get started with Polygon</button>
                </a>
                <p className="lead">From its origins as a plasma chain, Polygon has evolved into a multichain powerhouse, providing developers and creators with the tools they need to build innovative, secure, and scalable blockchain solutions. Revolutionize how we interact with the world by building on and participating in the Polygon ecosystem.</p>
                <a href="#protocol-docs" onClick={(e) => { e.preventDefault(); smoothScrollTo('#protocol-docs'); }}><b>Find out more ↓</b></a>
              </div>
              <div className="col-lg-4 text-center pt-3 d-none d-lg-block">
                <img style={{ maxWidth: '100%', maxHeight: '400px' }} src="img/polygon-logo.png" />
              </div>
            </div>
          </section>
          </div>
            {firstRow &&
              firstRow.length &&
              firstRow.map((props, idx) => (
                <FirstRow key={idx} {...props} />
              ))}{" "}
          </div>

          <section id="protocol-docs" className="section container-fluid"></section>
          <div className="row">
            <div className="index-page">
              <section className="section container-fluid">
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <h3 className="mt-0">Scaling Blockchain for Millions</h3>
                    <p className="lead">By leveraging cutting-edge technologies like ZK cryptography and transaction rollups, Polygon is making blockchains more accessible and user-friendly than ever before and is at the forefront of mass adoption through various layer 2s and appchains.</p>
                  </div>
                </div>
              </section>
            </div>
            {secondRow &&
              secondRow.length &&
              secondRow.map((props, idx) => (
                <SecondRow key={idx} {...props} />
              ))}{" "}
          </div>

          <div className="row">
          <div className="index-page">
          <section className="section container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h3 className="mt-0">Explore the Endless Possibilities of Polygon</h3>
                <p className="lead">Polygon is an enterprise-ready blockchain platform that has emerged as the go-to solution for a growing number of businesses and development teams. With its scalable architecture, fast and low-cost transactions, and growing ecosystem, Polygon is the ideal platform for entrepreneurs, developers, and businesses alike to build and launch their blockchain solutions.</p>
                <p className="lead">Explore the documentation to learn more about how you can use Polygon to achieve your goals.</p>
                <a href="#polygon-use-cases" onClick={(e) => { e.preventDefault(); smoothScrollTo('#polygon-use-cases'); }}><b>Check it out ↓</b></a>
              </div>
              <div className="col-lg-4 text-center pt-3 d-none d-lg-block">
                <img style={{ maxWidth: '100%', maxHeight: '400px' }} src="img/polygon-build.png" />
              </div>
            </div>
          </section>
          </div>

          <section id="polygon-use-cases" className="section container-fluid"></section>
          <div className="row">
            {thirdRow &&
              thirdRow.length &&
              thirdRow.map((props, idx) => (
                <ThirdRow key={idx} {...props} />
              ))}{" "}
              </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
