import React, {Fragment} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {Home} from './pages/Home'
import {StoryPage} from './pages/StoryPage'

const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/story/:id" component={StoryPage} />
                </Switch>
            </Fragment>
        </BrowserRouter>
  );
}

export default App;
