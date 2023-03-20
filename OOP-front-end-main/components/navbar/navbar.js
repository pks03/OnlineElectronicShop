import React, { useEffect } from 'react'
import logo from '../../public/Innovfide.png'
import Image from 'next/image'
import styles from '../../styles/Navbar/navbar.module.css'
import { useState } from 'react'
import { props } from "../../Helper/detail";
import Link from 'next/link'
import { Log } from '../../Helper/detail'
import axios from 'axios'
import Cookies from 'js-cookie'

function Navbar() {

  useEffect(()=>{
    axios.get("http://localhost:9191/getCategories").then((res) => {
      setListt(res.data);
      
    });
  })
  const [on, setOn] = useState(0)
  const [logged, setLogged] = useState(true)
    const [list,setListt] = useState([]);

        const [listt, setList] = useState({
          id: "",
          name: "",
          disc: "",
          cost: "",
        });
  
  const [log, setLog] = useState(false)
  const [boo, setboo] = useState(false)

  return (
    <>
      <props.Provider value={{ listt, setList }}>
        <div className={styles.main}>
          <div className={styles.inner}>
            {list.map((data) => {
              return data.img ? (
                <>
                  <div className={styles.img} key={data.id}>
                    <Image src={logo} width={90} height={17} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={on == data.id ? styles.navOn : styles.nav}
                    key={data.id}
                    onClick={() => {
                      setOn(data.id);
                      setboo(!boo)
                      /*call api and get the list */
                      /*add the list to the listt hook which will change it globally*/
                    }}
                  >
                    <Link href={{pathname:'/products',
                      query : {dataa : data.id, bool : !boo} 
                    }}>{data.category_name}</Link>
                  </div>
                </>
              );
            })}
          </div>
          <Log.Provider value={{ log, setLog }}>
            {Cookies.get('id')==undefined ? (
              <>
                <div className={styles.login} onClick={() => {
                  setLog(!log)
                console.log(log)}}>
                  <a href="/Login">Login</a>
                </div>
              </>
            ) : (
                <>
                  <Link className={styles.login} href="/Carts">Cart</Link>
                  <a className={styles.login2} href="/" onClick={()=>{
                    Cookies.remove('password')
                    Cookies.remove('emailid')
                    Cookies.remove('username')
                    Cookies.remove('id')
                  }}>Logout</a>
                </>
            )}
          </Log.Provider>
        </div>
      </props.Provider>
    </>
  );
}

export default Navbar