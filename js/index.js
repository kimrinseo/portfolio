let bgSTATE = null;
let bannerBackground = {
  initBG:"#ffffff",
  BlackB:"#ffdfdf",
  cat:"#fff7d9",
  Zero:"#abdffa",
  Attendance:"#3d3578",
  gift:"#ffa848",
  Nike:"#000000",
  HalloweenB:"#38223d",
  Skin:"#e2e2e2",
}
let popupState = false;

$(function(){
  $(".link_none").click(function(e){
    e.preventDefault(); //a태그의 기본 기능 제거
  })

  $(window).scroll(function(){
    let scT = $(this).scrollTop()
    $(".title>figure img:nth-of-type(1)").css("top",scT*0.8)
    $(".title>figure img:nth-of-type(2)").css("top",scT*0.6)
    $(".title>figure img:nth-of-type(3),.rainbow").css("top",scT*0.4)
  })

  $(document).mousemove(function(e){
    let posX = e.clientX
    let posY = e.clientY

    $(".cursor").css("display","block")
    $(".cursor").css("top",posY).css("left",posX)

  });

  cursorTrans("a")
  cursorTrans(".gnb>li")

  $("nav>ul>li>a").click(function(e){
    e.preventDefault(); //a태그의 기본 기능 제거
    let targetHref = $(this).attr("href")
    let posTop = $(targetHref).offset().top;
    $("html,body").stop().animate({scrollTop:posTop},800)
  })

  $(window).scroll(function(){
    let scrollT = $(window).scrollTop();
    let winT = window.innerHeight
    let tC = getTop(".title")
    let pfC = getTop(".porofile")
    let pgC = getTop(".program")
    let deC = getTop(".popup_title")
    let reC = getTop(".reDesign_title")
    let conC = getTop(".contact")

    if(pfC-(winT*0.5) <= scrollT && scrollT < pgC+winT || reC <= scrollT && scrollT < $(".reDesign").offset().top+winT){
      naviStyle([".cls-1","nav"],["onG","onB"],{r:160,g:214,b:241},15)
    }else if(getTop(".popup") <= scrollT && scrollT < getTop(".popup")+winT){
      naviStyle([".cls-1","nav"],["onB","onG"],{r:212,g:224,b:184},15)
    }else{
      naviStyle([".cls-1","nav"],["onG","onB"],{r:255,g:255,b:255},15)
      $(".cls-1").removeClass("onB")
    }

    $("nav li").removeClass("on")

    if (scrollT >= tC && scrollT < tC +winT) {
      $("nav li").eq(0).addClass("on")
    }else if (scrollT >= pfC && scrollT < pfC+winT) {
      $("nav li").eq(1).addClass("on")
    }else if (scrollT >= pgC && scrollT < pgC+winT) {
      $("nav li").eq(2).addClass("on")
    }else if (scrollT >= deC && scrollT < getTop(".banner")) {
      $("nav li").eq(3).addClass("on")
    }else if (scrollT >= reC && scrollT < getTop(".reDesign")+winT) {
      $("nav li").eq(4).addClass("on")
    }else if (scrollT >= conC) {
      $("nav li").eq(5).addClass("on")
    }

    if(scrollT == getTop(".banner")){
      clickPath();
      setTimeout(function(){
        $(".chrome").addClass("on")
      },2000)

    }else{
      $(".click svg path").each(function(){
        let pathLength = $(this).get(0).getTotalLength();

        $(this).css("transition","all .1 ease 0s")
        $(this).css("stroke-dashoffset",pathLength)
        $(this).css("fill","transparent")
      })
        $(".chrome").removeClass("on")
    }

  });

  clickPath();


  $(".click").mousemove(function(e){
    let posX = e.clientX
    let posY = e.clientY

    $(".color_cursor").css("display","block")
    $(".color_cursor").css("top",posY-200).css("left",posX-200)

  });


  // let backOn = $(".viewT").find(".active").attr("data-text")

  initBG(bannerBackground);

  $(".chrome").click(function(){
    $(".browser").addClass("on")

    if($(".browser").attr("class") == "browser on"){
      $(".banner").css("background",bannerBackground[bgSTATE])
    }
  })

  $(".gnb>li").each(function(){
    $(this).click(function(){
      let idx = $(this).index()
      // console.log(idx);
      bannerSlide.slideTo(idx,1000)

      $(".viewP li").removeClass("on")
      $(".viewT li").removeClass("active")
      $(".viewP li").eq(idx).addClass("on")
      $(".viewT li").eq(idx).addClass("active")
      $(".gnb>li").removeClass("on")
      $(this).addClass("on")
    })
  })

  $(".reDesign_go").click(function(){
    $(".reDesign").addClass("on")
    $(".design").addClass("on")
  })

  $(".browser .close").click(function(){
    initBG(bannerBackground);
    $(".browser").removeClass("on")
  })

  $(".design .close").click(function(){
    $(".reDesign").removeClass("on")
    $(".design").removeClass("on")
  })

  let progressState = false;

  $(window).scroll(function(){
    let scrollTop = $(window).scrollTop();

    if(scrollTop>=$(".program").offset().top){
      if(progressState==false){
        progressState = programProgress()
      }
    }
  })

  let num = 1;
  let liLength = $(".popup>ul>li").length

  $(".popup").on("wheel DOMMouseScroll",function(event){
    // console.log("popup에서실행")
    let E = event.originalEvent;
    let delta = 0;
    if(E.detail){
      delta = E.detail = -40;
    }else{
      delta = E.wheelDelta;
    }

    if(delta>0){
      //마우스 휠을 올렸을 때
      if(num==1){
        popupState=true
      }else{
        popupState=false
      }
      num--
      if(num < 1){
        num = 1
      }
      showPopup(num)
    }else{
      //마우스 휠을 내렸을 때
      if(num == liLength){
        popupState=true
      }else{
        popupState=false
      }
      num++
      if(num > liLength){
        num = liLength
      }
      showPopup(num)
    }
  })

  $(".all_contents>div").on("wheel DOMMouseScroll",function(event){
    // console.log("전체div에서실행")
    let E = event.originalEvent;
    let delta = 0;
    if(E.detail){
      delta = E.detail = -40;
    }else{
      delta = E.wheelDelta;
    }

    // console.log($(this).attr("class"))
    if($(this).attr("class")=="reDesign on"){
      return
    }
    // console.log($(this).attr("class"))
    // 추적을 해보는 게 중요! 코딩은 집착!!!집착!

    if($(this).attr("class")=="popup" && popupState==false){
      return false
    }


    if(delta>0){
      //마우스 휠을 올렸을 때
      let posTop = $(this).prev().offset().top;
      $("html,body").stop().animate({scrollTop:posTop},800)
    }else{
      //마우스 휠을 내렸을 때
      let posTop = $(this).next().offset().top;
      $("html,body").stop().animate({scrollTop:posTop},800)
    }

    return false
  })


  $(".reDesign .hover").mouseover(function(){

    let imgH = $(this).find("img").height();
    let hoberH = $(this).height();

    $(".hover img").css("transform","translateY("+-(imgH-hoberH)+"px)")
  })

  $(".reDesign .hover").mouseleave(function(){
    $(".hover img").css("transform","translateY(0)")
  })

  setInterval(function(){
    if($(".try>p").attr("class")=="on"){
      $(".try>p").removeClass("on")
    }else{
      $(".try>p").addClass("on")
    }
  },2000)

  setSvg(".rainbow",getRainbowSvg)
  $(".rbSet>path").each(function(i){
    let _this = $(this);
    let pathLength = $(this).get(0).getTotalLength()
    $(this).css("stroke-dasharray",pathLength)
    // $(this).css("opacity",0.5)
    $(this).css("stroke-dashoffset",pathLength)
    setTimeout(function(){
      _this.css("transition",`all 3s ease 0.${i}s`)
      _this.css("stroke-dashoffset",0)
    },1000)
  })







})
