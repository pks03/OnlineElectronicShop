import React, { use, useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/Auth/login.module.css'
import Link from 'next/link'
import axios from 'axios'
import Cookies from 'js-cookie'

function Login() {
    const [user, setUser] = useState({
        name: '',
        password: '',
        role:''
    })

    const handleChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }
  const [on, setOn] = useState(0)
  
  const [log, setLogged] = useState(false)

  const [url, setUrl] = useState('')

  // function setCookie(cName, cValue, expDays) {
  //   let date = new Date();
  //   date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  //   const expires = "expires=" + date.toUTCString();
  //   document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  // }
    const handleClick = async (id) => {
      console.log(id)
        if (id == 1) {
            setUser({...user, role:'user'})

            await axios.post("http://localhost:9191/login", {username: user.name, password: user.password}).then(res=>{
              if(res==null){
                alert('Incorrect Username/Password')
                setLogged(false)
              }
              else{
                setLogged(true)
                console.log(res.data)
                Cookies.set('username', res.data.username)
                Cookies.set('id', res.data.id)
                Cookies.set('emailid', res.data.emailid)
                Cookies.set('password', res.data.password)
                Cookies.set('wallet', res.data.wallet_amt)
              }
            })
        }
        if (id == 2) {
          setUser({ ...user, role: 'Admin' })
         

           await axios.post("http://localhost:9191/admin/login", {password : user.password}).then(res=>{
              console.log(res.data)
              if (!res) {
                alert('Invalid Id/Password')
                setLogged(false)
              }
              else{
                const pass = res.data;
                setLogged(true);
                Cookies.set('pass', res.data)
              }
              if (log) {
                console.log('ahahs')
                return redirect("/Admin/admin")
                setUrl('/Admin/admin')
              }
              else {
                setUrl('')
              }
            })
  
        


        }
        if (id == 3) {
            user.role = "Manager"
            setUser({...user})
            console.log('shjahjshjahsjahsjhjas')

            await axios.post("http://localhost:9191/manager/login" , {password: user.password}).then(res=>{
              
                console.log('nais')
                Cookies.set('pass', res.data)
              
            })
        }

      // axios.post("http://localhost:9191/login", user);
        
        console.log(user)
    }
    let id=0;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.header}>
            <div className={styles.tit}>Login</div>
            <div className={styles.roles}>
              <div
                className={on == 1 ? styles.roleOn : styles.role}
                onClick={() => {
                  user.role = "User";
                  setUser({ ...user });
                  console.log(user);
                  setOn(1);
                }}
              >
                {" "}
                user
              </div>
              <div
                className={on == 2 ? styles.roleOn : styles.role}
                onClick={() => {
                  user.role = "admin";
                  setUser({ ...user });
                  console.log(user);
                  setOn(2);
                }}
              >
                {" "}
                Admin
              </div>
              <div
                className={on == 3 ? styles.roleOn : styles.role}
                onClick={() => {
                  user.role = "Manager";
                  setUser({ ...user });
                  console.log(user);
                  setOn(3);
                }}
              >
                {" "}
                Manager
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.inputblock}>
                <div className={styles.title}>UserName</div>
                <input
                  type="text"
                  value={user.name}
                  name="name"
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputblock}>
                <div className={styles.title}>Password</div>
                <input
                  type="password"
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          <div className={styles.submit} onClick={()=>{handleClick(on)}}>
            Submit
          </div>
          <div className={styles.signup}>
            <Link href="/signUp">Don't have an account? SignUp</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login