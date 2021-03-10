
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
const commitSHA = 'commit-sha-in-here';   //
// ------------------------------------------------------------ //

const App = ({data, template}) => {
  console.log(data)
  console.log(template)

  // Clone template
  const clone = template.content.cloneNode(true)

  // Set header
  const header = clone.querySelector('.header')
  header.textContent = data.name

  // Get <p> elements from content and corresponding parts from data object
  const contentParts = clone.querySelector('.content').querySelectorAll('p')
  const dataParts = data.parts

  let exercises = 0;
  let i;
  for (i = 0; i < dataParts.length; i++) {
    // There should be as many <p> elements as parts in data
    // but just in case, check to prevent over indexing
    if (i >= contentParts.length) {
      break
    }

    exercises += dataParts[i].exercises
    const text = dataParts[i].name + ' ' + dataParts[i].exercises
    contentParts[i].textContent = text
  }

  // Set total number of exercises
  const total = clone.querySelector('.total')
  const text = ' ' + exercises
  total.textContent += text

  return clone

};
