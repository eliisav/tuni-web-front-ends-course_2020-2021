
const Myact = {

  createElement: function (tag, props, ...childNodes) {
    let element;

    if (typeof tag === 'function') {
      element = tag(props)
    } else {
      element = document.createElement(tag)
    }

    element.append(...childNodes)
    console.log(element)
    return element
  }

}

const MyactDOM = {

  render: function (element, parent) {
    console.log(element)
    console.log(parent)

    // Delete the old contents of the parent
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
    
    // Put a new element inside the parent
    parent.append(element)
  }

}
