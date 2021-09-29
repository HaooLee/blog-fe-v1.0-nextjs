import React from "react";
import styles from './footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import {withRouter} from 'next/router'
import imgLoader from "../../loader";

class Header extends React.Component {

  constructor(props) {
    super(props)

  }


  render() {

    return (
      <footer className={styles['footer']}>
        <a href="https://beian.miit.gov.cn">京ICP备2021029886号-1</a>
        <div className={styles['records-wrap']}>
          <Image loader={imgLoader} src={'/web/备案图标.png'} height={15} width={15} alt="公网安备"/>
          <a target="_blank" rel="noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502046430">
            <span>京公网安备 11010502046430号</span>
           </a>
        </div>
      </footer>
    )
  }
}

export default withRouter(Header)
