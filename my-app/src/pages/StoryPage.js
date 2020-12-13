import React, {useEffect, useState} from "react"
import {getStory} from "../Api"
import {Link} from "react-router-dom"
import {useStateIfMounted} from "use-state-if-mounted"
import moment from 'moment'
import {TreeViewComponent} from "../components/TreeView"
import {Container} from "@material-ui/core"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from "@material-ui/core/CircularProgress"
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined'
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '20px 0'
    },
    title: {
        fontSize: 25,
    },
    pos: {
        marginLeft: '10px'
    },
    info: {
        margin: '5px -2px',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '350px'
    },
    infoElement: {
        display: 'flex',
        alignItems: 'flex-end'
    }
});

export const StoryPage = ({ match }) => {
    const [storyPage, setstoryPage] = useStateIfMounted({})
    const [loading, setLoading] = useState(true)
    const urlId = match.params.id
    const classes = useStyles()

    useEffect(() => {
        getStory(urlId)
            .then(data => setstoryPage(data))
            .then(() => setLoading(false))
            // eslint-disable-next-line
    }, [])

    const {title, by, time, descendants, kids, url} = storyPage

    function refreshComments() {
        window.location.reload(true);
    }

    return (
        <Container>
            <Link to="/">
                <IconButton color="primary" aria-label="go to home page">
                    <HomeOutlinedIcon />
                </IconButton>
            </Link>
            {loading
            ? <CircularProgress size={20} />
            : <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h6" component="h3" className={classes.title}>{title}</Typography>
                    <div className={classes.info}>
                        <div className={classes.infoElement}>
                            <PersonRoundedIcon color="primary" />
                            <Typography className={classes.pos} color="textSecondary">{by}</Typography>
                        </div>
                        <div className={classes.infoElement}>
                            <ScheduleOutlinedIcon color="primary" />
                            <Typography className={classes.pos} color="textSecondary">{moment.unix(time).fromNow()}</Typography>
                        </div>
                        <div className={classes.infoElement}>
                            <QuestionAnswerOutlinedIcon color="primary" />
                            <Typography className={classes.pos} color="textSecondary">{descendants}</Typography>
                        </div>
                    </div>
                    <Button variant="outlined" color="primary" onClick={refreshComments} style={{ margin: '10px 0' }}>
                        Update comments
                    </Button>
                    {kids
                        ? kids.map((parentId) => (
                        <TreeViewComponent key={parentId} parentId={parentId} />))
                        : <Typography color="textSecondary">No comments yet...</Typography>
                    }
                </CardContent>
                <CardActions className={classes.footer}>
                    <Button href={url} target={'_blank'}>
                        Read
                    </Button>
                </CardActions>
              </Card>
            }
        </Container>
    )
}


