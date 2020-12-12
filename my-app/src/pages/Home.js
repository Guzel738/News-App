import React, {useEffect, useState} from "react"
import Container from '@material-ui/core/Container'
import {getStoriesId} from "../Api"
import {Story} from '../components/Story'
import {useStateIfMounted} from "use-state-if-mounted"
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from '@material-ui/core/Button'

export const Home = () => {
    const [storiesId, setStoriesId] = useStateIfMounted([])
    const [loading, setLoading] = useState(true)

    const storiesIdFunc = () => {
        getStoriesId()
            .then(r => setStoriesId(r))
            .then(() => setLoading(false))
    }

    useEffect(() => {
        storiesIdFunc()
        setInterval(() => {
            storiesIdFunc()
        }, 60000)
        // eslint-disable-next-line
    }, [])

    function refreshPage() {
        window.location.reload(true);
    }

    return (
    <Container>
        <Button variant="outlined" color="primary" onClick={refreshPage} style={{ marginRight: '10px' }}>Refresh</Button>
        {loading
            ? <CircularProgress size={20} />
            : storiesId.map(storyId => (
                    <Story key={storyId} storyId={storyId} />
                )
            )
        }
    </Container>
    )
}