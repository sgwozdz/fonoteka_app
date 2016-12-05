import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Base } from './components/Base';
import { Friends } from './components/Friends';
import { Ranking } from './components/Ranking';

export default <Route component={Layout}>
    <Route path='/' components={{ body: Home }} />
    <Route path='/baza' components={{ body: Base }} />
    <Route path='/znajomi' components={{ body: Friends }} />
    <Route path='/ranking' components={{ body: Ranking }} />
</Route>;