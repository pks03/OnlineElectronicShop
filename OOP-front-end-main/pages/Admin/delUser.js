import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import styles from '../../styles/Admin/delcat.module.css'
import Cookies from 'js-cookie'

function delCat() {
    const [data, setData] = useState('')

    const handleChange = (e) => {
        e.preventDefault();
        setData({ [e.target.name]:e.target.value})
        console.log(data)
    }
    const config = {
      headers: {
        token : Cookies.get('pass')
      }
    }
  return (
    <>
      <div className={styles.back}>
        <Link href="/Admin/admin">Back</Link>
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.head}>Delete User</div>
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
              <div className={styles.name}>User Id</div>
              <input
                className={styles.input}
                value={data.id}
                name="id"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.submit} onClick={() => {
            console.log(data)
            const lel = `http://localhost:9191/admin/user/delete/${Object.values(data)}`
            axios.delete(lel, config).catch(err=>{console.log(err, data)});
          }}><Link
                          href={{
                            pathname: "/Admin/admin",
                            query: false,
                          }}
          > Delete User
          </Link></div>
        </div>
      </div>
    </>
  );
}

export default delCat