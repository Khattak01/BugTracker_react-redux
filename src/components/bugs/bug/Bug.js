import React from "react";
import classes from "./Bug.module.css";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

const Bug = (props) => {
    const style = {
        textDecoration: props.bug.resolved ? "line-through" : "none",
        fontWeight: props.bug.resolved ? "bold" : "normal",
    };


    return (
        <div className={[classes.bug, props?.className].join(" ")}>
            <p style={style} className={classes.bug__description}>
                {`${props.bug.id} - `}
                {props.bug?.description}
            </p>
            <div className={classes.bug__btn_box}>
                <Tooltip title="Assign to user" enterDelay={500} leaveDelay={200}>
                    <IconButton onClick={props.onAddUser}>
                        <AddIcon style={{ fontSize: "24" }} />{" "}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Mark as resolved" enterDelay={500} leaveDelay={200}>
                    <IconButton onClick={props.onResolved}>
                        <DoneIcon style={{ fontSize: "28", color: "#28A745" }} />{" "}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" enterDelay={500} leaveDelay={200}>
                    <IconButton onClick={props.onDelete}>
                        <DeleteIcon style={{ fontSize: "24", color: "#f54c53" }} />{" "}
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default Bug;
