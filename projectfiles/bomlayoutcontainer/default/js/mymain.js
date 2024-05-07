// :::::::::::::THEME SWITCHER
const btn = document.querySelector("#themeSwitch");
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark");
  btn.checked = true;
}
btn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  let theme = "light";
  if (document.body.classList.contains("dark")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});

// :::::::::::::STICKY HEADER

$(function () {
  $(window).on("load scroll resize orientationchange", function () {
    if ($(window).scrollTop() < 100) {
      $("header").removeClass("active");
    } else {
      $("header").addClass("active");
    }
  });
});

// STICKY ICONS
$(".floatBtns-fab").click(function () {
  $(".floatBtns-fab").toggleClass("active");
  $(".floatBtns-fab .wrap").toggleClass("ani");
  $(".floatBtns").toggleClass("open");
  $(".img-fab.img").toggleClass("close");
});
// BACK2TOP

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function () {
  var height = $(window).scrollTop();
  if (height > 500) {
    $("#back2Top").fadeIn();
  } else {
    $("#back2Top").fadeOut();
  }
});
$(document).ready(function () {
  $("#back2Top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 2000);
    return false;
  });
});
/*Scroll to top when arrow up clicked END*/

// ***************
// MOBILE HEADER
// ***************

jQuery(document).ready(function ($) {
  //open/close mega-navigation
  $(".cd-dropdown-trigger").on("click", function (event) {
    event.preventDefault();
    toggleNav();
  });

  //close meganavigation
  $(".cd-dropdown .cd-close").on("click", function (event) {
    event.preventDefault();
    toggleNav();
  });

  $(".closebarz").on("click", function (event) {
    event.preventDefault();
    toggleNav();
  });

  //on mobile - open submenu
  $(".has-children")
    .children("a")
    .on("click", function (event) {
      //prevent default clicking on direct children of .has-children
      event.preventDefault();
      var selected = $(this);
      selected
        .next("ul")
        .removeClass("is-hidden")
        .end()
        .parent(".has-children")
        .parent("ul")
        .addClass("move-out");
    });

  //on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
  var submenuDirection = !$(".cd-dropdown-wrapper").hasClass("open-to-left")
    ? "right"
    : "left";
  $(".cd-dropdown-content").menuAim({
    activate: function (row) {
      $(row).children().addClass("is-active").removeClass("fade-out");
      if ($(".cd-dropdown-content .fade-in").length == 0)
        $(row).children("ul").addClass("fade-in");
    },
    deactivate: function (row) {
      $(row).children().removeClass("is-active");
      if (
        $("li.has-children:hover").length == 0 ||
        $("li.has-children:hover").is($(row))
      ) {
        $(".cd-dropdown-content").find(".fade-in").removeClass("fade-in");
        $(row).children("ul").addClass("fade-out");
      }
    },
    exitMenu: function () {
      $(".cd-dropdown-content").find(".is-active").removeClass("is-active");
      return true;
    },
    submenuDirection: submenuDirection,
  });

  //submenu items - go back link
  $(".go-back").on("click", function () {
    var selected = $(this),
      visibleNav = $(this).parent("ul").parent(".has-children").parent("ul");
    selected
      .parent("ul")
      .addClass("is-hidden")
      .parent(".has-children")
      .parent("ul")
      .removeClass("move-out");
  });

  function toggleNav() {
    var navIsVisible = !$(".cd-dropdown").hasClass("dropdown-is-active")
      ? true
      : false;
    $(".cd-dropdown").toggleClass("dropdown-is-active", navIsVisible);
    $(".cd-dropdown-trigger").toggleClass("dropdown-is-active", navIsVisible);
    if (!navIsVisible) {
      $(".cd-dropdown").one(
        "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function () {
          $(".has-children ul").addClass("is-hidden");
          $(".move-out").removeClass("move-out");
          $(".is-active").removeClass("is-active");
        }
      );
    }
  }

  if (!Modernizr.input.placeholder) {
    $("[placeholder]")
      .focus(function () {
        var input = $(this);
        if (input.val() == input.attr("placeholder")) {
          input.val("");
        }
      })
      .blur(function () {
        var input = $(this);
        if (input.val() == "" || input.val() == input.attr("placeholder")) {
          input.val(input.attr("placeholder"));
        }
      })
      .blur();
    $("[placeholder]")
      .parents("form")
      .submit(function () {
        $(this)
          .find("[placeholder]")
          .each(function () {
            var input = $(this);
            if (input.val() == input.attr("placeholder")) {
              input.val("");
            }
          });
      });
  }
});

