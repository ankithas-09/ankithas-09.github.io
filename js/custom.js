;(function ($, window, document, undefined) {
  'use strict';

  function dismissPreloader() {
    $('.preloader').fadeOut(600);
  }

  // Dismiss as soon as possible — handle both "already loaded" and "still loading"
  if (document.readyState === 'complete') {
    dismissPreloader();
  } else {
    $(window).on('load', dismissPreloader);
    // Safety fallback: always dismiss after 2.5 s regardless of load state
    setTimeout(dismissPreloader, 2500);
  }

  $(document).ready(function () {

    // ── Animate on inview ──────────────────────────────────────
    $('.animated-row').each(function () {
      $(this).find('.animate').each(function (i) {
        var $item = $(this);
        var animation = $item.data('animate');
        $item.on('inview', function (event, isInView) {
          if (isInView) {
            setTimeout(function () {
              $item.addClass('animated ' + animation).removeClass('animate');
            }, i * 60);
          }
        });
      });
    });

    // ── Hamburger (mobile nav) ─────────────────────────────────
    $('#hamburger').on('click', function () {
      $('#navigation').toggleClass('open');
    });

    // Close mobile nav when a link is clicked
    $('.nav-menu a').on('click', function () {
      $('#navigation').removeClass('open');
    });

    // ── FullPage.js ────────────────────────────────────────────
    if ($('.fullpage-default').length) {
      new fullpage('.fullpage-default', {
        licenseKey: 'C7F41B00-5E824594-9A5EFB99-B556A3D5',
        anchors: ['homepage', 'about', 'skills', 'experience', 'projects', 'contact'],
        menu: '#nav',
        navigation: false,
        scrollOverflow: true,
        responsiveWidth: 768,
        responsiveHeight: 500,
        lazyLoad: true
      });
    }

    // ── "Hire Me" → jump to contact via fullpage ──────────────
    $(document).on('click', '#hire-me-btn', function (e) {
      e.preventDefault();
      if (typeof fullpage_api !== 'undefined') {
        fullpage_api.moveTo('contact');
      }
    });

  });

})(jQuery, window, document);
