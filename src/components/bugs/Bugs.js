import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadBugs,uploadBugs, bugAdded, bugResolved, bugDeleted, bugAssignedToUser, selectBugs } from "../../store/features/bugs";

import './Bugs.css'
import Bug from "./bug/Bug";
import { Button } from '../../UI/Button'
import { Input } from '../../UI/Input'
import db from '../../firebase'

const Bugs = () => {
    const dispatch = useDispatch();
    const bugs = useSelector(selectBugs);

    const [bugInput, setBugInput] = useState("");
    const [error, setError] = useState('')

    useEffect(() => {

        dispatch(loadBugs())

        dispatch(bugAdded({ description: "This is test Bug1", resolved: false }));

        return () => {
            // db.collection('bugs').add(bugs)
        };
    }, []);
    
    const addBugHandler = () => {
        // console.log(">>>bugClickHandler<<<");
        if (bugInput.length < 5) {
            setError('Description should be add least more than 5 charactors')
            setTimeout(function () { setError('') }, 3000);
            // setError('Description should be add least more than 5 charactors')
            return;
        }
        dispatch(bugAdded({ description: bugInput, resolved: false }));
        setBugInput("");
        if (error.length > 0)
            setError('')
    };
    const onResolved = (id, resolved) => {
        // setResolved(false)

        dispatch(bugResolved({ id, resolved }))
        // setResolved(!resolved)
    }
    const onAddUser = (bugId, userId) => {
        dispatch(bugAssignedToUser({ bugId, userId }))
        alert("This bug has assigned to you")
    }

    const writeUserData = () => {
        dispatch(uploadBugs(bugs))
        // const bugsRef = db.collection("bugs")
        // bugs.forEach(async bug => {
        //     const snapshot = await bugsRef.where('description', '==', bug.description).get();
        //     if (snapshot.empty) {
        //         // console.log('No matching documents.');
        //         bugsRef.add(bug)
        //         return;
        //       }  
        //     //   console.log('document exists already')
        // });
        
    };
    return (
        <div className="bugs">
            {error && <p className="bugs__add-bug-error">{error}</p>}
            {bugs.length ? bugs.map((bug,i) => (
                <Bug
                    key={i}
                    bug={bug}
                    className='bugs__bug'
                    description={bug.description}
                    onDelete={() => dispatch(bugDeleted({ id: bug.id }))}
                    onResolved={() => onResolved(bug.id, !bug.resolved)}
                    onAddUser={() => onAddUser(bug.id, 1)}
                />
            )) : <h3 className="bugs__not-bug-heading">Not BUG is registered yet</h3>}
            <div className="bugs__add-bug">
                <Input
                    style={{ borderRight: '4px solid rgba(112, 76, 182, 0.4)' }}
                    value={bugInput}
                    onChange={(e) => setBugInput(e.target.value)}
                    placeholder="Bug description.."
                />
                <Button onClick={addBugHandler}>Add Bug</Button>
            </div>
            <Button onClick={writeUserData}>Store data on cloud</Button>
        </div>
    );
};

export default Bugs;
