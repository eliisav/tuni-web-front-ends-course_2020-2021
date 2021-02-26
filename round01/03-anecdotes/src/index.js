
import React from 'react'
import ReactDOM from 'react-dom';

/*******************************
           DO NOT TOUCH         
 *******************************/

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const setAssignmentInfoBanner = ({ solution, commitSHA }) => {

  const assignmentInfo = document.querySelector('#assignment-info');
  const solutionSpan = assignmentInfo.querySelector('.solution');
  const commitShaSpan = assignmentInfo.querySelector('.commit-sha');

  const colors = {};
  colors['your-solution'] = 'lightblue';
  colors['solution-to-review-1'] = 'lightgreen';
  colors['solution-to-review-2'] = 'khaki';

  assignmentInfo.style.backgroundColor = colors[solution];
  solutionSpan.textContent = solution.replace(/\-/g, ' ');
  commitShaSpan.textContent = commitSHA;
}

(async () => {

  const { REACT_APP_SOLUTION } = process.env;
  const solution = REACT_APP_SOLUTION || 'your-solution';

  let module;

  switch (solution) {
    case 'solution-to-review-1':
      module = await import('./components/reviews/solution-to-review-1/App');
      break;
    case 'solution-to-review-2':
      module = await import('./components/reviews/solution-to-review-2/App');
      break;
    case 'your-solution': default:
      module = await import('./components/App');
  }

  const { App, commitSHA } = module;
  setAssignmentInfoBanner({ commitSHA, solution });

  ReactDOM.render(
    <React.StrictMode>
      <App anecdotes={anecdotes} />
    </React.StrictMode>,
    document.getElementById('root')
  );

})();
