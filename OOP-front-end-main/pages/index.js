import Card from '../components/cards/card'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Detailed } from '../Helper/detail'
import { loadprop } from '../Helper/detail'
import { use, useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {

  useEffect(()=>{
    axios.get("http://localhost:9191/shop").then(data=>{
      setList(data.data)
    })
  },[])

  const [list, setList] = useState([])

  const [det, setDet] = useState(true)
  
  const [pro, setPro] = useState({
    id: '',
    name: "",
    disc: "",
    cost: "",
  });
 
  return (
    <loadprop.Provider value={{pro, setPro}}>
    <Detailed.Provider value={{ det, setDet }}>
      {det ? (
        <>
          <div className={styles.container}>
            {list.map((data) => {
              return (
                <>
                  <div className={styles.card}>
                    <Card {...data}/>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
          <>
            <div className={styles.back} onClick={() => { setDet(true) }}>Back</div>
              <div className={styles.cont}>
                <div className={styles.image}>abc</div>
                <div className={styles.details}>
                  <div className={styles.name}>{pro.name}</div> 
                  <div className={styles.lower}># {pro.disc}</div> 
                  <div className={styles.lower}> # {pro.disc}</div> 
                  <div className={styles.lower}># {pro.disc}</div> 
                  <div className={styles.cost}>{pro.cost}</div> 
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
  );
}
