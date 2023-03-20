import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Cards/card.module.css'
import { Detailed } from '../../Helper/detail';
import { useContext } from 'react';
import { loadprop } from '../../Helper/detail';
import Cookies from 'js-cookie';
import axios from 'axios';

function Card(data) {
    const { det, setDet } = useContext(Detailed)
    const {pro, setPro} = useContext(loadprop)

    const handleAddCart=async(id)=>{
      const config={
          token : Cookies.get('password')
        
      }

      if(Cookies.get('id')==undefined){
        alert('Login First')
      }

     await axios.get(`http://localhost:9191/addToCart/${Cookies.get('id')}/${id}`, {headers: config}).then(res=>{

        if(Cookies.get('id')==undefined){
          alert('Login First')
        }
        else if(res.data==null) {
          alert('Please Login')
          console.log('huhuh')
        }
        else{
          console.log(Cookies.get('password'))
          console.log(id)
          console.log(res.data);

        }
      }).catch(err=>{
        console.log(err)
      })
    }
  return (
    <>
      <div className={styles.container} key={data.id}>
        <div className={styles.img}>
          <Image src="/mac.jpg" width={250} height={150}></Image>
        </div>
        <div className={styles.info}>
          <div
            className={styles.name}
            onClick={() => {
              setDet(false)
              setPro({id : data.id, name: data.item_name, disc: data.description, cost: data.price})  
            //   setPro({...pro, disc : disc})  
            //   setPro({...pro, name : name})  
            //   setPro({...pro, cost : cost})  
            //     console.log(pro)
            }}
          >
            {data.item_name}
          </div>
          <div className={styles.disc}>{data.item_name}</div>
          <div className={styles.cost}>Cost: {data.price}</div>
          <div className={styles.paynow}>
            <div className={styles.buy2} onClick={()=>{handleAddCart(data.id)}}>Add to Cart</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card