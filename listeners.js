function getXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function onHover(xpath) {
  const element = getXpath(xpath)

  element.addEventListener('mouseenter', () => {
    element.style.transform = 'scale(1.1)';
  });
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'scale(1)';
  });
}

onHover('//i/../../a[1]/i')
onHover('//i/../../a[2]/i')
onHover('//i/../../a[3]/i')
onHover('//i/../../a[4]/i')


