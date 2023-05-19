import React from "react";
import styles from "./Button.module.css";

type TButton = {
    children?: React.ReactNode
};

export const Button: React.FC<TButton> = ({children}) => {
    return (
        <button className={styles.button}>{children}</button>
    )
}