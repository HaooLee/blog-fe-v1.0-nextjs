import React, {useState, useEffect} from "react"
import {translateMarkdown2html, getAnchorList} from '@/utils'
import {Anchor, BackTop, Tag} from 'antd'
import moment from 'moment'
import momentConfig from '../../config/momentConfig'
moment.locale('zh-cn', momentConfig)

import {
  ClockCircleOutlined,
  LikeOutlined,
  TagsOutlined
} from '@ant-design/icons'

const {Link: Alink} = Anchor
import Layout from '@/layout'

import Head from 'next/head'
import styles from './article.module.scss'

//文章导航组件
const Navigation = ({list}) => {
  const [targetOffset, setTargetOffset] = useState(undefined);
  useEffect(() => {
    setTargetOffset(window.innerHeight / 4);
  }, [])
  function renderLink({href, title, children}) {
    return (
      <Alink key={href} href={href} title={title}>
        {children.length > 0 && children.map(sub => renderLink(sub))}
      </Alink>
    )
  }

  return <Anchor showInkInFixed={true} affix={false} targetOffset={targetOffset}>{list.map(renderLink)}</Anchor>
}


function Article({data}) {
  console.log('Article',data)
  const html = translateMarkdown2html(data.content, styles)
  const anchor = getAnchorList(html)
  return (
    <Layout>
      <Head>
        <title>{data.title} - haoolee Blog</title>
        <meta name="description" content={data.desc || '一个码农的踩坑、研究、分享的博客网站'} />
        <meta name="keywords" content={data.tags.map(i=>i.name).join(',')}/>
      </Head>
      <main>
        <div className={styles['article-wrap']}>
          <article className={styles["article-detail"]}>
            <div className={styles['article-info']}>
              <p className={styles['article-title']}>{data.title}</p>
              <div className={styles['time']}>
                <span>
                  <span>发表于:</span> <ClockCircleOutlined /> <span>{moment(data.createdAt).fromNow()}</span>
                </span>
                <span>
                  <span>更新于:</span> <ClockCircleOutlined /> <span>{moment(data.contentUpdatedAt).fromNow()}</span>
                </span>
                {
                  data.tags && data.tags.length > 0 &&
                  <span>
                  <span>标签:</span>
                  <TagsOutlined />
                  {data.tags.map((tag,idx)=>{
                    const colors = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
                    return <Tag color={colors[idx % colors.length]} key={idx}>{tag.name}</Tag>
                  })}
                </span>
                }

              </div>
            </div>
            <div className={styles['article-content']} dangerouslySetInnerHTML={{__html: html}}></div>

            <div >

            </div>
          </article>
        </div>
        <div className={styles['sidebar']}>
          <div className={styles['catalogue']}>
            <Navigation list={anchor}/>
          </div>
        </div>
      </main>
      <BackTop></BackTop>
    </Layout>
  )
}

// 此函数在构建时被调用
export async function getServerSideProps({params}) {
  // 调用外部 API 获取文章
  const res = await fetch(`http://127.0.0.1:6060/article/${params.id}`)
  const data = await res.json()

  //没有获取到数据就导入404
  if (!data || !data.content) {
    return {
      notFound: true
    }
  }

  // 在构建时将接收到 `posts` 参数
  return {
    props: {
      data,
    },
  }
}


export default Article
