import MapSvg from './img/icon/map.svg';
document.addEventListener('DOMContentLoaded', function () {
// burger \\
  const menu = document.getElementsByClassName("header__list")[0];
  const burger = document.getElementsByClassName("header__gamburger")[0];
  const menuClose = document.getElementsByClassName("header__gamburger-close")[0];

  function toggleMenu() {
    var clazz = 'menu_opened';
    if (menu.classList.contains(clazz)) {
      menu.classList.remove(clazz);
    } else {
      menu.classList.add(clazz);
    }
  }

  burger.addEventListener('click', toggleMenu);
  menuClose.addEventListener('click', toggleMenu);

// slider \\

  const prev = document.querySelector(".slider__button--prev");
  const next = document.querySelector(".slider__button--next");
  const slider = document.querySelector(".slider__content");
  const blocks = document.querySelectorAll(".slider__block");



  let blockIndex = 0;
  let step = 100;

  prev.addEventListener("click", goPrev);
  next.addEventListener("click", goNext);
  
  function goNext() {
    if (blocks.length - 1 > blockIndex) {
      blockIndex ++;
    } else {
      blockIndex = 0;
    }
    slider.style.right = (step * blockIndex) + "%";
  }

  function goPrev() {
    if (blockIndex > 0) {
      blockIndex --;
    } else {
      blockIndex = (blocks.length - 1);
    }
    slider.style.right = (step * blockIndex) + "%";
  }
});

// slideshow \\

const findBlockByAlias = (alias) => {
  return $(".catalog__item").filter((ndx, item) => {
    return $(item).attr("data-link") === alias;
  });
};

$(".reviews__item").click((e) => {
  e.preventDefault();
  
  const $that = $(e.currentTarget);
  const target = $that.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $that.closest(".reviews__item");

  itemToShow.addClass("catalog__item--active").siblings().removeClass("catalog__item--active");
  curItem.addClass("reviews__item--active").siblings().removeClass("reviews__item--active");
});

// team

$(".team__item").click((e) => {
  const el = $(e.currentTarget);
  const classActive = "team__item--onClick";
  const classForVisibleImage = "team__item--imageOnly"
  
  el.siblings().removeClass(classActive).removeClass(classForVisibleImage);
  
  if (el.hasClass(classActive)) {
  el.removeClass(classActive);
  el.addClass(classForVisibleImage)
  } else {
  el.addClass(classActive);
  }
  
  e.preventDefault();
  });

//form 
const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() == "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");
  return errorFields.length == 0;
}

$(".form").submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $(".modal");
  const content = modal.find(".modal__content");

  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
  const Request = $.ajax({
    url: "https://webdev-api.loftschool.com/sendmail",
    method: "post",
    data: {
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: to.val(),
    },
  });
  Request.done((data) => {
    content.text(data.message);
  });
  Request.fail(data => {
    const message = data.responseJSON.message;
    content.text(message);
    modal.addClass("error-modal");
  });
  Request.always(() => {
    $.fancybox.open({
      src: ".modal",
      type: "inline"
    });
  });
 }
});
$(".modal--btn--close").click((e) => {
  e.preventDefault();
  $.fancybox.close();
});
// accordion 
const mesureWidth = item => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".accordion__list");
  const titlesBlocks = container.find(".accordion__item-trigger");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

const textContainer = item.find(".accordion__content");
const paddingLeft = parseInt(textContainer.css("padding-left"));
const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesBlocks.width();
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingLeft - paddingRight
  }
};

const closeEveryItem = container => {
  const items = container.find(".accordion__item");
  const content = container.find(".accordion__item-text")

items.removeClass("accordion__item-text--active");
content.width(0);
};

const openItem = item => {
  const hiddenContent = item.find(".accordion__item-text");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".accordion__content");


item.addClass("accordion__item-text--active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$(".accordion__item").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".accordion__item");
  const itemOpen = item.hasClass("accordion__item-text--active")
  const container = $this.closest(".accordion__list");
  if (itemOpen) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem(item);
  }

});
$(".accordion__close").on("click", e => {
  e.preventDefault();
  closeEveryItem($(".accodion__list"));
});

