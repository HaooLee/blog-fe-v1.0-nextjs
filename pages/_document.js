import React from 'react'
import Document, { Head, Main, NextScript,Html } from 'next/document'


export default class MyDocument extends Document {


  render() {
    return (
      <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico"/>
        {/*<link rel="stylesheet" href="/static/css/antd.css"/>*/}
        <link rel="stylesheet" href="/style/restcss.css"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </Html>
    )
  }
}
