import Head from 'next/head'
import Image from 'next/image'
import React from "react";
import bg from '../public/images/piqsels.com-id-zbots.jpg'
import styles from './index.module.scss'
import Typer from '@/components/typer'
import React3dEarth from 'react-3d-earth'

export default function Index() {
    return (
        <div>
            <Head>
                <title>李昊的Blog</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="description" content="一个码农的踩坑、研究、分享的博客网站"/>
                <meta name="keywords" content="haoolee,blog,博客,前端,JavaScript,Vue,React"/>
                {/*<script src="/js/lib/signals.min.js"></script>*/}
                {/*<script src="/js/lib/three.r125.js"></script>*/}
                {/*<script src="/js/lib/OBJLoader.js"></script>*/}

            </Head>

            <React3dEarth
                style={{width: '100%', height: '100vh', position: 'absolute', zIndex: '0'}}
                config={{
                    // radius: 30,
                    mobileRadius:18
                    // backgroundColor: '#fafafa',
                    // flagScale:1,
                    // flagLat:39.56,
                    // flagLon: 116.20,
                    // backgroundOpacity:1,
                    // flagColor: 'green'
                    // dotColor: 'hotpink'
                    // autoRotationSpeed: 3,
                    // draggingRotationSpeed:50,
                    // textureSrc: '/js/webgl-globe/images/map.png'
                }}/>
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
