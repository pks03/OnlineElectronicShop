import axios from "axios";
import Cookies from 'js-cookie'
import Link from "next/link";
import React from "react";
import { useState } from "react";
import styles from "../../styles/Admin/addcat.module.css";

function AddCat() {
  const [data, setData] = useState("");
    const [path, setPath] = useState('/Login')

    const handleChange = (e) => {
        e.preventDefault();
        setData({ [e.target.name]:e.target.value})
        console.log(data)
    }

    const config = {
      headers: {
        token: Cookies.get("pass"),
      },
    };

  return (
    <>
      <div className={styles.back}>
        <Link href="/Manager/manager">Back</Link>
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.head}>Add Categories</div>
          <div className={styles.inputs}>
            {/* <div className={styles.inputbox}>
              <div className={styles.name}>Category ID</div>
              <input
                className={styles.input}
                value={data.id}
                name="id"
                onChange={handleChange}
              />
            </div> */}
            <div className={styles.inputbox}>
              <div className={styles.name}>Category Name</div>
              <input
                className={styles.input}
                value={data.category_name}
                name="category_name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            className={styles.submit}
            onClick={async() => {
              console.log(data);
              const lel = "http://localhost:9191/manager/categories/add";
            await   axios.post(lel, data, config).then(res => {
              if (res == null) {
                alert('Please login first')
                // setPath('/Login')
              }
              else {
                setPath("/Manager/manager");
              }
            }).catch((err) => {
                console.log(err, data);
              });
            }}
          >
          
            <Link
              href={{
                pathname: '/Manager/manager',
                query: true,
              }}
            >
              {" "}
              Add Category
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCat;
