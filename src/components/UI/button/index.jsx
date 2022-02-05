import React from "react";
import s from './index.module.css'
const Button = ({children, ...props}) => {
    return <div {...props} className={s.button}>
        {children}
    </div>
}

export default Button