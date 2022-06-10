import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/little-styles.scss"
import "../styles/main.scss"
import {AppProps} from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return(
      <>
        <Component {...pageProps} />
        <ToastContainer />
      </>
  )

}

