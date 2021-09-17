import React from "react";
import Link from 'next/link'
import styles from './index.module.scss'

export default class NotFound extends React.Component{

  render(){
    return (
        <section className={styles["nf-wrap"]}>
          <div className={styles["not-found-wrap"]}>
            <div>
              <h1>404</h1>
              <p>很抱歉 {'>_<'} </p>
              <p>没有找到您要访问的页面</p>
              <Link href="/">
                <a className={styles["back-home"]} >返回首页</a>
              </Link>
            </div>
            <img src="/images/404.png" alt="404"/>
          </div>
        </section>
        )
  }
}
