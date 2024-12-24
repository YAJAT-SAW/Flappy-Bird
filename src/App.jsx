import './App.css'
import React, {useState, useRef, useEffect} from 'react'

export default function App() {
  return(
    <div className="background">
      <div className="score">
        0
      </div>
      <div className="bird" />
      <div className="pipe rotate180" />
      <div className="pipe" />
    </div>
  )
}