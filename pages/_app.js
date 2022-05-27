import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/main.scss"

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Component {...pageProps} />
          <ToastContainer />
      </>
  )
}

export default MyApp
