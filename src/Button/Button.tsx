import React from "react";

type TButton = {
    children?: React.ReactNode
};

export const Button: React.FC<TButton> = ({children}) => {
    return (
        <button>{children}</button>
    )
}