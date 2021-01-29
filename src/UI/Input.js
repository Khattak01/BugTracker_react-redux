import React from "react";
import classes from './Input.module.css'

export const Input = (props) => {
    return (
        <input
            style={{...props.style}}
            className={classes.input}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    );
};
