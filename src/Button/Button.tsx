import React from "react";
import styles from "./Button.module.css";
import * as cn from "classnames";

type TButton = {
    variant?: 'primary' | 'warning'
    children?: React.ReactNode
};

export const Button: React.FC<TButton> = ({variant = 'primary', children}) => {
    return (
        <button className={cn(styles.button, styles[variant])}>{children}</button>
    )
}