import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import Cart from '../components/Cart/cart'
import styles from '../styles/Cart/cart.module.css'

function Carts() {
  const config={
    headers:{
      token : Cookies.get('password')
    }
  }
  useEffect(()=>{

    axios.get(`http://localhost:9191/cart/user/${Cookies.get('id')}`, config).then(res=>{
      console.log(res.data, 'hhh')
      setData(res.data)
    })
    setRefresh(false);
    handleSum();
  },[])
    const [data, setData] = useState([]);

    const [sum, setSum] = useState();

    const [refresh, setRefresh] = useState(false)
    function handleSum(){
      console.log('ahhhh')
       axios.get(`http://localhost:9191/cartvalue/${Cookies.get('id')}`, config).then(res=>{
        console.log(res.data, 'ad')
        setSum(res.data)
      })
      console.log(wall, 'jkjk')
        }

        const [wall, setWall] = useState(Cookies.get('wallet'))
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.carts}>
            {data.map((data) => {
              return <Cart {...data} />;
            })}
          </div>
        </div>
        <div className={styles.totalSum}>
          Total Sum : {sum}
        </div>
        <div className={styles.wal}>
          <div className={styles.balance}>
            Wallet balance : {wall}
          </div>
          <div className={styles.addWallet}>
            <Link href="/AddWallet">
            Add Money
            </Link>
            </div>
        </div>
        <div className={styles.check} onClick={()=>{
          axios.get(`http://localhost:9191/addOrder/${Cookies.get('id')}`, config)
          .then(res => {
            if(res.status >= 200 && res.status < 300) alert('Order Placed Succesfully')
          })
          .catch(err => alert(err))

          axios.delete(`http://localhost:9191/order/${Cookies.get('id')}`, config).then(res=>{
            console.log(res.data)
          })

          setRefresh(true)
        }}>
          CheckOut
        </div>
      </div>
    </>
  );
}

export default Carts