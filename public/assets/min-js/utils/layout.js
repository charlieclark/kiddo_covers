var LAYOUT=LAYOUT||{};(function(){function s(){var e=!1;CONFIG.contentWidth<600&&(e=!0),e?u("mobile"):u("desktop")}function o(){var e=null;CONFIG.windowHeight>CONFIG.windowWidth?(e="portrait",t.isLandscape=!1):(e="landscape",t.isLandscape=!0),DETECTION.isTouchDevice&&e&&e!=r&&(r=e,setTimeout(function(){$(window).resize()},500))}function u(e){var t=["desktop","mobile"];if(curLayoutTag!=e){curLayoutTag=e;for(var n=0;n<t.length;n++)$("#content").removeClass(t[n]);$("#content").addClass(curLayoutTag),curLayoutTag=="mobile"?isMobile=!0:isMobile=!1}}function a(e,t){CONFIG.contentWidth=e,CONFIG.contentHeight=t}function f(){CONFIG.windowHeight=$(window).height(),CONFIG.windowWidth=$(window).width();var e=Math.abs(CONFIG.windowWidth-CONFIG.contentWidth),t=Math.abs(CONFIG.windowHeight-CONFIG.contentHeight);(e>10||t>10)&&DETECTION.isTouch()&&DETECTION.isMobile&&(clearTimeout(i),i=setTimeout(function(){l()},500)),CONFIG.contentHeight=CONFIG.windowHeight,CONFIG.contentWidth=CONFIG.windowWidth}function l(){setTimeout(function(){MOBILE.on()},100)}var t=LAYOUT,n=null,r=null,i=null;t.isLandscape=!1,t.init=function(){},t.preResize=function(){f(),s()},t.resize=function(){var e={width:CONFIG.windowWidth,height:CONFIG.windowHeight};$("#content").css(e),a(e.width,e.height),o()}})(LAYOUT);