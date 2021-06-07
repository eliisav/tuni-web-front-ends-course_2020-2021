
/*******************************
           DO NOT TOUCH         
 *******************************/

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * setAssignmentInfoBanner
 * @param {*} param0 
 */
const setAssignmentInfoBanner = ({ solution, commitSHA }) => {

  /*
   * banner elements
   */
  const assignmentInfo = document.querySelector('#assignment-info');
  const solutionSpan = assignmentInfo.querySelector('#assignment-info .solution');
  const commitShaSpan = assignmentInfo.querySelector('#assignment-info .commit-sha');

  /*
   * banner colors
   */
  const colors = {};
  colors['your-solution'] = 'lightblue';
  colors['solution-to-review-1'] = 'lightgreen';
  colors['solution-to-review-2'] = 'khaki';
  const defaultColor = 'lightgrey';

  /*
   * set banner styles and content
   */
  assignmentInfo.style.backgroundColor = colors[solution] || defaultColor;
  assignmentInfo.style.padding = '5px';
  assignmentInfo.style.fontSize = 'smaller';
  solutionSpan.textContent = solution;
  commitShaSpan.textContent = commitSHA;

}

/**
 * start application
 */
(async () => {

  const { REACT_APP_SOLUTION } = process.env;

  let module;

  switch (REACT_APP_SOLUTION) {
    case 'solution-to-review-1':
    case 'solution-to-review-2':
    case 'your-solution':
      module = await import(`./${REACT_APP_SOLUTION}/app`);
      break;
    default:
      // module = await import('./_stage0/app');
      // module = await import('./_stage1/app');
      // module = await import('./_stage2/app');
      // module = await import('./_stage3/app');
  }

  const { App, commitSHA } = module;
  setAssignmentInfoBanner({ commitSHA, solution: REACT_APP_SOLUTION || 'example' });

  ReactDOM.render(
    // <React.StrictMode>
      <App />
    // </React.StrictMode>
    ,
    document.getElementById('root')
  );

})();

