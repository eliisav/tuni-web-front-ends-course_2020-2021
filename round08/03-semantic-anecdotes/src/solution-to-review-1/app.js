
import React from 'react'
import { AnecdoteList, Notification, FilterCreateMenu } from './components'

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

export {default as store} from '../redux/store'

// ** enter commit sha of your repository in here **
export const commitSHA = 'e065204';

export const App = () => {
  return (
    <div>
      <Container style={{paddingTop: '50px'}}>
      <FilterCreateMenu />
      <Notification />
      <AnecdoteList />
      </Container>
    </div>
  )
}
