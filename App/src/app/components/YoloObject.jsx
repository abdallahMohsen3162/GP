"use client"
import "../../style/object.css";
import React, { useState } from 'react'
import Image from "react"
let classname = "";

export default function YoloObject(params) {
  classname = params.cls;
  const [specialView, setSpecial] = useState(false);
  return (  
    <div className={`${specialView ? 'fullScreen' : ''}`}>
      <h4>{params.cls}</h4>
      <img src={params.url} alt="" onClick={() => setSpecial(!specialView)}/>
    </div>
  )
}
