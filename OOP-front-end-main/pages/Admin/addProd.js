import React from "react";
import styles from "../../styles/Admin/AddProd.module.css";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function AddProd() {
  const router = useRouter();
  const [catt, setCatt] = useState(router.query);
  const [data, setData] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

      // function getCookie(pass) {
      //   let cookie = {};
      //   document.cookie.split(";").forEach(function (el) {
      //     let [key, value] = el.split("=");
      //     cookie[key.trim()] = value;
      //   });
      //   return cookie[pass];

  
  const[path,setPath] = useState('')

      const config = {
        headers: {
          token: Cookies.get("pass"),
        },
      };
  return (
    <>
      <div className={styles.back}>
        <Link href="/Admin/admin">Back</Link>
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.head1}>Add Categories</div>
          <div className={styles.inputs}>
            <div className={styles.right}>
              <div className={styles.inputs}>
                <div className={styles.block}>
                  <div className={styles.head}>Item Name</div>
                  <input
                    placeholder={data.item_name}
                    value={data.item_name}
                    name="item_name"
                    onChange={handleChange}
                    className={styles.input}
                  ></input>
                </div>
                <div className={styles.block}>
                  <div className={styles.head}>Price</div>
                  <input
                    placeholder={data.price}
                    value={data.price}
                    name="price"
                    onChange={handleChange}
                    className={styles.input}
                  ></input>
                </div>
              </div>
              <div className={styles.inputs}>
                <div className={styles.block}>
                  <div className={styles.head}>Offer</div>
                  <input
                    placeholder={data.offer}
                    value={data.offer}
                    name="offer"
                    onChange={handleChange}
                    className={styles.input}
                  ></input>
                </div>
                <div className={styles.block}>
                  <div className={styles.head}>Quantity Available</div>
                  <input
                    placeholder={data.qty_avlb}
                    value={data.qty_avlb}
                    name="qty_avlb"
                    onChange={handleChange}
                    className={styles.input}
                  ></input>
                </div>
              </div>
              <div className={styles.inputs}>
                <div className={styles.block}>
                  <div className={styles.head}>Description</div>
                  <input
                    placeholder={data.description}
                    value={data.description}
                    name="description"
                    onChange={handleChange}
                    className={styles.input}
                  ></input>
                </div>
                {/* <div className={styles.block}>
                  <div className={styles.head}>Item Name</div>
                  <input
                    placeholder={data.description}
                    value={data.description}
                    name="description"
                    className={styles.input}
                    onChange={handleChange}
                  ></input>
                </div> */}
              </div>
              {/* <div className={styles.block}>
                <div className={styles.head}>Category Name</div>
                <input
                  className={styles.input}
                  value={data.category.category_name}
                  name="name"
                onChange={(e) => {
                    data.category.category_name = e.target.value
                    setData({ ...data })
                    console.log(data)
                  }}
                />
              </div> */}
            </div>
          </div>
          <div
            className={styles.submit}
            onClick={async() => {
              console.log(catt);
              await axios.post(
                `http://localhost:9191/admin/items/add/${Object.keys(catt)}`,
                data, config
              ).then(res => {
                if (res == null) {
                  alert("Please Login First")
                  setPath('/Login')
                }
                else {
                  setPath('/Admin/admin')
                }
              });
            }}
          >
            <a
              href={path}
            >
              Add Product
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProd;
