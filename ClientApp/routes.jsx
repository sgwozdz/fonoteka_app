import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Base } from './components/base/Base';
import { Friends } from './components/friends/Friends';
import { Ranking } from './components/ranking/Ranking';
import { NotFound } from './components/errors/NotFound';

export default <Route path='/' component={Layout}>
    <IndexRoute components={{ body: Home }} />
    <Route path='base' components={{ body: Base }} />
    <Route path='friends' components={{ body: Friends }} />
    <Route path='ranking' components={{ body: Ranking }} />
    <Route path='*' components={{ body: NotFound }} />
</Route>;