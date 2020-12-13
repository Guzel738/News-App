import React, {useEffect} from "react"
import {getStory} from "../Api"
import {Link} from "react-router-dom"
import moment from 'moment'
import {useStateIfMounted} from "use-state-if-mounted"
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import PersonRoundedIcon from "@material-ui/icons/PersonRounded"

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '20px 0',
        transition: '.2s linear',
        '&:hover': {
            background: '#f5f5f5'
        }
    },
    about: {
        display: 'flex',
        margin: '10px 0'
    },
    aboutElement: {
        display: 'flex',
        alignItems: 'flex-end',
        '&:first-child': {
            marginRight: '25px'
        }
    },
    pos: {
        marginLeft: '10px',
    },
    data: {
        marginLeft: '10px'
    }
});

export const Story = ({ storyId }) => {
    const [story, setStory] = useStateIfMounted({})
    const classes = useStyles()

    useEffect(() => {
        getStory(storyId).then(data => data && data.url && setStory(data))
        // eslint-disable-next-line
    }, [storyId])

    return (
        story && story.url ? (
            <Link to={'/story/' + story.id} style={{color: 'black', textDecoration: 'none'}}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">{story.title}</Typography>
                        <div className={classes.about}>
                            <div className={classes.aboutElement}>
                                <ThumbUpOutlinedIcon color="primary" />
                                <Typography className={classes.pos} color="textSecondary">{story.score}</Typography>
                            </div>
                            <div className={classes.aboutElement}>
                                <PersonRoundedIcon color="primary" />
                                <Typography className={classes.pos} color="textSecondary">{story.by}</Typography>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions className={classes.data}>{moment.unix(story.time).fromNow()}</CardActions>
                </Card>
            </Link>
        ) : null
    )
}

