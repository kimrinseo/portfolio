let bannerSlide = null;

$(document).ready(function(){

  // swiper.slideTo(index, speed, runCallbacks)

  bannerSlide = new Swiper(".viewP", {
        navigation: {
          nextEl: ".browser .btn>.next",
          prevEl: ".browser .btn>.prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on:{
          slideChange:function(){
            let idx = this.activeIndex
            // console.log(idx);
            $(".gnb>li").removeClass("on")
            $(".gnb>li").eq(idx).addClass("on")

            $(".viewT li").removeClass("active")
            $(".viewT li").eq(idx).addClass("active")

            bgSTATE = $(".viewT .slide li").eq(idx).attr("data-text")
            changeBG(bannerBackground,bgSTATE)
          },
        },
      });

      


})
