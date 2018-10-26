/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.

  //Form select use chosen
  //$('.form-select').chosen();

  // var jsClassActive = 'is-active',
  //     $jsTogleMenu = $('.js-open-menu'),
  //     $jsBtnClick = $('.js-btn-menu', $jsTogleMenu);
  //     $jsOpenMenu = $jsBtnClick.next('.menu-settings__list');
  // $jsBtnClick.on('click', function(){
  //   // if ($jsOpenMenu.hasClass(jsClassActive)) {
  //   //   $jsOpenMenu.removeClass(jsClassActive);
  //   // }
  //   // else {
  //   //   $jsOpenMenu.addClass(jsClassActive);
  //   // }
  //   $(this).toggleClass(jsClassActive);
  //   $(this).next().addClass(jsClassActive);
  // });

  // $(document).on('touchstart click', function (e) {
  //   if ($jsOpenMenu.has(e.target).length === 0 && $jsOpenMenu.hasClass(jsClassActive)) {
  //     console.log('remove');
  //     $jsOpenMenu.removeClass(jsClassActive);
  //   }
  // });

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
  showHiddenFunction($jsMenuSettingsBtn, flagMenuSettings, true, false, $menuSettingsList);

}(this, this.document, this.jQuery));
