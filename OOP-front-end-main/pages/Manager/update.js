import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from '../../styles/Admin/update.module.css'
import Cookies from 'js-cookie';


function Update() {
    const router = useRouter();
    const [data, setdata] = useState({...router.query})
    // const [up, setup] = useState({
    //     item_name: "",
    //     price: null
    // })

    const [cat, setCat] = useState()

    useEffect(()=>{
      setCat(data.id)
      console.log(data.id)
    })

    const handleChange = (e) => {
        e.preventDefault();
        setdata({ ...data, [e.target.name]: e.target.value })
        console.log(data)
        
    }

    const config = {
      headers : {
        token : Cookies.get("pass"),
      },
    };

  return (
    <>
      <div className={styles.back}>
        <Link href="/Manager/manager">Back</Link>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.image}></div>
          <div className={styles.item}>{data.item_name}</div>
        </div>
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
          {/* <div className={styles.inputs}>
            <div className={styles.block}>
              <div className={styles.head}>Category ID</div>
              <input
                placeholder={data.category}
                value={data.category}
                name="category.id"
                              onChange={(e) => {
                    data.category= e.target.value
                    setdata({...data})
                }}
              ></input>
            </div>
            <div className={styles.block}>
              <div className={styles.head}>Category Name</div>
              <input
                              placeholder={data.category.category_name}
                              value={data.category}
                              name="item_name"
                              onChange={(e) => {
                                  data.category= e.target.value
                                  setdata({ ...data })
                              }}
              ></input>
            </div> */}
          {/* </div> */}
        </div>
      </div>
      <div
        className={styles.Save}
        onClick={() => {
          console.log(data)
          axios.put(
            `http://localhost:9191/manager/items/update/${cat}`,
            data,
            config
          );
        }}
      >
        <a href={"/Manager/manager"}>Save Changes</a>
      </div>
    </>
  );
}

export default Update