
/*******************************
           DO NOT TOUCH         
 *******************************/

import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

const setAssignmentInfoBanner = ({ solution, commitSHA }) => {

  const assignmentInfo = document.querySelector('#assignment-info');
  const solutionSpan = assignmentInfo.querySelector('.solution');
  const commitShaSpan = assignmentInfo.querySelector('.commit-sha');

  const colors = {};
  colors['your-solution'] = 'lightblue';
  colors['solution-to-review-1'] = 'lightgreen';
  colors['solution-to-review-2'] = 'khaki';

  /* eslint-disable  
      @typescript-eslint/no-unsafe-assignment, 
      @typescript-eslint/no-floating-promises 
  */

  assignmentInfo.style.backgroundColor = colors[solution];
  solutionSpan.textContent = solution;
  commitShaSpan.textContent = commitSHA;
};

(async () => {

  const { REACT_APP_SOLUTION } = process.env;

  let module;

  switch (REACT_APP_SOLUTION) {
    case 'your-solution':
    case 'solution-to-review-1':
    case 'solution-to-review-2':
      module = await import(`./${REACT_APP_SOLUTION}/App`);
      break;
    default: {
      // module = await import('./_stage0/App');
      // module = await import('./_stage1/app');
      // module = await import('./_stage4/app');
      // module = await import('./_stage8/app');
    }
  }

  const { App, reducer, StateProvider, commitSHA } = module;
  setAssignmentInfoBanner({ commitSHA, solution: REACT_APP_SOLUTION || 'example' });

  ReactDOM.render(
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>,
    document.getElementById('root')
  );

})();
