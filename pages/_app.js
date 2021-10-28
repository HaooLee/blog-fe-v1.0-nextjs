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
import Head from 'next/head'


function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)

    return (

        <Provider store={store}>
            <Head>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
            </Head>
            <Header/>
            <Component {...pageProps} />
            <Footer/>
        </Provider>)

    // return <Provider store={store}>
    //   <Component {...pageProps} />
    // </Provider>
}

export default MyApp
