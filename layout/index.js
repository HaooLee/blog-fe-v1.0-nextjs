
import styles from './layout.module.scss'

function Layout({children}) {


  return (
    <div className={styles.layout}>
      {children}
    </div>

  )
}




export default Layout
