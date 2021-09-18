
import React from "react";
import ReactCanvasNest from 'react-canvas-nest'
import Header from '@/components/header'
import Image from 'next/image'
import "antd/dist/antd.css"
// import '../styles/code-theme/atom-one-light.css'
import '../styles/code-theme/vs2015.css'
import '../styles/global.scss'


function MyApp({ Component, pageProps }) {
  // const store = useStore(pageProps.initialReduxState)

  return <>
      <div className={'nest-bg'}>
        <ReactCanvasNest />
      </div>
      <Header/>
      <Component {...pageProps} />
    </>

  // return <Provider store={store}>
  //   <Component {...pageProps} />
  // </Provider>
}

export default MyApp
