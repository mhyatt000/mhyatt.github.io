function getXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function hoverListener(element){
  element.addEventListener('mouseenter', () => {
    element.style.transform = `scale(${ratio})`;
  });
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'scale(1)';
  });
}

function onHover(xpath=null, alltag=null, ratio=1.1) {
  if (!(xpath || alltag))
    return

  if (xpath) {
      const element = getXpath(xpath)
      hoverListener(element)
  }

  if (alltag){
      const elements = document.getElementsByTagName(alltag)
      for (const element in elements) {
        hoverListener(element)
      }
}

onHover('//i/../../a[1]/i', 1.2)
onHover('//i/../../a[2]/i', 1.2)
onHover('//i/../../a[3]/i', 1.2)
onHover('//i/../../a[4]/i', 1.2)
onHover('//i/../../a[5]/i', 1.2)

onHover('//nav/*[2]/*', 1.2)

onHover('//button[1]')
