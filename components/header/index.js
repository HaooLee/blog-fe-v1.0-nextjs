import React from "react";
import styles from './header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import imgLoader from '../../loader'
import { useSelector } from 'react-redux'

import { withRouter } from 'next/router'

const Header = (props) => {

    const showTitle = useSelector((state) => state.header.showTitle)
    const title = useSelector((state) => state.header.title)

    const routes = [
        {
          text: '首页',
          href: '/'
        },
        {
          text: '博客',
          href: '/blog'
        },
        {
          text: '关于我',
          href: '/about'
        },
        {
          text:'写文章',
          href:'https://admin.haoolee.com/article/add'
        }
      ]

    const {router} = props

    return (
        <header className={styles['header']}>
            <div className={`${styles['container']} ${showTitle ? styles['hide'] : ''}`}>
                <Link href="/">
                    <a className={styles['logo']}>
                        <Image loader={imgLoader} src={'/web/haoolee-logo.png'} height={64} width={194} alt="logo"/>
                    </a>
                </Link>
                <nav>
                    <ul className={styles['nav']}>
                        {
                            routes.map((i, idx) => {
                                return <li key={idx}>
                                    <Link href={i.href}>
                                        <a className={router.pathname == i.href ? styles['active'] : ''}>{i.text}</a>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </div>
            <div className={`${styles['container-down']} ${showTitle ? styles['show'] : ''}`}>
                <div className={styles['title-container']}>
                    <span className={styles['title']}>{ title }</span>
                </div>
            </div>
        </header>
    )
}

// class Header extends React.Component {
//
//   constructor(props){
//     super(props)
//
//   }
//
//   routes = [
//     {
//       text: '首页',
//       href: '/'
//     },
//     {
//       text: '博客',
//       href: '/blog'
//     },
//     {
//       text: '关于我',
//       href: '/about'
//     },
//     {
//       text:'写文章',
//       href:'https://admin.haoolee.com/article/add'
//     }
//   ]
//
//   onScroll(e){
//     // console.log(e)
//   }
//
//   componentDidMount() {
//     // window.addEventListener('scroll',this.onScroll)
//   }
//
//   componentWillUnmount() {
//     // window.removeEventListener('scroll',this.onScroll)
//   }
//
//
//   render() {
//     const {router} = this.props
//
//
//   }
// }

export default withRouter(Header)
