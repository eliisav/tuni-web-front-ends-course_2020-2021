
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
const commitSHA = '19c09bb';   //
// ------------------------------------------------------------ //

const App = ({data, template}) => {

  let clone = template.content.cloneNode(true);

  let h1Element = clone.querySelector(".header");
  let contentDiv = clone.querySelector(".content");
  let partPElements = contentDiv.querySelectorAll("p")
  let pElement = clone.querySelector(".total");

  h1Element.textContent = data.name;

  partPElements[0].textContent = `${data.parts[0].name} ${data.parts[0].exercises}`
  partPElements[1].textContent = `${data.parts[1].name} ${data.parts[1].exercises}`
  partPElements[2].textContent = `${data.parts[2].name} ${data.parts[2].exercises}`

  const exerciseSum = data.parts[0].exercises + data.parts[1].exercises + data.parts[2].exercises;
  pElement.textContent = `Number of exercises ${exerciseSum}`

  return clone;
};
