import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {Login} from './components/account/Login';
import {Register} from './components/account/Register';
import {Profile} from './components/account/Profile';
import {EditProfile} from './components/account/EditProfile';
import {Base} from './components/base/Base';
import {AlbumDetails} from './components/base/AlbumDetails';
import {AddAlbum} from './components/base/AddAlbum';
import {Friends} from './components/friends/Friends';
import {Ranking} from './components/ranking/Ranking';
import {NotFound} from './components/errors/NotFound';
import {NewsCardDetails} from './components/newsCard/NewsCardDetails';
import {AddNews} from './components/newsCard/AddNews';

export default <Route path='/(dialog/:dialog)' component={Layout}>
    <IndexRoute components={{ body: Home }} />
    <Route path="news/details/:id" components={{body: NewsCardDetails}} />
    <Route path="news/add" components={{body: AddNews}} />
    <Route path='login' components={{body: Login}} />
    <Route path='register' components={{body: Register}} />
    <Route path='profile' components={{body: Profile}} />
    <Route path='profile/edit' components={{body: EditProfile}} />
    <Route path='base' components={{ body: Base }} />
    <Route path='album/details/:id' components={{ body: AlbumDetails }} />
    <Route path='album/add' components={{body: AddAlbum}} />
    <Route path='friends' components={{ body: Friends }} />
    <Route path='ranking' components={{ body: Ranking }} />
    <Route path='*' components={{ body: NotFound }} />
</Route>;