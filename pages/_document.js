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
        <script dangerouslySetInnerHTML={{__html:` var _hmt = _hmt || [];
          (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?afa39d5212dea0d51753b4eb1f8185e9";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();`}}>
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </Html>
    )
  }
}
