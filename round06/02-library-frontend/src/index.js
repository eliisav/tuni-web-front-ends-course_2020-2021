
/*******************************
           DO NOT TOUCH         
 *******************************/

import React from 'react';
import ReactDOM from 'react-dom';

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client' 

const setAssignmentInfoBanner = ({ solution, commitSHA }) => {

  const assignmentInfo = document.querySelector('#assignment-info');
  const solutionSpan = assignmentInfo.querySelector('.solution');
  const commitShaSpan = assignmentInfo.querySelector('.commit-sha');

  const colors = {};
  colors['your-solution'] = 'lightblue';
  colors['solution-to-review-1'] = 'lightgreen';
  colors['solution-to-review-2'] = 'khaki';

  assignmentInfo.style.backgroundColor = colors[solution];
  solutionSpan.textContent = solution;
  commitShaSpan.textContent = commitSHA;
}

(async () => {

  const { REACT_APP_SOLUTION } = process.env;
  const solution = REACT_APP_SOLUTION || 'your-solution';

  let module;

  switch (solution) {
    case 'solution-to-review-1':
      module = await import('./reviews/solution-to-review-1/app');
      break;
    case 'solution-to-review-2':
      module = await import('./reviews/solution-to-review-2/app');
      break;
    case 'your-solution': default:
      module = await import('./your-solution/app');
  }

  const { App, commitSHA } = module;
  setAssignmentInfoBanner({ commitSHA, solution });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({uri: 'http://localhost:4000'})
  });
  
  ReactDOM.render(
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>, 
    document.getElementById('root')
  );
  
})();