// FONT SIZE ACCESSIBILITY
$(document).ready(function () {
  $("#sizeUp").click(function () {
    $("html").css("font-size", "110%");
  });

  $("#normal").click(function () {
    $("html").css("font-size", "100%");
  });

  $("#sizeDown").click(function () {
    $("html").css("font-size", "90%");
  });
});

// PAGE PRELOADER

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    $("#panel_left").addClass("panel_left");
    $("#panel_right").addClass("panel_right");
    $("#loader").addClass("loaded-circle");
    $("#loader-img").addClass("loaded-img");
    $("#preloader").addClass("loaded-img");
    setTimeout(function () {
      $("#preloader").hide();
    }, 100);
  }
};

// POPUP
/*jQuery(document).ready(function ($) {

    // window.onload = function (){
    //   $(".bts-popup").delay(1000).addClass('is-visible');
    //   }

    $(window).scroll(function () {
        var height = $(window).scrollTop();
        if (height > 200) {
            $(".bts-popup").addClass('is-visible');
        }
        else {
            // $(".bts-popup").removeClass('is-visible');
        }
        setTimeout(function () {
            $(".bts-popup").hide(500)
        }, 60000);
    });

    //open popup
    $('.bts-popup-trigger').on('click', function (event) {
        event.preventDefault();
        $('.bts-popup').addClass('is-visible');
    });

    //close popup
    $('.bts-popup').on('click', function (event) {
        if ($(event.target).is('.bts-popup-close') || $(event.target).is('.bts-popup')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.bts-popup').removeClass('is-visible');
        }
    });
});*/

// POPUP

jQuery(document).ready(function ($) {
  // window.onload = function (){

  //   $(".bts-popup").delay(1000).addClass('is-visible');

  //   }
  $(window).on("load", function () {
    $("#exampleModal").modal("show");
  });

  $(window).scroll(function () {
    var height = $(window).scrollTop();

    if (height > 200) {
      $(".bts-popup").addClass("is-visible");
    } else {
      // $(".bts-popup").removeClass('is-visible');
    }

    setTimeout(function () {
      $(".bts-popup").hide(500);
    }, 60000);
  });

  //open popup

  $(".bts-popup-trigger").on("click", function (event) {
    event.preventDefault();

    $(".bts-popup").addClass("is-visible");
  });

  //close popup

  $(".bts-popup").on("click", function (event) {
    if (
      $(event.target).is(".bts-popup-close") ||
      $(event.target).is(".bts-popup")
    ) {
      event.preventDefault();

      $(this).removeClass("is-visible");
    }
  });

  //close popup when clicking the esc keyboard button

  $(document).keyup(function (event) {
    if (event.which == "27") {
      $(".bts-popup").removeClass("is-visible");
    }
  });
});

//-------------- customlayout.js ------------
//<!-- Initialize Swiper Homeslider -->
var swiper = new Swiper(".homeslider", {
  centeredSlides: true,
  speed: 1000,
  zoom: true,
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".slider-pagination",
    clickable: true,
  },
});

