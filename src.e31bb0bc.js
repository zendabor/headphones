// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"img/icon/map.svg":[function(require,module,exports) {
module.exports = "map.2260a061.svg";
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _map = _interopRequireDefault(require("./img/icon/map.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  // burger \\
  var menu = document.getElementsByClassName("header__list")[0];
  var burger = document.getElementsByClassName("header__gamburger")[0];
  var menuClose = document.getElementsByClassName("header__gamburger-close")[0];

  function toggleMenu() {
    var clazz = 'menu_opened';

    if (menu.classList.contains(clazz)) {
      menu.classList.remove(clazz);
    } else {
      menu.classList.add(clazz);
    }
  }

  burger.addEventListener('click', toggleMenu);
  menuClose.addEventListener('click', toggleMenu); // slider \\

  var prev = document.querySelector(".slider__button--prev");
  var next = document.querySelector(".slider__button--next");
  var slider = document.querySelector(".slider__content");
  var blocks = document.querySelectorAll(".slider__block");
  var blockIndex = 0;
  var step = 100;
  prev.addEventListener("click", goPrev);
  next.addEventListener("click", goNext);

  function goNext() {
    if (blocks.length - 1 > blockIndex) {
      blockIndex++;
    } else {
      blockIndex = 0;
    }

    slider.style.right = step * blockIndex + "%";
  }

  function goPrev() {
    if (blockIndex > 0) {
      blockIndex--;
    } else {
      blockIndex = blocks.length - 1;
    }

    slider.style.right = step * blockIndex + "%";
  }
}); // slideshow \\

var findBlockByAlias = function findBlockByAlias(alias) {
  return $(".catalog__item").filter(function (ndx, item) {
    return $(item).attr("data-link") === alias;
  });
};

$(".reviews__item").click(function (e) {
  e.preventDefault();
  var $that = $(e.currentTarget);
  var target = $that.attr("data-open");
  var itemToShow = findBlockByAlias(target);
  var curItem = $that.closest(".reviews__item");
  itemToShow.addClass("catalog__item--active").siblings().removeClass("catalog__item--active");
  curItem.addClass("reviews__item--active").siblings().removeClass("reviews__item--active");
}); // team

$(".team__item").click(function (e) {
  var el = $(e.currentTarget);
  var classActive = "team__item--onClick";
  var classForVisibleImage = "team__item--imageOnly";
  el.siblings().removeClass(classActive).removeClass(classForVisibleImage);

  if (el.hasClass(classActive)) {
    el.removeClass(classActive);
    el.addClass(classForVisibleImage);
  } else {
    el.addClass(classActive);
  }

  e.preventDefault();
}); //form 

var validateFields = function validateFields(form, fieldsArray) {
  fieldsArray.forEach(function (field) {
    field.removeClass("input-error");

    if (field.val().trim() == "") {
      field.addClass("input-error");
    }
  });
  var errorFields = form.find(".input-error");
  return errorFields.length == 0;
};

$(".form").submit(function (e) {
  e.preventDefault();
  var form = $(e.currentTarget);
  var name = form.find("[name='name']");
  var phone = form.find("[name='phone']");
  var comment = form.find("[name='comment']");
  var to = form.find("[name='to']");
  var modal = $(".modal");
  var content = modal.find(".modal__content");
  modal.removeClass("error-modal");
  var isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    var Request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      }
    });
    Request.done(function (data) {
      content.text(data.message);
    });
    Request.fail(function (data) {
      var message = data.responseJSON.message;
      content.text(message);
      modal.addClass("error-modal");
    });
    Request.always(function () {
      $.fancybox.open({
        src: ".modal",
        type: "inline"
      });
    });
  }
});
$(".modal--btn--close").click(function (e) {
  e.preventDefault();
  $.fancybox.close();
}); // accordion 

var mesureWidth = function mesureWidth(item) {
  var reqItemWidth = 0;
  var screenWidth = $(window).width();
  var container = item.closest(".accordion__list");
  var titlesBlocks = container.find(".accordion__item-trigger");
  var titlesWidth = titlesBlocks.width() * titlesBlocks.length;
  var textContainer = item.find(".accordion__content");
  var paddingLeft = parseInt(textContainer.css("padding-left"));
  var paddingRight = parseInt(textContainer.css("padding-right"));
  var isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesBlocks.width();
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingLeft - paddingRight
  };
};

var closeEveryItem = function closeEveryItem(container) {
  var items = container.find(".accordion__item");
  var content = container.find(".accordion__item-text");
  items.removeClass("accordion__item-text--active");
  content.width(0);
};

