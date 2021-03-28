
const Myact = {
  
  // We will assume here createElement is called only in correct context.
  createElement: function (tag, props, ...childNodes) {
    // Read the tag and split it to pieces.
    // Let's assume that "tag" always starts with this form (where ElementName changes):
    // "const ElementName = props => {
    //    return React.createElement("
    // So we know that the parameters come after these characters.
    let tagString = tag.toString();
    let indexOfCreateElement = tagString.indexOf("React.createElement(");

    // Now choose the parameter part inside brackets of React.createElement(). Also remove closing brackets from the end.
    let paramString = tagString.substring(indexOfCreateElement + "React.createElement(".length, tagString.length-4);

    // Remove endlines etc.
    let noEndlines = paramString.replace(/(\r\n|\n|\r)/gm, "");

    // Save the parameters to an array by splitting by comma.
    let params = noEndlines.split(',');

    // Trim all the parameters of leading and trailing spaces.
    let trimmedParams = params.map(par => par.trim());

    let tagName = trimmedParams[0].replaceAll("\'", '');
    let propsName = trimmedParams[1].replaceAll("\'", '');

    // Create new HTML element.
    let newItem = document.createElement(tagName);

    // Process children.
    for (let i = 2; i < trimmedParams.length; i++) {
      // Inspect what kind of element the current child to be added is.
      // Case 1: text element, starts with character '. Need to create an HTML text node and append it to parent.
      if (trimmedParams[i][0] == '\'') {
        let textToBeAdded = trimmedParams[i].replaceAll("\'", '');
        let newTxt = document.createTextNode(textToBeAdded);
        newItem.appendChild(newTxt);
      }
      // Case 2: props value to be printed, starts with "props."
      else if (trimmedParams[i].startsWith("props.")) {
        let textToBeAdded = trimmedParams[i];
        let newTxt = document.createTextNode(eval(textToBeAdded));
        newItem.appendChild(newTxt);
      }
      // Case 3: an expression to be evaluated, starts with '('
      else if (trimmedParams[i].startsWith("(")) {
        let toBeEvaluated = trimmedParams[i].substring(1, trimmedParams[i].length-1);
        let newTxt = document.createTextNode(eval(toBeEvaluated));
        newItem.appendChild(newTxt);
      }
      // Case 4: need to create a new element by calling createElement recursively.
      else {
        let splittedString = trimmedParams[i].split('(');
        let elemName = splittedString[0];
        let elemProps = splittedString[1].replaceAll(")", '');

        let elemType;
        // Choose correct element type. 
        if (elemName == "Header") {
          elemType = Header;
        }
        else if (elemName == "Part") {
          elemType = Part;
        } 
        else if (elemName == "Content") {
          elemType = Content;
        }
        else if (elemName == "Total") {
          elemType = Total;
        }
        else if (elemName == "App") {
          elemType = App;
        }

        let newElement = createElement(elemType, eval(elemProps));
        newItem.appendChild(newElement);
      }
    }

    return newItem;
  }
}

const MyactDOM = {

  render: function (element, parent) {
    parent.appendChild(element);
  }

}
