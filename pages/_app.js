
import React from "react";
import Header from '@/components/header'
import Footer from '@/components/footer'
import Image from 'next/image'
import "antd/dist/antd.css"
// import '../styles/code-theme/atom-one-light.css'
import '../styles/code-theme/vs2015.css'
import '../styles/global.scss'
import {Provider} from 'react-redux'
import {useStore} from '../redux/store'


function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <Header/>
            <Component {...pageProps} />
            <Footer/>
        </Provider>)

  // return <Provider store={store}>
  //   <Component {...pageProps} />
  // </Provider>
}

export default MyApp
