
import React,{ useState, useEffect }from "react"
import {translateMarkdown2html,getAnchorList} from '@/utils'
import { Anchor } from 'antd'
const {  Link:Alink  } = Anchor
import Layout from '@/layout'

import Head from 'next/head'
import styles from './article.module.scss'

//文章导航组件
const Navigation = ({list}) => {
  const [targetOffset, setTargetOffset] = useState(undefined);
  useEffect(() => {
    setTargetOffset(window.innerHeight / 4);
  }, [])

  function renderLink({ href, title, children }) {
    return (
      <Alink key={href} href={href} title={title}>
        {children.length > 0 && children.map(sub => renderLink(sub))}
      </Alink>
    )
  }
  return <Anchor showInkInFixed={true} affix={false} targetOffset={targetOffset}>{list.map(renderLink)}</Anchor>
}


function Home({ data }) {
  // console.log(data)
  const html = translateMarkdown2html(data.content)
  const anchor = getAnchorList(html)
  console.log(anchor)
  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>
      <main>
        <article className={styles["article-detail"]} dangerouslySetInnerHTML={{__html: html}}></article>
        <div className={styles['sidebar']}>
          <div className={styles['catalogue']}>
            <Navigation list={anchor}/>
          </div>
        </div>
      </main>
    </Layout>

  )
}

// 此函数在构建时被调用
export async function getServerSideProps({params}) {
  // 调用外部 API 获取文章
  const res = await fetch(`http://127.0.0.1:6060/article/${params.id}`)
  const data = await res.json()

  //没有获取到数据就导入404
  if(!data || !data.content){
    return {
      notFound:true
    }
  }


  // 在构建时将接收到 `posts` 参数
  return {
    props: {
      data,
    },
  }
}



export default Home
