// import { theme } from '@/utils/theme'
"use client"
import React, { useState, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useMediaQuery } from '@mui/material'

const GoToTop = ({className}:{className:any}) => {
    const matches=useMediaQuery('(max-width:768px)')
    const [hovered, setHovered] = useState(false)
    const [visible, setVisible] = useState(false)
    const [color,setColor]=useState("pink")
    const handleScroll = (e: any) => {
        if (window.scrollY > 100) setVisible(true)
        else setVisible(false)
        if(window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight-(matches?760:400)){
            setColor("pink")
        }
        else{
            setColor("pink")
        }
        
    }
    useEffect(() => {
        // console.log(window.scrollY,)
        window.addEventListener("scroll", (e: any) => handleScroll(e))
        return () => {
            window.removeEventListener("scroll", (e: any) => handleScroll(e))
        }
    }, [])
    return (
        <>
            <div
                onClick={() => {
                    window.scroll({ top: 0, behavior: "smooth" })
                }}
                // style={{ color: hovered ? theme.color : color }}
                onMouseEnter={() => { setHovered(true) }}
                onMouseLeave={() => { setHovered(false) }}
                className={`${hovered?"text-primary":`text-primary`} font-semibold  z-30 fixed ${visible?"opacity-100":"opacity-0 hidden"} cursor-pointer -rotate-90 bottom-[50px] translate-y-[-50%] right-0 flex items-center gap-[10px] transitionFast`}>
                Go To Top <BsArrowRight 
                
                // style={{ color: hovered ? theme.color : color }} 
                className={`${hovered ? "scale-x-220" : ""} transitionFast ${hovered?"text-primary":`text-primary`}`} />
            </div>
        </>
    )
}

export default GoToTop