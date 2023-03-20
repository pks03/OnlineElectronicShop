import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Auth/signup.module.css'

function Signup() {
    const [user, setUser] = useState({
        username: '',
        password: '',
        checkPassword: '',
        phonenumber: null,
        emailid: '',
        addressline1:'',
        addressline2:'',
        city: '',
        statees: '',
        country: '',
        pincode : null,
        roles : null,
        wallet_amt: 1000.00

    })

    const handleChange = (e) => {
        e.preventDefault()
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }
    const [match, setMatch] = useState(true)

    useEffect(() => {
        if (user.password != user.checkPassword) {
         setMatch(false)
        }
        else {
            setMatch(true)
        }
    }, [user.checkPassword])
    
    useEffect(() => {
        user.checkPassword = null
        setUser({...user})
    }, [user.password])
    
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.header}>Sign Up</div>
          <div className={styles.inputs}>
            <div className={styles.inputBlock}>
              <div className={styles.name}>UserName</div>
              <input
                className={styles.input}
                type="text"
                value={user.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBlock}>
              <div className={match ? styles.name : styles.name2}>Password</div>
              <input
                className={match ? styles.input : styles.input2}
                type="password"
                value={user.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBlock}>
              <div className={match ? styles.name : styles.name2}>
                Confirm Password
              </div>
              <input
                className={match ? styles.input : styles.input2}
                type="password"
                value={user.checkPassword}
                name="checkPassword"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBlock}>
              <div className={styles.name}>Phone Number</div>
              <input
                className={styles.input}
                type="text"
                value={user.phonenumber}
                name="phonenumber"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBlock}>
              <div className={styles.name}>Email</div>
              <input
                className={styles.input}
                type="email"
                value={user.emailid}
                name="emailid"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBlock}>
              <div className={styles.name}>Address Line 1</div>
              <input
                className={styles.input}
                type="email"
                value={user.addressline1}
                name="address.line"
                onChange={(e) => {
                  user.addressline1 = e.target.value;
                  setUser({ ...user });
                  console.log(user);
                }}
              />
            </div>
            <div className={styles.inputBlock}>
              <div className={styles.name}>Address Line 2</div>
              <input
                className={styles.input}
                type="text"
                value={user.addressline2}
                name="address.line2"
                onChange={(e) => {
                  user.addressline2 = e.target.value;
                  setUser({ ...user });
                }}
              />
            </div>
            <div className={styles.inputBlock2}>
              <div className={styles.left}>
                <div className={styles.inputbloc}>
                  <div className={styles.head}>City</div>
                  <input
                    type="text"
                    className={styles.input3}
                    value={user.city}
                    onChange={(e) => {
                      user.city = e.target.value;
                      setUser({ ...user });
                    }}
                  />
                </div>
                <div className={styles.inputbloc}>
                  <div className={styles.head}>State</div>
                  <input
                    type="text"
                    className={styles.input3}
                    value={user.statees}
                    onChange={(e) => {
                      user.statees = e.target.value;
                      setUser({ ...user });
                    }}
                  />
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.inputbloc}>
                  <div className={styles.head}>Country</div>
                  <input
                    type="text"
                    className={styles.input3}
                    value={user.country}
                    onChange={(e) => {
                      user.country = e.target.value;
                        setUser({ ...user });
                    }}
                  />
                </div>
                <div className={styles.inputbloc}>
                  <div className={styles.head}>Pincode</div>
                  <input
                    type="text"
                    className={styles.input3}
                    value={user.pincode}
                    onChange={(e) => {
                      user.pincode = e.target.value;
                      setUser({ ...user });
                    }}
                  />
                </div>
              </div>
                      </div>
                      <div className={styles.submit} onClick={()=>{
                        delete user.statees
                        delete user.checkPassword
                        console.log(user)
                        axios.post("http://localhost:9191/user/add",user);

                      }}>
                     <a href='/'>Submit</a></div>
                     <Link className={styles.login} href="/Login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup
