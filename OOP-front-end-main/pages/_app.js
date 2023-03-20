import { useState } from 'react';
import Navbar from '../components/navbar/navbar'
import '../styles/globals.css'
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { Log } from '../Helper/detail';

function MyApp({ Component, pageProps }) {

  const [nav, setNav] = useState(true)
  const [foot, setFoot] = useState(true)

  let params;
  const [log, setLog] = useState(false)
  useEffect(() => {
    if (process.browser) {
      params = window.location.pathname;
      console.log(params);

      if (
        params == "/Login" ||
        params == "/signUp" ||
        params == "/Admin/admin" ||
        params == "/Admin/update" ||
        params == "/Admin/addCat" ||
        params == "/Admin/addProd" ||
        params == "/Admin/delCat" ||
        params == "/Manager/manager" 
      ) {
        setNav(false);
        setFoot(false);
        console.log(nav);
      }
    }
  }, params);
  return (
    <ErrorBoundary>
    <Log.Provider value={{ log, setLog }}>
      <>
        {nav ? (
          <>
            <div className="navbar">
              <Navbar />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="render">
          <Component {...pageProps} />
        </div>
      </>
    </Log.Provider>
    </ErrorBoundary>
  );
}

export default MyApp
