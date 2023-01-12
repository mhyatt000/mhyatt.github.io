function getXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/*
function hoverListener(element, ratio){
  element.addEventListener('mouseenter', 
      () => { 
          element.style.transform = `scale(${ratio})`;
      }, 
      false
  );
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'scale(1)';
  });
}
*/

function onHover(xpath=null, alltag=null, ratio=1.1) {
  console.log('start');
  if (!(xpath || alltag))
    return

  console.log('a');
  if (xpath) {
      const element = getXpath(xpath)
      //hoverListener(element, ratio)
  }

  if (alltag){
      const elements = document.getElementsByTagName(alltag)
      console.log(elements)
      for (const element in elements) 
        console.log(element) 
        //hoverListener(element, ratio)
  }
}

function main(){
    onHover(alltag='i',ratio=1.2)
    /*
    onHover('//i/../../a[1]/i', ratio=1.2)
    onHover('//i/../../a[2]/i', ratio=1.2)
    onHover('//i/../../a[3]/i', ratio=1.2)
    onHover('//i/../../a[4]/i', ratio=1.2)
    onHover('//i/../../a[5]/i', ratio=1.2)

    onHover('//nav/*[2]/*', ratio=1.2)

    onHover('//button[1]')
    */
}

main();
