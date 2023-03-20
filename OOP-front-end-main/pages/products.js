import React, { useEffect } from 'react'
import { Detailed } from "../Helper/detail";
import { loadprop } from "../Helper/detail";
import { props } from '../Helper/detail';
import Card from '../components/cards/card';
import { useState } from "react";
import { useRouter } from 'next/router';
import styles from '../styles/prods.module.css'
import axios from 'axios';
function Products() {
      const [det, setDet] = useState(true);
      const [pro, setPro] = useState({
      });
      const router =useRouter();
      const [id, setid] = useState([{...router.query}])

      const params= new URLSearchParams(window.location.search)
    useEffect(()=>{
      console.log(params.get('bool'))
      axios.get(`http://localhost:9191/shop/category/${params.get('dataa')}`).then(
        data=>{
          setList(data.data)
          console.log(data.data)

        }
      )
    },[params.get('dataa')])
    const [list, setList] = useState([{
    }]);
  return (
    <>
      {/* <props.Provider value={{ listt, setList }}> */}
        <loadprop.Provider value={{ pro, setPro }}>
          <Detailed.Provider value={{ det, setDet }}>
            {det ? (
              <>
                <div className={styles.container}>
                  { Array.isArray(list) ? (
                    <>
                  {list.map((data) => {
                    return (
                      <>
                        <div className={styles.card}>
                          <Card {...data} />
                        </div>
                      </>
                    );
                  
                    })}
                    </>):(<></>)}
                </div>
              </>
            ) : (
              <>
                <div
                  className={styles.back}
                  onClick={() => {
                    setDet(true);
                  }}
                >
                  Back
                </div>
                <div className={styles.cont}>
                  <div className={styles.image}>abc</div>
                  <div className={styles.details}>
                    <div className={styles.name}>{pro.item_name}</div>
                    <div className={styles.lower}># {pro.description}</div>
                    <div className={styles.lower}> # {pro.description}</div>
                    <div className={styles.lower}># {pro.description}</div>
                    <div className={styles.cost}>{pro.price}</div>
                    <div className={styles.pay}>
                      <div className={styles.buy}>Buy Now</div>
                      <div className={styles.buy2}>Add to cart</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Detailed.Provider>
        </loadprop.Provider>
      {/* </props.Provider> */}
    </>
  );
}

export default Products