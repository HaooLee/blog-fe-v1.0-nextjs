import React, {useEffect, useState} from "react";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import imgLoader from '../../loader'
import {useRouter} from 'next/router'
import styles from './blog.module.scss'
import moment from 'moment'
import momentConfig from '../../config/momentConfig'
import Layout from '@/layout'
import TagCloud from '@/components/tag-cloud'

moment.locale('zh-cn', momentConfig)
import {translateMarkdown2html, markdownSummary, calcCommentsCount} from '@/utils'
import {
  ClockCircleOutlined,
  MessageOutlined,
  EyeOutlined,
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  MailOutlined,
  LikeOutlined
} from '@ant-design/icons'
import {Divider, Tag, Pagination} from 'antd'


function Home({articles, tags, hotArticle}) {

    const articleList = articles.rows.map(item => {
    const index = item.content.indexOf('<!--more-->')
    // console.log(markdownSummary(item.content,200),'===========')
    // console.log(item.content.replace(/#*.*#/g,'').replace(/[^a-z0-9\u4e00-\u9fa5]/,'').substring(0,300))
    //吧md内容转换为html  并去除a标签
    // item.content = translateMarkdown2html(item.content.slice(0, index)) //.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g, '')
    return item
  })
  const router = useRouter()
  const page = parseInt(router.query.page) || 1
  // const [isFirst,setIsFirst] = useState(true)

  // useEffect(() => {
  //   if(isFirst){
  //     setIsFirst(false)
  //   }else {
  //     console.log(page,'effect')
  //   }
  // }, [router.query.page])


  const pageChange = (page) => {
    router.push({
      query: {
        page
      }
    }, undefined, {scroll: false}) // shallow: true
  }

  return (
    <Layout>
      <Head>
        <title>李昊的Blog-文章列表</title>
        <meta name="description" content="一个码农的踩坑、研究、分享的博客网站"/>
        <meta name="keywords" content="haoolee,blog,博客,前端,JavaScript,Vue,React"/>
      </Head>
      <main className={styles['main'] + ' clearfix'}>

        <div className={styles['inner-wrap']}>
          <div className={styles['articles-wrap']}>
            <ul className={styles['articles']}>
              {articleList.map((article, index) => (
                <li key={index} style={{padding: '0 20px'}} className={styles['article-wrap']}>
                  <Link href={`/article/${article.id}`} passHref>
                    <a>
                      <div className={styles['article-content']}>
                        <div className={styles['meta-wrap']}>
                          <div className={styles['date'] + ` ${article.tags.length > 0 ? styles['line'] : ''}`}>
                            <ClockCircleOutlined/>
                            <span>{moment(article.createdAt).fromNow()}</span>
                          </div>

                          <div className={styles['tags']}>
                            {
                              article.tags.map((tag, index) => {
                                return <div className={styles['tag']} key={index}>{tag.name}</div>
                              })
                            }
                          </div>
                        </div>
                        <h2 className={styles['title']}>{article.title}</h2>
                        {article.desc && <p className={styles['desc']}>{article.desc}</p>}
                        {/*<div className={styles['preview-content']} dangerouslySetInnerHTML={{__html:article.content}}></div>*/}
                        <div className={styles['article-info-wrap']}>
                          <div className={styles['view-count']}>
                            <EyeOutlined className={styles['icon']}/>
                            <span>{article.viewCount}</span>
                          </div>
                          <div className={styles['reply-count']}>
                            <MessageOutlined className={styles['icon']}/>
                            <span>{calcCommentsCount(article.comments) || '暂无评论'}</span>
                          </div>
                        </div>
                      </div>

                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            <Pagination onChange={pageChange} responsive current={page} total={articles.count}
                        className={styles['pagination']}></Pagination>

          </div>
        </div>
        <aside className={styles['left-slide-bar']}>
          <div className={styles['info']}>
            <Divider/>
            <div className={styles['avatar-wrap']}>
              <Image
                loader={imgLoader}
                src={'/web/pexels-negative-space-169573.jpg'}
                width={200}
                height={133}
                layout={'intrinsic'}/>
            </div>
            <p className={styles['title']}> HaooLee&lsquo;s Blog</p>
            <p className={styles['slogan']}>Be a Geek</p>
            <Divider orientation="left">关于我</Divider>
            <div className={styles['desc']}>
              <p>正经码龄: 4年 </p>
              <p>实际码龄: 9年 (高中开始瞎折腾代码) </p>
              <p>爱好: 💻打游戏 😴睡觉 🍚吃饭 ⌨️敲代码</p>
              <p>坐标: 北京</p>
            </div>
            <Divider orientation="left">社交媒体</Divider>
            <div className={styles['contact']}>
              <div className={styles['email']}>
                <MailOutlined/>
                <span>907615065@qq.com</span>
              </div>

              <div className={styles['app-icon-wrap']}>
                <GithubOutlined/>
                <QqOutlined/>
                <WechatOutlined/>
              </div>
            </div>
            <Divider/>


          </div>
        </aside>

        <aside className={styles['right-slide-bar']}>

          <TagCloud tags={tags}/>
          <div className={styles['hot-article-list-wrap']}>
            <Divider orientation="left">热门阅读文章</Divider>
            <ul className={styles['hot-article-list']}>
              {
                hotArticle.map((article, index) => {
                  return <li key={index} className={styles['hot-article']}>
                    <Link href={`/article/${article.id}`}>
                      <a>
                        <div>{article.title}</div>
                        <div className={styles['article-info-wrap']}>
                          <div className={styles['view-count']}>
                            <EyeOutlined className={styles['icon']}/>
                            <span>{article.viewCount}</span>
                          </div>
                          <div className={styles['reply-count']}>
                            <LikeOutlined className={styles['icon']}/>
                            <span>{article.likeCount}</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                })
              }
            </ul>
          </div>
        </aside>
      </main>
    </Layout>

  )
}

// 此函数在构建时被调用
export async function getServerSideProps({query}) {

  const {page} = query
  console.log(page)
  // 调用外部 API 获取博文列表
  const [articleRes, tagRes, hotArticleRes] = await Promise.all([
    fetch(`http://127.0.0.1:6060/article/list?page=${page || 1}`),
    fetch('http://127.0.0.1:6060/tag/list'),
    fetch('http://127.0.0.1:6060/article/hotList'),
  ])
  const {data:articles} = await articleRes.json()
  const {data:tags} = await tagRes.json()
  const {data:hotArticle} = await hotArticleRes.json()
  // 通过返回 { props: { article } } 对象，Blog 组件
  // 在构建时将接收到 `posts` 参数
  return {
    props: {
      articles,
      tags,
      hotArticle
    }
  }
}


export default Home
