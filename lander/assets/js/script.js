/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.

  //Form select use chosen
  $('.form-select').chosen({
    disable_search_threshold: 10
  });

  var showHiddenFunction = function (btn, flag, clickOutside, dropDown, childSelector) {
    var $btn = btn,
        $parent = $btn.parent(),
        $childSelector = childSelector;
    dropDown = dropDown === true ? true : false;
    clickOutside = clickOutside === false ? false : true;
    $btn.off('click');
    $btn.on('click', function (e) {
      e.preventDefault();
      if (!$parent.hasClass(flag)) {
        $parent.addClass(flag);
        if (dropDown === true) {
          $childSelector.slideDown("slow");
        }
      }
      else {
        $parent.removeClass(flag);
        if (dropDown === true) {
          $childSelector.slideUp("slow");
        }
      }
    });
    if (clickOutside === true) {
      $(document).on('click', function (e) {
        if ($parent.has(e.target).length === 0 && $parent.hasClass(flag)) {
          $parent.removeClass(flag);
          if (dropDown === true) {
            $childSelector.slideUp("slow");
          }
        }
      });
    }
  };

  var flagMenuSettings = 'open',
      $jsItem = $('.grid-content__item'),
      $jsMenu = $('.js-open-menu', $jsItem),
      $jsMenuSettingsBtn = $('.js-btn-menu', $jsMenu),
      $menuSettingsList = $jsMenuSettingsBtn.next('.menu-settings__list');

  var expandedMenuFunc = function (index, e) {
    var $this = $(this),
        $parent = $this.closest('.js-open-menu'),
        $childMenu = $parent.find('.menu-settings__list');
    showHiddenFunction($this, flagMenuSettings, true, false, $menuSettingsList);
  }
  $jsMenuSettingsBtn.each(expandedMenuFunc);

  var $jsBtnMobile = $('.menu-toggle-wrap'),
      $jsBtnClick = $('.expanded-menu > a'),
      $jsMenuChild = $('.expanded-menu__menu-child');
    showHiddenFunction($jsBtnClick,flagMenuSettings, true, false, $jsMenuChild);

    var widthScreen = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
    if(widthScreen < 768) {
      showHiddenFunction($jsBtnMobile, flagMenuSettings, true, false, $jsMenuChild);
    }

    $(window).on('load', function () {
      var $table = $('table', document);
      if ($table.length && !$table.parent().hasClass('table-responsive')) {
        $table.not($table.find('table')).wrap('<div class="table-responsive"></div>');
      }
    });

  // Include html file in html
  // var includes = $('[data-include]');
  //   jQuery.each(includes, function(){
  //     var file = 'assets/components/' + $(this).data('include') + '.html';
  //     $(this).load(file);
  //   });

}(this, this.document, this.jQuery));
