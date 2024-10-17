"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productInputId, setProductInputId] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/1`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setProductInputId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productInputId || productInputId < 1) {
      setError("Please enter a valid Product ID.");
      return;
    }
    setLoading(true);
    setError(null);
    axios
      .get(`https://fakestoreapi.com/products/${productInputId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
        setProductInputId("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product. Please try again.");
        setLoading(false);
        setProductInputId("");
      });
  };

  return (
    <div className={styles.productPage}>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />

        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta
          property="og:url"
          content={`https://fakestoreapi.com/products/${
            productInputId !== "" ? productInputId : 1
          }`}
        />
        <meta property="og:site_name" content="Product Store" />
      </Head>
      <div className={styles.inputSection}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="productId" className={styles.label}>
            Enter Product ID:{" "}
          </label>
          <input
            type="number"
            id="productId"
            value={productInputId}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Enter product ID"
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : !product ? (
        <div>No product found</div>
      ) : (
        <div className={styles.productContainer}>
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
          </div>
          <div className={styles.detailsContainer}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h2>Price: ${product.price}</h2>
            <p>Rating: {product.rating.rate} / 5</p>
            <p>Rated by {product.rating.count} users</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
