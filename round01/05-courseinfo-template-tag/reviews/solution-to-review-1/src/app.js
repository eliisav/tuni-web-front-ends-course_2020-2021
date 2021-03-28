
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
const commitSHA = '28f5e41';   //
// ------------------------------------------------------------ //

const App = ({data, template}) => {
  // Create a clone from template
  const clone = template.content.cloneNode(true);

  // Set header text
  const header = clone.querySelectorAll('.header');
  header[0].textContent = data.name;

  // Set content text
  const content = clone.querySelectorAll('.content p');
  data.parts.forEach((part, index) => {
    content[index].textContent = `${part.name} ${part.exercises}`;
  });

  // Set total text
  const totalExercises = data.parts.reduce((total, part) => total + part.exercises, 0);
  const total = clone.querySelectorAll('.total');
  total[0].textContent = `Number of exercises ${totalExercises}`

  return clone;
};