var swiperhomeicons = new Swiper(".swiper-homeicons", {
  spaceBetween: 10,
  pagination: {
    el: ".homeicons-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    380: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 4,
    },
    778: {
      slidesPerView: 5,
    },
    992: {
      slidesPerView: 3,
    },
    1180: {
      slidesPerView: 4,
    },
    1340: {
      slidesPerView: 5,
    },
  },
});
//<!-- Initialize Swiper Offers -->
var offerswiper = new Swiper(".swiper-offer", {
  lazy: true,
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  pagination: {
    el: ".offer-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".offer-next",
    prevEl: ".offer-prev",
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});
$(".swiper-offer").mouseenter(function () {
  offerswiper.autoplay.stop();
});
$(".swiper-offer").mouseleave(function () {
  offerswiper.autoplay.start();
});

//<!-- --><!------ 01-Sep-2020 ------>
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[tooltip="tooltip"]').tooltip();
});

//---------
//AOS.init();

//<!-- Initialize Swiper Footer -->
var swiperFooter = new Swiper(".swiper-footer", {
  loop: false,
  spaceBetween: 20,
  disableOnInteraction: true,
  speed: 400,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

//<!-- TABBED MENU ON HOVER -->

$(".megamenu .nav a").on("mouseover", function (e) {
  e.preventDefault();
  $(this).tab("show");
});

$(".megamenu").on("mouseover", function (e) {
  e.preventDefault();
  $(".mainoverlay").show();
});

$(".megamenu").on("mouseleave", function (e) {
  e.preventDefault();
  $(".mainoverlay").hide();
});

// $('#personalNav a').on('mouseover', function (e) {
//   e.preventDefault()
//   $(this).tab('show')
// });

$(".dropleft").on("mouseover", function (e) {
  e.preventDefault();
  $(".floverlay").show();
});

$(".dropleft").on("mouseleave", function (e) {
  e.preventDefault();
  $(".floverlay").hide();
});

// ------ for old accordian
//$('.accordion-section-title').click(function (e) {
//    e.preventDefault();
//    var clickhref = $(this).attr('href');
//    var clickid = clickhref.replace('#', '');
//    $('.accordion-section-content').not('#' + clickid).slideUp();
//    $('#' + clickid).slideToggle();
//});
// ------ for old accordian

//-------- Nav Bar
//const slider = document.querySelector('.nav-tabs');
//let isDown = false;
//let startX;
//let scrollLeft;

//slider.addEventListener('mousedown', (e) => {
//    isDown = true;
//    slider.classList.add('active');
//    startX = e.pageX - slider.offsetLeft;
//    scrollLeft = slider.scrollLeft;
//});
//slider.addEventListener('mouseleave', () => {
//    isDown = false;
//    slider.classList.remove('active');
//});
//slider.addEventListener('mouseup', () => {
//    isDown = false;
//    slider.classList.remove('active');
//});
//slider.addEventListener('mousemove', (e) => {
//    if(!isDown) return;
//    e.preventDefault();
//    const x = e.pageX - slider.offsetLeft;
//    const walk = (x - startX) * 1; //scroll-speed
//    slider.scrollLeft = scrollLeft - walk;
//    console.log(walk);
//});

//------------------
//var defaultHeight = 20;
//var text = $(".detdesk");
//var textHeight = text[0].scrollHeight;
//var button = $(".btnread");
//text.css({"max-height": defaultHeight, "overflow": "hidden"});
//button.on("click", function(){
//    var newHeight = 0;
//    if (text.hasClass("active")) {
//        newHeight = defaultHeight;
//        text.removeClass("active");
//    } else {
//        newHeight = textHeight;
//        text.addClass("active");
//    }
//    text.animate({
//        "max-height": newHeight
//    }, 500);
//    console.log(newHeight);
//});

//-------------------------

//---------------------
$(".myaccordion .collapse")
  .on("shown.bs.collapse", function () {
    $(this).parent().find(".fa-angle-down").addClass("anglerotate");
    $(this).parent().find(".btnacc").addClass("btnactive");
  })
  .on("hidden.bs.collapse", function () {
    $(this).parent().find(".fa-angle-down").removeClass("anglerotate");
    $(this).parent().find(".btnacc").removeClass("btnactive");
  });
//-----------------------

//<!--floating menu bg issue-->

$(".cd-dropdown-trigger").click(function () {
  $(".floatingIcons").hide("slow");
});
$(".closebarz ,.cd-close").click(function () {
  $(".floatingIcons").show("slow");
});

function overlayIcon(mywidth) {
  if (mywidth.matches) {
    $(".dropleft .flIcon").click(function () {
      var ariaexp = $(this).attr("aria-expanded");
      if (ariaexp == "true") {
        $(".floverlay").hide();
      } else {
        $(".floverlay").show();
      }
    });

    $(".dropleft").on("mouseover", function (e) {
      e.preventDefault();
      $(".floverlay").show();
    });
    $(".dropleft").on("mouseleave", function (e) {
      e.preventDefault();
      $(".floverlay").hide();
    });
  } else {
    $(".dropleft").on("mouseover", function (e) {
      e.preventDefault();
      $(".floverlay").hide();
    });
  }
}

var mywidth = window.matchMedia("(max-width: 767px)");
overlayIcon(mywidth); // Call listener function at run time
mywidth.addListener(overlayIcon); // Attach listener function on state changes

$(".dropdown-menu").click(function () {
  $(".floverlay").hide();
});
$(".dropleft .flIcon").contextmenu(function () {
  $(".floverlay").hide();
});

//<!--floating menu bg issue-->

$(document).bind("contextmenu", function (e) {
  return false;
});

document.onkeydown = function (e) {
  if (
    e.ctrlKey &&
    (e.keyCode === 67 ||
      e.keyCode === 86 ||
      e.keyCode === 85 ||
      e.keyCode === 117)
  ) {
    return false;
  }
  if (event.keyCode == 123) {
    return false;
  }
  if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    return false;
  }
  if (event.ctrlKey && event.keyCode == 73) {
    return false;
  }
  if (event.ctrlKey && event.shiftKey && event.keyCode == 74) {
    return false;
  }
  if (event.ctrlKey && event.keyCode == 74) {
    return false;
  }
};

var swiperPageslider = new Swiper(".pageslider", {
  centeredSlides: true,
  speed: 600,
  zoom: true,
  effect: "slide",
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  //},
  //pagination: {
  //    el: '.slider-pagination',
  //    clickable: true,
  //},
});

//-----------------------
$(".lastVisitAccordion .collapse")
  .on("shown.bs.collapse", function () {
    $(this).parent().find(".fa-angle-up").addClass("anglerotate");
    $(this).parent().find(".btnacc").addClass("btnactive");
  })
  .on("hidden.bs.collapse", function () {
    $(this).parent().find(".fa-angle-up").removeClass("anglerotate");
    $(this).parent().find(".btnacc").removeClass("btnactive");
  });
//-----------------------

// TOGGLE FOOTER NAVIGATION
$(".toggle").click(function () {
  $("#target").toggle("slow");
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(this).addClass("active");
  }
});
//-------------- mycustom.js ----------------

