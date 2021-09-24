import styles from "./tag-cloud.module.scss";
import {Divider, Tag} from "antd";
import React from "react";

const colors = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']

export default function TagCloud({tags}) {
  return <div className={styles['tag-cloud-wrap']}>
    <Divider orientation="left">相关标签</Divider>
    <div className={styles['tags']}>
      {
        tags.slice(0,30).map((tag, index) => {
          const name = tag.name
          const count = tag.count
          // const {color, isDeepColor} = getColorByName(tag.name)
          const color = colors[index % colors.length]
          return <Tag color={color} key={index} style={{margin: '4px'}}>{name} ({count})</Tag>
        })
      }
    </div>

  </div>
}