var openItem = function openItem(item) {
  var hiddenContent = item.find(".accordion__item-text");
  var reqWidth = mesureWidth(item);
  var textBlock = item.find(".accordion__content");
  item.addClass("accordion__item-text--active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".accordion__item").on("click", function (e) {
  e.preventDefault();
  var $this = $(e.currentTarget);
  var item = $this.closest(".accordion__item");
  var itemOpen = item.hasClass("accordion__item-text--active");
  var container = $this.closest(".accordion__list");

  if (itemOpen) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem(item);
  }
});
$(".accordion__close").on("click", function (e) {
  e.preventDefault();
  closeEveryItem($(".accodion__list"));
}); // player

var video;
var durationControl;
var soundControl;
var intervalId;
var soundLevel;
$().ready(function () {
  video = document.getElementById("player");
  video.addEventListener("click", playStop);
  var playButtons = document.querySelectorAll(".play");

  for (var i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener("click", playStop);
  }

  var MicControl = document.getElementById("mic");
  MicControl.addEventListener("click", soundOf);
  durationControl = document.getElementById("durationLevel");
  durationControl.addEventListener("click", setVideoDuration);
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
  video.addEventListener("ended", function () {
    $("video__player-img").toggleClass("video__player-img--active");
    video.currentTime = 0;
  }, false);
});

function playStop() {
  $(".video__player-img").toggleClass("video__player-img--active");
  durationControl.max = video.duration;

  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 66);
    $(".duration__img").addClass("duration__img--active");
  } else {
    video.pause();
    clearInterval(intervalId);
    $(".duration__img").removeClass("duration__img--active");
  }
}

function stopInterval() {
  video.pause();
  clearInterval(intervalId);
}

function setVideoDuration() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  video.currentTime = durationControl.value;
  intervalId = setInterval(updateDuration, 1000 / 66);
}

function updateDuration() {
  durationControl.value = video.currentTime;
}

function soundOf() {
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
} // map


var myMap;

var init = function init() {
  myMap = new ymaps.Map("map", {
    center: [55.751999, 37.576133],
    zoom: 13,
    controls: []
  });
  var coords = [[55.751999, 37.576133], [55.754294, 37.587533], [55.749334, 37.579178], [55.756462, 37.569953]],
      myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: _map.default,
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52]
  });

  for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);
  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init); // onepagescroll

var sections = $("section");
var display = $(".main__content");
var mobileDetect = new MobileDetect(window.navigator.userAgent);
var isMobile = mobileDetect.mobile();
var inScroll = false;
sections.first().addClass("active");

var countSectionPosition = function countSectionPosition(sectionEq) {
  return sectionEq * -100;
};

var performTransition = function performTransition(sectionEq) {
  if (inScroll == false) {
    inScroll = true;
    var position = countSectionPosition(sectionEq);
    display.css({
      transform: "translateY(".concat(position, "%)")
    });
    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
    var sideMenu = $(".fixed-menu__list");
    setTimeout(function () {
      inScroll = false;
      sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
    }, 700);
  }
};

var ViewportScroller = function ViewportScroller() {
  var activeSection = sections.filter(".active");
  var nextSection = activeSection.next();
  var prevSection = activeSection.prev();
  return {
    next: function next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev: function prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    }
  };
};

$(window).on("wheel", function (e) {
  var deltaY = e.originalEvent.deltaY;
  var scroller = ViewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});
$(window).on("keydown", function (e) {
  var tagName = e.target.tagName.toLowerCase();
  var scroller = ViewportScroller();
  var userTypingInputs = tagName == "input" || tagName == "textarea";
  if (userTypingInputs) return;

  switch (e.keyCode) {
    case 38:
      scroller.prev();
      break;

    case 40:
      scroller.next();
      break;
  }
});
$(".wrapper").on("touchmove", function (e) {
  return e.preventDefault();
});
$("[data-scroll-to]").click(function (e) {
  e.preventDefault();
  var $this = $(e.currentTarget);
  var target = $this.attr("data-scroll-to");
  var reqSection = $("[data-section-id=".concat(target, "]"));
  performTransition(reqSection.index());
});

if (isMobile) {
  $("body").swipe({
    swipe: function swipe(event, direction) {
      var scroller = ViewportScroller();
      var scrollDirection = "";
      if (direction == "up") scrollDirection = "next";
      if (direction == "down") scrollDirection = "prev";
      scroller[scrollDirection]();
    }
  });
}
},{"./img/icon/map.svg":"img/icon/map.svg"}]},{},["index.js"], "moduleName")
//# sourceMappingURL=src.e31bb0bc.js.map