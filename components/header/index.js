import React from "react";
import styles from './header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { withRouter } from 'next/router'

class Header extends React.Component {

  constructor(props){
    super(props)

  }

  routes = [
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
    }
  ]

  onScroll(e){
    // console.log(e)
  }

  componentDidMount() {
    // window.addEventListener('scroll',this.onScroll)
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll',this.onScroll)
  }


  render() {
    const {router} = this.props

    return (
      <header className={styles['header']}>
        <div className={styles['container']}>
          <Link href="/">
            <a className={styles['logo']}>
              <Image src={'/images/haoolee-logo.png'} height={64} width={194} alt="logo"/>
            </a>
          </Link>
          <nav>
            <ul className={styles['nav']}>
              {
                this.routes.map((i, idx) => {
                  return <li key={idx}>
                    <Link href={i.href}>
                      <a className={router.pathname == i.href? styles['active']:''}>{i.text}</a>
                    </Link>
                  </li>
                })
              }
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default withRouter(Header)
