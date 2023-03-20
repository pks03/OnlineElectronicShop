import React, { use, useEffect, useState } from "react";
import styles from "../../styles/Admin/admin.module.css";
import { Updat } from "../../Helper/detail";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookieParser } from "next/dist/server/api-utils";
import Cookies from "js-cookie";

function Admin() {
  const router = useRouter();
  const [reload, setReload] = useState({ ...router.query });

  // function getCookie(pass) {
  //   let cookie = {};
  //   document.cookie.split(';').forEach(function (el) {
  //     let [key, value] = el.split('=');
  //     cookie[key.trim()] = value;
  //   })
  //   return cookie[pass];
  // }

  const config = {
    headers: {
      token : Cookies.get('pass')
    }
  }

  const [eh, setEh] = useState(true);
  const [admin, setAdmin] = useState('');

  const [list, setList] = useState([]);
  useEffect(() => {
    console.log('ss')
     axios.get("http://localhost:9191/admin/categories", config).then((res) => {
      if (res.data == null) {
        setEh(true);
      }
      else {
        setEh(false)
        setAdmin('ADmin');
        setList(res.data);
      }
      setReload(false);
    });

     axios.get("http://localhost:9191/admin/items", config).then((res) => {
      setdata(res.data );
      console.log(daa)
    });
    console.log("sunning");
    console.log(list);
  }, [reload]);
  const render = [];
  const [render2, setRender] = useState([]);
  const [cat, setCat] =useState();
  //   {
  //     id: 3,
  //     item_name: "jbl152",
  //     price: 1.399,
  //     offer: 0,
  //     qty_avlb: 9,
  //     delivery_time: 19,
  //     description: "some chocolate",
  //     img_name: "munch.jpg",
  //     category: {
  //       id: 1,
  //       category_name: "earphones2",
  //     },
  //   },
  // ]);
  const [daa, setdata] = useState([]);

  const [det, setDet] = useState(false);
  // const [detailed, setDetailed] = useState(false)
  let x;
  return (
    <>
      {!det ? (
        <>
          {!eh ? (
            <>
              <div className={styles.add}>
                <Link href="/Admin/addCat">Add Category</Link>
              </div>
              <div className={styles.adddel}>
                <Link href="/Admin/delCat">Delete Category</Link>
              </div>
              <div className={styles.adddelu}>
                <Link href="/Admin/delUser">Delete User</Link>
              </div>
            </>
          ) : (
            <></>
          )}

          <a href="/Admin/admin" className={styles.logOut} onClick={
            ()=>{
              Cookies.remove('pass')
              
            }
          }>LogOut</a>
          <div className={styles.adminContainer}>
            <div className={styles.header1}>
              {!eh ? <>Welcome, {Admin}</> : <> Please Login first</>}
            </div>
            <div className={styles.categories}>
              {list.map((data) => {
                return (
                  <div
                    className={styles.category}
                    key={data.id}
                    onClick={() => {
                      setCat(data.id);
                      for (let i = 0; i < daa.length; i++) {
                        x = data.id;
                        // console.log(dataa[i]);
                        if (daa[i].category.id == x) {
                          render.push(daa[i]);
                          console.log(daa[i]);

                          // setRender({...render})
                          // console.log(render)
                        }
                      }
                      // for (let i = 0; i < render.length; i++){
                      //   setRender({...render2, render[i]})
                      // }
                      Array.isArray(render2)
                        ? setRender(render2.concat(render))
                        : {};

                      console.log(render2);
                      console.log(render);
                      render;
                      setDet(true);
                    }}
                  >
                    <div className={styles.icon}></div>
                    <div className={styles.name}>{data.category_name}</div>
                    <div className={styles.name2}>Id:{data.id}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <Link href={{ pathname: "/Admin/addProd", query: cat }}>
            <div className={styles.add}>Add product</div>
          </Link>
          <div
            className={styles.back}
            onClick={() => {
              console.log(render);
              setDet(false);
              setRender([]);
              // render2.length=0
              // setRender({...render2})
              console.log(render[1]);
            }}
          >
            Back
          </div>
          <div className={styles.list}>
            {Array.isArray(render2) ? (
              <>
                {render2.map((data) => {
                  return (
                    <div className={styles.container} key={data.id}>
                      <div className={styles.image}></div>
                      <div
                        className={styles.header}
                        onClick={() => {
                          setDetailed(true);
                        }}
                      >
                        {data.item_name}
                      </div>
                      {/* <div className={styles.btn}>Add</div> */}
                      <div className={styles.btn} onClick={() => {}}>
                        <Link
                          href={{
                            pathname: `/Admin/update`,
                            query: {
                              item_name: data.item_name,
                              price: data.price,
                              offer: data.offer,
                              qty_avlb: data.qty_avlb,
                              description: data.description,
                              id: data.id,
                            },
                          }}
                        >
                          Update
                        </Link>
                      </div>
                      <div
                        className={styles.btn}
                        onClick={() => {
                          axios.delete(
                            `http://localhost:9191/admin/items/delete/${data.id}`, config
                          ).then(res => console.log('Deleted: ', res));
                        }}
                      >
                        del
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>No items found</>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Admin;
