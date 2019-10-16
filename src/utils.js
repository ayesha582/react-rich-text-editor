
function countLines(element) {
  var lines = 0;
  var greatestOffset = void 0;
//   console.log(element);
  let eleArr = element.childNodes;
  console.log(eleArr);
  // $element.find('character').each(function(){
  //     if(!greatestOffset || this.offsetTop > greatestOffset){
  //         greatestOffset = this.offsetTop;
  //         ++lines;
  //     }
  // });

  for(let i=0;i<eleArr.length;i++){
      if(eleArr[i].className === 'char-node'){
          if(!greatestOffset || eleArr[i].offsetTop > greatestOffset){
            greatestOffset = eleArr[i].offsetTop;
            ++lines;
          }
      }
  }
  console.log(lines);
  return lines;
}

export function getLines(ele) {
  var lines = 0;
  var clean = ele;
  var dirty = ele.cloneNode(true);

  (function wrapCharacters(node) {
      if (node.nodeType === Node.ELEMENT_NODE && node.className !== 'char-node') {
        //   console.log(node);
      let children = node.childNodes;
    //   console.log(children);
      for (let i = 0; i < children.length; i++) {
        wrapCharacters(children[i]);
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      let textContent = node.textContent.split("");
      textContent.forEach(k => {
        let cNode = document.createElement('span')
        cNode.setAttribute('class','char-node');
        cNode.innerHTML = k;
        node.parentElement.appendChild(cNode);
      });
      node.parentElement.removeChild(node);
      //   node.textContent = node.textContent.replace(
      //     node.textContent,
      //     mapped.join('')
      //   );
      //   console.log(node.textContent, node);
    }
  })(dirty);

  clean.replaceWith(dirty);

  lines = countLines(dirty);

  dirty.replaceWith(clean);

  return lines;
}
