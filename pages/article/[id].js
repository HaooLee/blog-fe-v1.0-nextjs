import React, {useState, useEffect, useRef} from "react"
import {translateMarkdown2html, getAnchorList} from '@/utils'
import {Anchor, BackTop, Tag, Button, Drawer} from 'antd'
import moment from 'moment'
import momentConfig from '../../config/momentConfig'
import {useRouter} from 'next/router'
import {useDispatch} from "react-redux"
import {showTitle, hideTitle} from '@/redux/actions'
import axios from 'axios'

import {
    ClockCircleOutlined,
    LikeFilled,
    TagsOutlined
} from '@ant-design/icons'

const {Link: Alink} = Anchor
import Layout from '@/layout'

import Head from 'next/head'
import styles from './article.module.scss'

moment.locale('zh-cn', momentConfig)


//文章导航组件
const Navigation = ({list, className}) => {
    const router = useRouter()

    const [targetOffset, setTargetOffset] = useState(undefined);

    useEffect(() => {
        setTargetOffset(window.innerHeight / 4);
    }, [])

    const handleClick = (e, link) => {
        e.preventDefault();
        // console.log(link)
        router.replace(link.href,null, {shallow: true})
    };

    function renderLink({href, title, children}) {
        return (
            <Alink key={href} href={href} title={title}>
                {children.length > 0 && children.map(sub => renderLink(sub))}
            </Alink>
        )
    }

    return <Anchor className={className} onClick={handleClick} showInkInFixed={true} affix={false}
                   targetOffset={targetOffset}>{list.map(renderLink)}</Anchor>
}


const Article = ({data}) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const ref = useRef()
    // console.log('Article',data)
    const html = translateMarkdown2html(data.content, styles)
    const anchor = getAnchorList(html)

    const onLikeClick = () => {
        axios.put(`/api/v1/article/like/${data.id}`)
    }

    let lastScrollY = 0
    let isDownFlag = 0
    let isUpFlag = 0

    const scrollListener = () => {
        const scrollY = window.scrollY
        // 向下滚动
        if (lastScrollY - scrollY > 50) {
            isDownFlag = 1
            dispatch(hideTitle())
            lastScrollY = scrollY
        } else if (scrollY - lastScrollY > 50) {
            isUpFlag = 1
            dispatch(showTitle(data.title))
            lastScrollY = scrollY
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollListener)
        return () => {
            dispatch(hideTitle())
            window.removeEventListener('scroll', scrollListener)
        }
    }, [])

    const showCatalog = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    };


    return (
        <Layout>
            <Head>
                <title>{data.title} - haoolee Blog</title>
                <meta name="description" content={data.desc || '一个码农的踩坑、研究、分享的博客网站'}/>
                <meta name="keywords" content={data.tags.map(i => i.name).join(',')}/>
            </Head>
            <main>
                <div className={styles['article-wrap']}>
                    <article className={styles["article-detail"]}>
                        <div className={styles['article-info']}>
                            <h1 className={styles['article-title']}>{data.title}</h1>
                            <div className={styles['time']}>
                                <span>
                                  <span>发表于:</span> <ClockCircleOutlined/> <span>{moment(data.createdAt).fromNow()}</span>
                                </span>
                                <span>
                                  <span>更新于:</span> <ClockCircleOutlined/> <span>{moment(data.contentUpdatedAt).fromNow()}</span>
                                </span>
                                {
                                    data.tags && data.tags.length > 0 &&
                                    <span>
                                          <span>标签:</span>
                                          <TagsOutlined/>
                                        {data.tags.map((tag, idx) => {
                                            const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
                                            return <Tag color={colors[idx % colors.length]} key={idx}>{tag.name}</Tag>
                                        })}
                                        </span>
                                }
                            </div>
                        </div>
                        <div className={styles['article-content']} dangerouslySetInnerHTML={{__html: html}}></div>
                        <div className={styles['like-wrap']}>
                            <Button
                                className={styles['like-btn']}
                                onClick={onLikeClick}
                                shape="circle"
                                type={'primary'}
                                ghost style={{width: 60, height: 60}}
                                icon={<LikeFilled style={{fontSize: 30}}/>}></Button>
                        </div>
                    </article>
                </div>
                <div className={styles['sidebar']}>
                    <div className={styles['catalogue']}>
                        <Navigation list={anchor}/>
                    </div>
                </div>
            </main>
            <div className={styles['catalog-handle']} onClick={showCatalog}>
                目录
            </div>
            <Drawer
                title="目录"
                placement="right"
                width={240}
                onClose={onClose}
                visible={visible}
            >
                <Navigation list={anchor}/>
            </Drawer>

            <BackTop></BackTop>
        </Layout>
    )
}

// 此函数在构建时被调用
export async function getServerSideProps({params}) {
    // 调用外部 API 获取文章
    const res = await fetch(`http://127.0.0.1:6060/article/${params.id}`)
    const {code, data} = await res.json()

    //没有获取到数据就导入404
    if (!data || !data.content || code !== 200) {
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
