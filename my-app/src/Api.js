import axios from "axios"

export const url = 'https://hacker-news.firebaseio.com/v0/'
export const newStoriesUrl = `${url}topstories.json?orderBy="$key"&limitToFirst=100`
export const storyUrl = `${url}item/`

export const getStoriesId = async () => {
    return await axios.get(newStoriesUrl).then(({ data }) => data)
}

export const getStory = async storyId => {
    return await axios.get(`${storyUrl + storyId}.json`).then(({ data }) => data)
}
