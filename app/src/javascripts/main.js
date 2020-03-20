(function () {
    'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');


    $(document).ready(function () {
        var bgMusic = $('audio').get(0);
        var $btnMusic = $('.btn-music');
        var $upArrow = $('.up-arrow');

        // background music control
        $btnMusic.click(function () {
            if (bgMusic.paused) {
                bgMusic.play();
                $(this).removeClass('paused');
            } else {
                bgMusic.pause();
                $(this).addClass('paused');
            }
        });

        // init Swiper
        new Swiper('.swiper-container', {
            mousewheelControl: false,
            effect: 'flip',    // slide, fade, coverflow or flip
            speed: 400,
            direction: 'vertical',
            fade: {
                crossFade: true
            },
            coverflow: {
                rotate: 100,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: false     // do disable shadows for better performance
            },
            flip: {
                limitRotation: true,
                slideShadows: true     // do disable shadows for better performance
            },
            onInit: function (swiper) {
                animationControl.initAnimationItems();  // get items ready for animations
                animationControl.playAnimation(swiper); // play animations of the first slide
            },
            onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
                if (swiper.activeIndex === swiper.slides.length - 1) {
                    $upArrow.hide();
                } else {
                    $upArrow.show();
                }
            },
            onTransitionEnd: function (swiper) {       // play animations of the current slide
                animationControl.playAnimation(swiper);
            },
            onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
                if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                    bgMusic.play();
                }
            }
        });

        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp(1000);

        $('.goLink').on('click', function() {
            window.location.href = "https://mp.weixin.qq.com/s?__biz=MzU1Mzc0MTA5Mw==&mid=2247496952&idx=1&sn=8a34675708e0b21dc0982daa64d8e8e6&chksm=fbec8ab2cc9b03a48b840ec0c7c5b0bd21906d4379c81d8ccdae7329f8b0e8f4438ebb65934d&mpshare=1&scene=1&srcid=0319vCBaOMcaGx89uZlF23tU&sharer_sharetime=1584591855746&sharer_shareid=03c54ce6c630f7c975169245ad5e3303&key=e7e5f1c3668833f98ba7a772727d9c19f97e9399a50049dd6700c1e6fe9e662262e1d95b7394b27e3b185e0c980ae2a8da45626f0cfca83f2617f4858c611162d04f83d18e668240a12e64a32d39e586&ascene=1&uin=MjQyMzk0NDU%3D&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=AcUx4BWmMNZbWXmWkG8bWK8%3D&pass_ticket=WNUhqZ7OGjFKnJpHIC0FlH9cq1X4J9AM38l46Cg5ERU%3D"
        })
    });
})();
