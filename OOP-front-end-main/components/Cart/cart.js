import React, { useState } from 'react'
import styles from '../../styles/Cart/cart2.module.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
function Cart( items ) {
  console.log(items.item,'jhjh')
  const handleAddCart=async(id)=>{
    const config={
        egg : Cookies.get('password')
      
    }

    const [success, setSuccess] = useState(false)

   await axios.get(`http://localhost:9191/addToCart/${Cookies.get('id')}/${id}`, {headers: config}).then(res=>{
      if(res.data==null) {
        alert('Please Login')
        console.log('huhuh')
      }
      else{
        console.log(Cookies.get('password'))
        setSuccess(true)
        console.log(res.data);
      }

     
    })
    if(success==true){
      alert("added Successfully!")
      setSuccess(false)
    }
  }

  const handleDelete=async(id)=>{
    const config={
      token : Cookies.get('password')
    }

    await axios.delete(`http://localhost:9191/removeItem/${Cookies.get('id')}/${id}`, {headers :config}).then(res=>{
      if(res.data==null){
        alert('error')
      }
      
    })
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
        <Image src="/mac.jpg" width={250} height={150}></Image>
        </div>
        <div className={styles.name}>{items.item.item_name}</div>
        <div className={styles.name}>$ {items.item.price}</div>
        <div className={styles.name}>
          <div className={styles.edit} onClick={()=>{handleDelete(items.item.id)}}>Delete</div>
          <div className={styles.edit2}>{items.quantity_in_cart}</div>
          <div className={styles.edit} onClick={()=>{handleAddCart(items.item.id)}}>+</div>
        </div>
      </div>
    </>
  );
}

export default Cart