// player
let video;
let durationControl;
let soundControl;
let intervalId;
let soundLevel;

$().ready(function(){
  video = document.getElementById("player");

  video.addEventListener("click", playStop);

  let playButtons = document.querySelectorAll(".play");
  for (let i = 0; i < playButtons.length; i++){
    playButtons[i].addEventListener("click", playStop);
  }

  let MicControl = document.getElementById("mic");
  MicControl.addEventListener("click", soundOf)

  durationControl = document.getElementById("durationLevel");
  durationControl.addEventListener("click",setVideoDuration);
  durationControl.addEventListener("onmousemove", setVideoDuration);
  durationControl.addEventListener("mousedown", stopInterval);
  durationControl.min = 0;
  durationControl.value = 0;

  soundControl = document.getElementById("micLevel");
  soundControl.addEventListener("click", changeSoundVolume);
  soundControl.addEventListener("onmousemove", changeSoundVolume);

  soundControl.min = 0;
  soundControl.max = 10;

  soundControl.value = soundControl.max;

  video.addEventListener("ended", function(){
    $("video__player-img").toggleClass("video__player-img--active");
    video.currentTime = 0;
  }, false);
});

function playStop(){
  $(".video__player-img").toggleClass("video__player-img--active");
  durationControl.max = video.duration;

  if (video.paused){
    video.play();
    intervalId = setInterval(updateDuration,1000/66)
    $(".duration__img").addClass("duration__img--active")
  }else {
    video.pause();
    clearInterval(intervalId);
    $(".duration__img").removeClass("duration__img--active")
  }
}


function stopInterval() {
  video.pause();
  clearInterval(intervalId);
}

function setVideoDuration(){
  if (video.paused){
    video.play();
  } else {
    video.pause();
  }
  video.currentTime = durationControl.value;
  intervalId = setInterval(updateDuration,1000/66);
}

function updateDuration(){
durationControl.value = video.currentTime;
}

function soundOf() {
  if (video.volume === 0){
    video.volume = soundLevel;
    soundControl.value = soundLevel*10;
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
}

function changeSoundVolume() {
    video.volume = soundControl.value/10;
}


// map
let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.751999, 37.576133],
   zoom: 13,
   controls: [],
 });
 
 let coords = [
     [55.751999, 37.576133],
     [55.754294, 37.587533],
     [55.749334, 37.579178],
     [55.756462, 37.569953],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: MapSvg,
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52]
    });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
ymaps.ready(init);


// onepagescroll
const sections = $("section");
const display = $(".main__content");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let  inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  return sectionEq * -100;
}

const performTransition = sectionEq => {

  if (inScroll == false) {
    inScroll = true;

    const position = countSectionPosition(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });
    sections.eq(sectionEq)
    .addClass("active")
    .siblings()
    .removeClass("active");

    const sideMenu = $(".fixed-menu__list");
    
      setTimeout(()=> {
        inScroll = false;

        sideMenu
        .find(".fixed-menu__item")
        .eq(sectionEq)
        .addClass("fixed-menu__item--active")
        .siblings()
        .removeClass("fixed-menu__item--active");
      }, 700);  
  }
};

const ViewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

return {
  next() {
    if (nextSection.length) {
      performTransition(nextSection.index());
    }
  },
  prev() {
    if (prevSection.length) {
      performTransition(prevSection.index());
    }
  },
 };
};

$(window).on ("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = ViewportScroller();
  if (deltaY > 0) {
    scroller.next();
  }
  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", (e) => {

 const tagName = e.target.tagName.toLowerCase();
 const scroller = ViewportScroller();
 const userTypingInputs = tagName == "input" || tagName == "textarea";

 if (userTypingInputs) return 
  switch (e.keyCode) {
    case 38: 
      scroller.prev();
    break;

    case 40: 
      scroller.next();
    break;
    }

});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target =$this.attr("data-scroll-to");
  const reqSection =$(`[data-section-id=${target}]`);
performTransition(reqSection.index());
})

if (isMobile) {
  $("body").swipe({
   swipe: function (event, direction) {
      const scroller = ViewportScroller();
      let scrollDirection = "";
      if (direction == "up") scrollDirection = "next";
      if (direction == "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    },
  });
}
