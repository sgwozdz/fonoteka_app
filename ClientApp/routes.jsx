import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Ranking } from './components/Ranking';

export default <Route component={Layout}>
    <Route path='/' components={{ body: Home }} />
    <Route path='/ranking' components={{ body: Ranking }} />
</Route>;