$(document).ready(function () {
  custompopup();
  newDuealTab();
});

$(".tabs .tabs-menu a").on("click", function (e) {
  var currentAttrValue = $(this).attr("href");

  // Show/Hide Tabs
  $(".tabs " + currentAttrValue)
    .show()
    .siblings()
    .hide();

  // Change/remove current tab to active
  $(this).parent("li").addClass("current").siblings().removeClass("current");

  e.preventDefault();
});

/*Write By Koustov For Saving Deposit Page Custom Tab --- 12-01-2018*/
$(".fcnr_anchor_tab > a").click(function () {
  var anchor_attr = $(this).attr("href");
  $(".fcnr_anchor_tab > a").removeClass("active");
  $(".cus_tab").fadeOut(100);
  $(anchor_attr).fadeIn(300);
  $(this).addClass("active");
  return false;
  //alert(anchor_attr);
});
$(".acordian_list li a").click(function () {
  $(this).parent("li").children("ul").slideToggle(300);
});
$(".acordian_list.acordian_list-msme li a").click(function () {
  $(this).parent().parent("li").children("ul").slideToggle(300);
});
function custompopup() {
  var windowHICu = $(window).height();
  $(".pop-up-director").height(windowHICu);
  $("a#view-profile-1").click(function (open) {
    open.preventDefault();
    $("#modal-1").fadeIn(300);
  });
  $("a#view-profile-2").click(function (open) {
    open.preventDefault();
    $("#modal-2").fadeIn(300);
  });
  $("a#view-profile-3").click(function (open) {
    open.preventDefault();
    $("#modal-3").fadeIn(300);
  });
  $("a#view-profile-4").click(function (open) {
    open.preventDefault();
    $("#modal-4").fadeIn(300);
  });
  $("a#view-profile-5").click(function (open) {
    open.preventDefault();
    $("#modal-5").fadeIn(300);
  });
  $("a#view-profile-6").click(function (open) {
    open.preventDefault();
    $("#modal-6").fadeIn(300);
  });
  $("a#view-profile-7").click(function (open) {
    open.preventDefault();
    $("#modal-7").fadeIn(300);
  });
  $("a#view-profile-8").click(function (open) {
    open.preventDefault();
    $("#modal-8").fadeIn(300);
  });
  $("a#view-profile-9").click(function (open) {
    open.preventDefault();
    $("#modal-9").fadeIn(300);
  });
  $("a#view-profile-10").click(function (open) {
    open.preventDefault();
    $("#modal-10").fadeIn(300);
  });
  $("a#view-profile-11").click(function (open) {
    open.preventDefault();
    $("#modal-11").fadeIn(300);
  });
  $("a#view-profile-12").click(function (open) {
    open.preventDefault();
    $("#modal-12").fadeIn(300);
  });
  $("a#view-profile-13").click(function (open) {
    open.preventDefault();
    $("#modal-13").fadeIn(300);
  });
  $("a#view-profile-14").click(function (open) {
    open.preventDefault();
    $("#modal-14").fadeIn(300);
  });
  $("a#view-profile-15").click(function (open) {
    open.preventDefault();
    $("#modal-15").fadeIn(300);
  });
  $("a#view-profile-16").click(function (open) {
    open.preventDefault();
    $("#modal-16").fadeIn(300);
  });
  $("a#view-profile-17").click(function (open) {
    open.preventDefault();
    $("#modal-17").fadeIn(300);
  });
  $("a#view-profile-18").click(function (open) {
    open.preventDefault();
    $("#modal-18").fadeIn(300);
  });
  $("a#view-profile-19").click(function (open) {
    open.preventDefault();
    $("#modal-19").fadeIn(300);
  });
  $(".pop-up-director .pop-up-inner").click(function (stay) {
    stay.stopPropagation();
  });
  $(".pop-up-director .close-pop-icon, .pop-up-director").click(function (
    close
  ) {
    close.preventDefault();
    $(".pop-up-director").fadeOut(300);
  });
}
function newDuealTab() {
  jQuery("ul.tabs").each(function () {
    var $active,
      $content,
      $links = jQuery(this).find("a");
    $active = jQuery(
      $links.filter('[href="' + location.hash + '"]')[0] || $links[0]
    );
    $active.addClass("active");
    $content = jQuery($active[0].hash);
    $links.not($active).each(function () {
      jQuery(this.hash).hide();
    });
    jQuery(this).on("click", "a", function (e) {
      $active.removeClass("active");
      $content.hide();
      $active = jQuery(this);
      $content = jQuery(this.hash);
      $active.addClass("active");
      $content.show();
      e.preventDefault();
    });
  });
}
$(document).ready(function () {
  $("a.goto-detail").click(function () {
    var targetDiv = $(this).attr("href");
    $("html,body").animate({ scrollTop: $(targetDiv).offset().top }, 1000);
  });
});

//---- Skip to main content
$("#skipToContent").click(function () {
  $("html, body").animate({ scrollTop: 200 }, "slow");
});
