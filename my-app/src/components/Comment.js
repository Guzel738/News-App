import React, {useEffect, useState} from 'react'
import TreeItem from "@material-ui/lab/TreeItem"
import {useStateIfMounted} from "use-state-if-mounted"
import ReactHtmlParser from 'react-html-parser'
import { makeStyles } from '@material-ui/core/styles'

import {getStory} from "../Api";

const useStyles = makeStyles({
    treeItem: {
        background: '#f5f5f5',
        marginBottom: '10px'
    }
})

export const Comment = ({ parentId }) => {
    const [comment, setComment] = useStateIfMounted({})
    const classes = useStyles()

    const getComment = () => {
        getStory(parentId).then(r => setComment(r))
    }

    useEffect(() => {
        getComment()
        setInterval(() => {
            getComment()
        }, 60000)
        // eslint-disable-next-line
    }, [])

    const {text, kids} = comment

    return (
        <TreeItem nodeId={parentId.toString()} label={ReactHtmlParser(text)} className={classes.treeItem}>
            {kids
                ? kids.map((parentId) => (
                    <Comment key={parentId} parentId={parentId} /> ))
                : null}
        </TreeItem>
    );
}

