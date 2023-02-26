function clickPath(){
  $(".click svg path").each(function(){
    let pathLength = $(this).get(0).getTotalLength();
    let randomDelay = Math.random();
    // console.log("각 패스의 길이"+pathLength)
    $(this).css("stroke-dasharray",pathLength)
    $(this).css("stroke-dashoffset",pathLength)
    let _this = $(this);

    setTimeout(function(){
     _this.css("transition","stroke-dashoffset 1s ease 0s, fill 1s ease "+(randomDelay+1)+"s");
     _this.css("stroke-dashoffset",0)
     _this.css("fill","rgb(197 248 255)")
   },50)

    setTimeout(function(){
      $(".chrome").addClass("on")
    },1000)

  })
}

function programProgress(){
  $(".program .bar").each(function(){
    let num = 0
    let percent = Number($(this).find(".per").text());
    let _this = $(this);
    let timer = setInterval(function(){
      if(num<percent){
        num++
        _this.find(".per").text(num)
        _this.css("width",percent+"%")
      }else{
        clearInterval(timer)
      }
    },10)
    $(this).css("opacity","1")
  })
  return true;
}

function cursorTrans(selec) {
  $(selec).mouseover(function(){
    $(".cursor>img").attr("src","./img/icon/click.png")
    $("a").css("cursor","none")
  })
  $(selec).mouseleave(function(){
    $(".cursor>img").attr("src","./img/icon/cursor.png")
  })
}

function initBG(bgobj){
  $(".banner").css("background",bgobj.initBG)
}

function changeBG(bgobj,key){
  $(".banner").css("background",bgobj[key])
}

function showPopup(idx){
  $(".popup li").removeClass("on")
  for(let i=0 ; i<idx ; i++){
    $(".popup li").eq(i).addClass("on")
  }
}

function getTop(selector){
  return $(selector).offset().top
}

function naviStyle(array,classN,color,opacity){
  $(array[0]).removeClass(classN[0])
  $(array[0]).addClass(classN[1])
  $(array[1]).css("background",`rgb(${color.r} ${color.g} ${color.b} / ${opacity}%)`)
  $(array[1]).find("p").css("color",`rgb(${color.r} ${color.g} ${color.b})`)
}
