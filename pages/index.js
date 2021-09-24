import Head from 'next/head'
import Image from 'next/image'
import React from "react";
import bg from '../public/images/piqsels.com-id-zbots.jpg'
import styles from './index.module.scss'
import Typer from '@/components/typer'

export default function Index() {
  return (
    <div >
      <Head>
        <title>李昊的Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="一个码农的踩坑、研究、分享的博客网站" />
        <meta name="keywords" content="haoolee,blog,博客,前端,JavaScript,Vue,React"/>
      </Head>
      {/*<div className={styles['banner']}>*/}
        {/*/!*<Image src={bg} layout="responsive"></Image>*!/*/}

        {/*<div className={styles['decor-wrap']}>*/}
          {/*<svg id="header-decor" className={styles['decor']} xmlns="http://www.w3.org/2000/svg" version="1.1"*/}
               {/*viewBox="0 0 100 100" preserveAspectRatio="none">*/}
            {/*<path className="large left" d="M0 0 L50 50 L0 100" fill="rgba(244,245,245, .1)"></path>*/}
            {/*<path className="large right" d="M100 0 L50 50 L100 100" fill="rgba(244,245,245, .1)"></path>*/}
            {/*<path className="medium left" d="M0 100 L50 50 L0 33.3" fill="rgba(244,245,245, .3)"></path>*/}
            {/*<path className="medium right" d="M100 100 L50 50 L100 33.3" fill="rgba(244,245,245, .3)"></path>*/}
            {/*<path className="small left" d="M0 100 L50 50 L0 66.6" fill="rgba(244,245,245, .5)"></path>*/}
            {/*<path className="small right" d="M100 100 L50 50 L100 66.6" fill="rgba(244,245,245, .5)"></path>*/}
            {/*<path d="M0 99.9 L50 49.9 L100 99.9 L0 99.9" fill="rgba(244,245,245, 1)"></path>*/}
            {/*<path d="M48 52 L50 49 L52 52 L48 52" fill="rgba(244,245,245, 1)"></path>*/}
          {/*</svg>*/}
        {/*</div>*/}
      {/*</div>*/}
      <div className={styles['container']}>

        <div className={styles['slogan-wrap']}>
          <span className={styles['name']}>HaooLee</span>
          <Typer delay={500} frequency={100}>
            <span>搬砖工 + 切图仔 + 调参侠</span>
          </Typer>
        </div>
      </div>


    </div>
  )
}
