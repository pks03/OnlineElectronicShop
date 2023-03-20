import React, { use } from "react";
import styles from '../styles/AddWell.module.css'
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export default function AddWallet(){
    const [waller, setWallet] = useState();
    
    const config={
        headers:{
          token : Cookies.get('password')
        }
      }
    return(
        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.input}>
                        <div className={styles.head}>Add Wallet Amount</div>
                        <input className={styles.inputs} value={waller} name='waller' onChange={(e)=>{
                            setWallet(e.target.value)
                        }}></input>
                    </div>
                    <div className={styles.btn} onClick={()=>{
                        axios.post(`http://localhost:9191/add/wallet`, {amt_to_add : waller, username: Cookies.get('username'), password: Cookies.get('password'), phonenumber: 7897879, emailid: Cookies.get('emailid')}, config).then(res=>{
                            console.log(res)
                        })
                    }}><a href="/">Add Money</a></div>
                </div>
            </div>

        </>
    )
}