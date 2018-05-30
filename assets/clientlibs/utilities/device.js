const htmlEl = $('html');

const dpr = window.devicePixelRatio ||
  (window.screen.deviceXDPI / window.screen.logicalXDPI) || // fallback for IE
  1 // default value
;

export function isRetinaScreen(params) {
  return !!(dpr > 1);
}

export function isIOS() {
  return htmlEl.hasClass('ios');
}

export function isWebkit() {
  return htmlEl.hasClass('webkit');
}

export function isIE() {
  return htmlEl.hasClass('ie');
}

export function isSafari() {
  return htmlEl.hasClass('safari');
}

export function isMobile() {
  return htmlEl.hasClass('mobile');
}

export function isTablet() {
  return htmlEl.hasClass('tablet');
}

export function isDesktop() {
  return htmlEl.hasClass('desktop');
}

export function isBrowser(name) {
  return htmlEl.hasClass(name);
}

export function isLandscape() {
  return htmlEl.hasClass('landscape');
}

export function isAndroid() {
  return htmlEl.hasClass('android');
}

export function deviceType() {
  if(isMobile()) {
    return 'mobile';
  }

  if(isTablet()) {
    return 'tablet';
  }

  if(isDesktop()) {
    return 'desktop';
  }
}

export function getBody() {
  return $(isWebkit() ? 'html, body' : 'html');
}
