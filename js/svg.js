function getRainbowSvg(){
  return `<svg class="rbSet" viewBox="0 0 160.98 173.6">
    <path class="rb1" d="M11.3,2S144.72,26.34,159,155.6"/>
    <path class="rb2" d="M8.94,6S141,30.34,155.15,159.6"/>
    <path class="rb3" d="M6.6,10S137.39,34.34,151.37,163.6"/>
    <path class="rb4" d="M4.29,14s129.5,24.34,143.33,153.6"/>
    <path class="rb5" d="M2,18S130.21,42.34,143.91,171.6"/>
  </svg>`
}

function setSvg(selector,f){
  $(selector).append(f())
}



// 고차함수
