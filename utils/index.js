import marked from 'marked'
import marked_ast from 'marked-ast'
import xss from 'xss'
import { clear, get } from '@/utils/storage'


// 转化md 为html
export const translateMarkdown2html = plainText => {
  const marked_render = new marked.Renderer()
  const isGuardXss = false
  marked_render.old_paragraph = marked_render.paragraph
  // 重写`paragraph()`方法
  marked_render.paragraph = function (text) {
    // isTeXInline - 该文本是否有行内公式
    var isTeXInline = /\$(.*)\$/g.test(text)
    // isTeXLine - 该文本是否有行间公式
    var isTeXLine = /^\$\$(\s*.*\s*)\$\$$/.test(text)

    if (!isTeXLine && isTeXInline) {
      // 如果不是行间公式，但是行内公式，则使用<span class="marked_inline_tex">包裹公式内容，消除$定界符
      text = text.replace(/(\$([^\$]*)\$)+/g, function ($1, $2) {
        // 避免和行内代码冲突
        if ($2.indexOf('<code>') >= 0 || $2.indexOf('</code>') >= 0) {
          return $2
        } else {
          return "<span class='marked_inline_tex'>" + $2.replace(/\$/g, '') + '</span>'
        }
      })
    } else {
      // 如果是行间公式，则使用<div class='marked_tex'>包裹公式内容，消除$$定界符
      // 如果不是LaTex公式，则直接返回原文本
      text = isTeXLine ? "<div class='marked_tex'>" + text.replace(/\$/g, '') + '</div>' : text
    }
    // 使用渲染器原有的`paragraph()`方法渲染整段文本
    text = this.old_paragraph(text)
    return text
  }
  // 配置marked.js的渲染器为marked_render，使用highlight.js来自动高亮MarkDown中的代码
  return marked(isGuardXss ? xss(plainText) : plainText, {
    renderer: marked_render,
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    langPrefix: 'hljs language-',
    xhtml: false,
    highlight: function (code) {
      const hljs = require('highlight.js');
      /*eslint no-undef: "off"*/
      return hljs.highlightAuto(code).value
    },
  })
}

// 根据 article 来生成锚点列表
export const getAnchorList = (str) => {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g
  const list = []
  function pushItem(arr, item) {
    const len = arr.length
    const matchItem = arr[len - 1]
    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item)
    } else {
      arr.push(item)
      // debugger
    }
  }
  str.replace(pattern, ($0, $1) => {
    const title = $0.replace(/.*?>/, '')
    const startIndex = $0.indexOf('"')
    const endIndex = $0.indexOf('">')

    const href = `#${$0.slice(startIndex + 1, endIndex)}`
    const currentItem = {
      tag: $1, // 标签类型
      title,
      href,
      children: []
    }
    pushItem(list, currentItem)
  })
  return list
}


/**
 * 提取markdown摘要
 * @param {content} md文本
 * @returns 解析后的文本
 */
export const markdownSummary = (content, len) => {
  if (content) {
    content = content.split('\n')
    const textArr = []
    for (let i = 0; i < content.length; i++) {
      const text = content[i].trim()
      if (text) {
        textArr.push(text)
      }
    }
    content = textArr.join('\n')
    const ast = marked_ast.parse(content.trim())
    const str = parseMarkAst(ast).slice(0, len)
    return str
  }
  return ''
}

/**
 * 解析MarkDown语法树
 * @param {ast} 语法树
 * @returns 解析后的文本
 */
export const parseMarkAst = (ast) => {
  let str = ''
  for (let i = 0; i < ast.length; i++) {
    const curAst = ast[i]
    if (curAst.type === 'heading' || curAst.type === 'paragraph' || curAst.type === 'strong' || curAst.type === 'em') {
      if (curAst.text.length === 1) {
        if (curAst.text !== '/n') {
          str += curAst.text[0].trim()
        }
      } else {
        for (let y = 0; y < curAst.text.length; y++) {
          const yAst = curAst.text[y]
          if (typeof yAst === 'object') {
            str += yAst.text[0]
          } else {
            str += yAst.trim()
          }
        }
      }
    }
  }
  return str
}

// 获取 url query 参数
export const decodeQuery = url => {
  const params = {}
  const paramsStr = url.replace(/\.*\?/, '') // a=1&b=2&c=&d=xxx&e
  paramsStr.split('&').forEach(v => {
    const d = v.split('=')
    if (d[1] && d[0]) params[d[0]] = d[1]
  })
  return params
}

// 计算 评论数
export const calcCommentsCount = commentList => {
  let count = commentList.length
  commentList.forEach(item => {
    count += item.replies.length
  })
  return count
}

// 取数组中的随机数
export const randomIndex = arr => Math.floor(Math.random() * arr.length)

/**
 * 对数组进行分组
 * @param {Array} arr - 分组对象
 * @param {Function} f
 * @returns 数组分组后的新数组
 */
export const groupBy = (arr, f) => {
  const groups = {}
  arr.forEach(item => {
    const group = JSON.stringify(f(item))
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  var res = Object.keys(groups).sort().reverse()
  return Object.keys(groups).map((group, i) => groups[res[i]])
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|http:)/.test(path)
}

// 获取 token
export function getToken() {
  let token = ''
  const userInfo = get('userInfo')

  if (userInfo && userInfo.token) {
    token = 'Bearer ' + userInfo.token
  }

  return token
}

/**
 * 生成随机 ID
 * @param {Number} len - 长度
 */
export function RandomId(len) {
  return Math.random().toString(36).substr(3, len)
}

/**
 * debounce
 */
export function debounce(func, wait) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}


export function encryption(data) {
  let strs = []
  for (const i in data) {
    strs.push(i + '=' + data[i])
  }
  strs.sort() // 数组排序
  strs = strs.join('&') // 数组变字符串
  const endData = strs + '&sign=' + CryptoJS.MD5(strs + 'ADfj3kcadc2349akvm1CPFFCD84f').toString() // MD5加密
  const key = CryptoJS.enc.Utf8.parse('0880076B18D7EE81') // 加密秘钥
  const iv = CryptoJS.enc.Utf8.parse('CB3EC842D7C69578') //  矢量
  const encryptResult = CryptoJS.AES.encrypt(endData, key, {
    //  AES加密
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7, // 后台用的是pad.Pkcs5,前台对应为Pkcs7
  })
  return encodeURIComponent(CryptoJS.enc.Base64.stringify(encryptResult.ciphertext)) // Base64加密encode;
}


/**
 * 获取颜色是否为深色
 * @param colorArr 颜色rbg数组
 */
function isDeepColor(color) {
  const colorArr = color.split('').map(i=>parseInt(i+i,16))
  // console.log(colorArr)
  return colorArr[0] * 0.299 + colorArr[1] * 0.587 + colorArr[2] * 0.114 < 192
}


/**
 * 根据名字提取颜色
 * @param name 名字
 */
export function getColorByName(name) {
  let temp = []
  for (let index = 0; index < name.length; index++) {
    temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16).slice(0,2))
  }
  const color = temp.slice(0,3).join('').padStart(3,'0').slice(0,3)
  // console.log(isDeepColor(color),'--')
  return {color:'#' + color,isDeepColor:isDeepColor(color)}
}
