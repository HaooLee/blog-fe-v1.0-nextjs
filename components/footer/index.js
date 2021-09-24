import React from "react";
import styles from './footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { withRouter } from 'next/router'

class Header extends React.Component {

  constructor(props){
    super(props)

  }


  render() {

    return (
      <footer className={styles['footer']}>
        备案号:
        <a href="https://beian.miit.gov.cn">京ICP备2021029886号-1</a>
      </footer>
    )
  }
}

export default withRouter(Header)
