import { fromEvent } from 'rxjs';
import * as sidebarFn from '../sidebar/sidebar';

export function localStorageBackUp() {
  let html = document.querySelector('html')?.style;
  let body = document.querySelector('body');
  if (localStorage.getItem('Slicalight-primary-color') !== null) {
    body?.classList.add('light-mode');
    let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;

    body?.classList.remove('dark-mode');
    html?.setProperty('--primary-bg-color',localStorage.getItem('Slicalight-primary-color'));
    html?.setProperty('--primary-bg-hover', localStorage.getItem('Slicalight-primary-hover'));
    html?.setProperty( '--primary-bg-border', localStorage.getItem('Slicalight-primary-border'));
  }
  if (localStorage.getItem('Slicadark-primary-color') !== null) {
    body?.classList.add('dark-mode');
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;

    body?.classList.remove('light-mode');
    html?.setProperty('--primary-bg-color', localStorage.getItem('Slicadark-primary-color'));
    html?.setProperty('--primary-bg-hover', localStorage.getItem('Slicadark-primary-hover'));
    html?.setProperty('--primary-bg-border', localStorage.getItem('Slicadark-primary-border'));
  }
  if (localStorage.getItem('Slicadark-body') !== null) {
    body?.classList.add('dark-mode');
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;

    body?.classList.remove('light-mode');
    html?.setProperty('--dark-body', localStorage.getItem('Slicadark-body'));
    body?.classList.remove('light-mode');
    html?.setProperty('--dark-theme', localStorage.getItem('Slicadark-theme'));
  }

  if (localStorage.getItem('Slicadark-theme') !== null) {
    body?.classList.add('dark-mode');
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;


  }
  if (localStorage.getItem('SlicaBgImage') !== null) {
    body?.classList.add('dark-mode');
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;

    body?.classList.remove('light-mode');
    let BgImage:any = localStorage.getItem('SlicaBgImage')
    body?.classList.add(BgImage)
  }

  if(localStorage.getItem('Slicalight-theme') !== null){
    body?.classList.add('light-mode');
    let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;
  }
  if(localStorage.getItem('Slicadark-theme') !== null){
    body?.classList.add('dark-mode');
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;
  }

  if(localStorage.getItem('Slicartl')){
    let rtl = document.getElementById('myonoffswitch55') as HTMLInputElement;
    rtl.checked = true;
    console.log(rtl.checked);
    let styleId = document.querySelector('#style');
    document.querySelector('body')?.classList.add('rtl')
    document.querySelector('html')?.setAttribute('dir', 'rtl')
    styleId?.setAttribute('href','./assets/plugins/bootstrap/css/bootstrap.rtl.css');
    //remove
    body?.classList.remove('ltr');
    sidebarFn.checkHoriMenu();
  }
  if(localStorage.getItem('Slicahorizontal') !== null){
    let horizontal = document.getElementById('myonoffswitch35') as HTMLInputElement;
    horizontal.checked = true;
    let mainContent: any = document.querySelector('.main-content');
    let mainContainer: any = document.querySelectorAll('.main-container');
    let appSidebar: any = document.querySelector('.app-sidebar');
    let header: any = document.querySelector('.header');
    let mainSidemenu: any = document.querySelector('.main-sidemenu');
    let sideMenu: any = document.querySelector('.horizontal .side-menu');
    //add
    body?.classList.add('horizontal');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; },i: any)=>{
      e.classList.add('container')
    })
    header?.classList.add('hor-header');
    appSidebar?.classList.add('horizontal-main');
    mainSidemenu?.classList.add('container');
    sideMenu?.classList.add('flex-nowrap');
    // // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; },i: any)=>{
      e.classList.remove('container-fluid')
    })
    // header?.classList.remove('app-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');
    body?.classList.remove('horizontal-hover');
    let li = document.querySelectorAll('.side-menu li');
    li.forEach((e, i) => {
      e.classList.remove('is-expanded');
    });
    sidebarFn.checkHoriMenu();
    setTimeout(()=>{
      sidebarFn.parentNavActive();
    }, 300)
  }
  if(localStorage.getItem('SlicahorizontalHover') !== null){
    let horizontalHover = document.getElementById('myonoffswitch111') as HTMLInputElement;
    horizontalHover.checked = true;
    let mainContent: any = document.querySelector('.main-content');
    let mainContainer: any = document.querySelectorAll('.main-container');
    let appSidebar: any = document.querySelector('.app-sidebar');
    let header: any = document.querySelector('.header');
    let mainSidemenu: any = document.querySelector('.main-sidemenu');
    let sideMenu: any = document.querySelector('.horizontal .side-menu');
    //add
    body?.classList.add('horizontal');
    body?.classList.add('horizontal-hover');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; },i: any)=>{
      e.classList.add('container')
    })
    console.log(mainContainer);
    header?.classList.add('hor-header');
    appSidebar?.classList.add('horizontal-main');
    mainSidemenu?.classList.add('container');
    sideMenu?.classList.add('flex-wrap');
    // remove
    sideMenu?.classList.remove('flex-nowrap');
    mainContent?.classList.remove('app-content');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; },i: any)=>{
      e.classList.remove('container-fluid')
    })
    // header?.classList.remove('app-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');

    let li = document.querySelectorAll('.side-menu li');
    li.forEach((e, i) => {
      e.classList.remove('is-expanded');
    });
    sidebarFn.checkHoriMenu();
    setTimeout(()=>{
      sidebarFn.parentNavActive();
    }, 300)
  }
}

export function handleThemeUpdate(cssVars: any) {
  const root: any = document.querySelector(':root');
  const keys = Object.keys(cssVars);

  keys.forEach((key) => {
    root.style.setProperty(key, cssVars[key]);
  });
}
// to check the value is hexa or not
const isValidHex = (hexValue: any) =>
  /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue);

const getChunksFromString = (st: any, chunkSize: any) =>
  st.match(new RegExp(`.{${chunkSize}}`, 'g'));
// convert hex value to 256
const convertHexUnitTo256 = (hexStr: any) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);
// get alpha value is equla to 1 if there was no value is asigned to alpha in function
const getAlphafloat = (a: any, alpha: any) => {
  if (typeof a !== 'undefined') {
    return a / 255;
  }
  if (typeof alpha != 'number' || alpha < 0 || alpha > 1) {
    return 1;
  }
  return alpha;
};
// convertion of hex code to rgba code
export function hexToRgba(hexValue: any, alpha = 1) {
  if (!isValidHex(hexValue)) {
    return null;
  }
  const chunkSize = Math.floor((hexValue.length - 1) / 3);
  const hexArr = getChunksFromString(hexValue.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
}

export function dynamicLightPrimaryColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--primary-${item.getAttribute('data-id')}`;
    const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
    const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}

export function dynamicDarkPrimaryColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--primary-${item.getAttribute('data-id')}`;
    const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
    const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}
export function dynamicDarkBodyColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--dark-${item.getAttribute('data-id5')}`;
    const cssPropName1 = `--dark-${item.getAttribute('data-id6')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
    });
  });
}


export function dynamicTrasnsparentPrimary(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--primary-${item.getAttribute('data-id')}`;
    const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
    const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}

export function dynamicBgTrasnsparentPrimaryColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--primary-${item.getAttribute('data-id')}`;
    const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
    const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}

export function dynamicTrasnsparentPrimaryColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--primary-${item.getAttribute('data-id')}`;
    const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
    const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}

export function customClickFn() {
  let body:HTMLBodyElement | any= document.querySelector('body');
  let html: any = document.querySelector('html');
  let ltr: any = document.querySelectorAll('#myonoffswitch54');
  let rtl: any = document.querySelectorAll('#myonoffswitch55');
  let vertical: any = document.querySelectorAll('#myonoffswitch34');
  let horizontal: any = document.querySelectorAll('#myonoffswitch35');
  let horizontalHover: any = document.querySelectorAll('#myonoffswitch111');
  let defaultTheme: any = document.querySelector('#myonoffswitch9');
  let boxed: any = document.querySelector('#myonoffswitch10');
  let fixedLayout: any = document.querySelector('#myonoffswitch11');
  let scrollableLayout: any = document.querySelector('#myonoffswitch12');
  let mainContent: any = document.querySelector('.main-content');
  let mainContainer: any = document.querySelectorAll('.main-container');
  let appSidebar: any = document.querySelector('.app-sidebar');
  let header: any = document.querySelector('.header');
  let mainSidemenu: any = document.querySelector('.main-sidemenu');
  let lightBtn: any = document.getElementById('myonoffswitch1') as HTMLInputElement;
  let darkBtn: any = document.getElementById('myonoffswitch2') as HTMLInputElement;
  let sideMenu: any = document.querySelector('.horizontal .side-menu');
  let lightMenu: any = document.querySelector('#myonoffswitch3');
  let colorMenu: any = document.querySelector('#myonoffswitch4');
  let darkMenu: any = document.querySelector('#myonoffswitch5');

  let lightHeader: any = document.querySelector('#myonoffswitch6');
  let darkHeader: any = document.querySelector('#myonoffswitch8');

  let colorHeader: any = document.querySelector('#myonoffswitch7');

  let styleId = document.querySelector('#style');
  // LTR
  fromEvent(ltr, 'click').subscribe(() => {
    //add
    body?.classList.add('ltr');
    html?.setAttribute('dir', 'ltr');
    styleId?.setAttribute(
      'href',
      './assets/plugins/bootstrap/css/bootstrap.css'
    );
    //remove
    body?.classList.remove('rtl');
    sidebarFn.checkHoriMenu();
    localStorage.setItem('Slicaltr', 'true')
    localStorage.removeItem('Slicartl')
    //localStorage.setItem('lang', 'en');
  });
  // RTL
  fromEvent(rtl, 'click').subscribe(() => {
    //add
    console.log('Hi Lnaguage Clicked');
    body?.classList.add('rtl');
    html?.setAttribute('dir', 'rtl');
    styleId?.setAttribute(
      'href',
      './assets/plugins/bootstrap/css/bootstrap.rtl.css'
    );
    //remove
    body?.classList.remove('ltr');
    sidebarFn.checkHoriMenu();
    localStorage.setItem('Slicartl', 'true')
    localStorage.removeItem('Slicaltr');
    //localStorage.setItem('lang', 'ar');
  });
  // Layouts
  fromEvent(vertical, 'click').subscribe(() => {
    //add
    mainContent?.classList.add('app-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; },i: any)=>{
      e.classList.add('container-fluid')
    })
    header?.classList.add('app-header');
    body?.classList.add('sidebar-mini');
    //remove
    body?.classList.remove('horizontal');
    body?.classList.remove('horizontal-hover');
    appSidebar?.classList.remove('horizontal-main');
    mainSidemenu?.classList.remove('container');
    mainContent?.classList.remove('hor-content');
    header?.classList.remove('hor-header');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; },i: any)=>{
      e.classList.remove('container')
    })
    document.querySelector('.slide-left')?.classList.add('d-none');
    document.querySelector('.slide-right')?.classList.add('d-none');
    document.querySelector('.slide-leftRTL')?.classList.add('d-none');
    document.querySelector('.slide-rightRTL')?.classList.add('d-none');
    localStorage.setItem('SlicasidebarMini', 'true')
    localStorage.removeItem('Slicahorizontal')
    localStorage.removeItem('SlicahorizontalHover')
  });
  fromEvent(horizontal, 'click').subscribe(() => {
    //add
    body?.classList.add('horizontal');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; },i: any)=>{
      e.classList.add('container')
    })
    header?.classList.add('hor-header');
    appSidebar?.classList.add('horizontal-main');
    mainSidemenu?.classList.add('container');
    sideMenu?.classList.add('flex-nowrap');
    // // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; },i: any)=>{
      e.classList.remove('container-fluid')
    })
    // header?.classList.remove('app-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');
    body?.classList.remove('horizontal-hover');
    let li = document.querySelectorAll('.side-menu li');
    li.forEach((e, i) => {
      e.classList.remove('is-expanded');
    });
    sidebarFn.checkHoriMenu();
    setTimeout(()=>{
      sidebarFn.parentNavActive();
    }, 300)
    localStorage.setItem('Slicahorizontal', 'true')
    localStorage.removeItem('SlicahorizontalHorizontal')
    localStorage.removeItem('SlicasidebarMini')

  });
  fromEvent(horizontalHover, 'click').subscribe(() => {
    //add
    body?.classList.add('horizontal');
    body?.classList.add('horizontal-hover');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; },i: any)=>{
      e.classList.add('container')
    })
    console.log(mainContainer);
    header?.classList.add('hor-header');
    appSidebar?.classList.add('horizontal-main');
    mainSidemenu?.classList.add('container');
    sideMenu?.classList.add('flex-nowrap');
    // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; },i: any)=>{
      e.classList.remove('container-fluid')
    })
    // header?.classList.remove('app-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');

    let li = document.querySelectorAll('.side-menu li');
    li.forEach((e, i) => {
      e.classList.remove('is-expanded');
    });
    sidebarFn.checkHoriMenu();
    setTimeout(()=>{
      sidebarFn.parentNavActive();
    }, 300)
    localStorage.setItem('SlicahorizontalHover', 'true')
    localStorage.removeItem('Slicahorizontal')
    localStorage.removeItem('SlicasidebarMini')
  });
  // Theme
  fromEvent(lightBtn, 'click').subscribe(() => {
    lightBtn.checked = true;
    // add
    document.querySelector('body')?.classList.add('light-mode');
    // remove
    document.querySelector('body')?.classList.remove('dark-mode');
    document.querySelector('body')?.classList.remove('bg-img1');
    document.querySelector('body')?.classList.remove('bg-img2');
    document.querySelector('body')?.classList.remove('bg-img3');
    document.querySelector('body')?.classList.remove('bg-img4');
    localStorage.clear();
    localStorage.setItem('Slicalight-theme', 'true')
    localStorage.removeItem('Slicadark-theme')
    console.log('ok');

  });
  fromEvent(darkBtn, 'click').subscribe(() => {
    darkBtn.checked = true;
    // add
    document.querySelector('body')?.classList.add('dark-mode');
    // remove
    document.querySelector('body')?.classList.remove('light-mode');
    document.querySelector('body')?.classList.remove('bg-img1');
    document.querySelector('body')?.classList.remove('bg-img2');
    document.querySelector('body')?.classList.remove('bg-img3');
    document.querySelector('body')?.classList.remove('bg-img4');
    localStorage.clear();
    localStorage.setItem('Slicadark-theme', 'true')
    localStorage.removeItem('Slicalight-theme')
  });
  // layout width  style
  fromEvent(defaultTheme, 'click').subscribe(() => {
    body?.classList.add('layout-fullwidth');
    body?.classList.remove('layout-boxed');
    sidebarFn.checkHoriMenu();
  });
  fromEvent(boxed, 'click').subscribe(() => {
    body?.classList.add('layout-boxed');
    body?.classList.remove('layout-fullwidth');
    sidebarFn.checkHoriMenu();
  });
  // layout position
  fromEvent(fixedLayout, 'click').subscribe(() => {
    body?.classList.add('fixed-layout');
    body?.classList.remove('scrollable-layout');
  });
  fromEvent(scrollableLayout, 'click').subscribe(() => {
    body?.classList.add('scrollable-layout');
    body?.classList.remove('fixed-layout');
  });
  // menu
  fromEvent(lightMenu, 'click').subscribe(() => {
    body?.classList.add('light-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('dark-menu');
    body?.classList.remove('gradient-menu');
  });
  fromEvent(colorMenu, 'click').subscribe(() => {
    body?.classList.add('color-menu');
    body?.classList.remove('light-menu');
    body?.classList.remove('dark-menu');
    body?.classList.remove('gradient-menu');
  });
  fromEvent(darkMenu, 'click').subscribe(() => {
    body?.classList.add('dark-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('light-menu');
    body?.classList.remove('gradient-menu');
  });

  // header
  fromEvent(lightHeader, 'click').subscribe(() => {
    body?.classList.add('header-light');
    body?.classList.remove('color-header');

    body?.classList.remove('dark-header');
  });
  fromEvent(darkHeader, 'click').subscribe(() => {
    body?.classList.add('dark-header');
    body?.classList.remove('header-light');
    body?.classList.remove('color-header');

  });
  fromEvent(colorHeader, 'click').subscribe(() => {
    body?.classList.add('color-header');
    body?.classList.remove('header-light');

    body?.classList.remove('dark-header');
  });

}

export function removeForTransparent() {
  if (document.querySelector('body')?.classList.contains('header-light')) {
    document.querySelector('body')?.classList.remove('header-light');
  }
  // color header
  if (document.querySelector('body')?.classList.contains('color-header')) {
    document.querySelector('body')?.classList.remove('color-header');
  }


  // dark header
  if (document.querySelector('body')?.classList.contains('dark-header')) {
    document.querySelector('body')?.classList.remove('dark-header');
  }

  // light menu
  if (document.querySelector('body')?.classList.contains('light-menu')) {
    document.querySelector('body')?.classList.remove('light-menu');
  }
  // color menu
  if (document.querySelector('body')?.classList.contains('color-menu')) {
    document.querySelector('body')?.classList.remove('color-menu');
  }

  // dark menu
  if (document.querySelector('body')?.classList.contains('dark-menu')) {
    document.querySelector('body')?.classList.remove('dark-menu');
  }
}

export function checkOptions() {
  // light header
  if (document.querySelector('body')?.classList.contains('header-light')) {
    let light = document.getElementById('myonoffswitch6') as HTMLInputElement;
    light.checked = true;
  }
  // color header
  if (document.querySelector('body')?.classList.contains('color-header')) {
    let light = document.getElementById('myonoffswitch7') as HTMLInputElement;
    light.checked = true;
  }

  // dark header
  if (document.querySelector('body')?.classList.contains('dark-header')) {
    let light = document.getElementById('myonoffswitch8') as HTMLInputElement;
    light.checked = true;
  }

  // light menu
  if (document.querySelector('body')?.classList.contains('light-menu')) {
    let light = document.getElementById('myonoffswitch3') as HTMLInputElement;
    light.checked = true;
  }
  // color menu
  if (document.querySelector('body')?.classList.contains('color-menu')) {
    let light = document.getElementById('myonoffswitch4') as HTMLInputElement;
    light.checked = true;
  }

  // dark menu
  if (document.querySelector('body')?.classList.contains('dark-menu')) {
    let light = document.getElementById('myonoffswitch5') as HTMLInputElement;
    light.checked = true;
  }
  if (document.querySelector('body')?.classList.contains('dark-menu')) {
    let light = document.getElementById('myonoffswitch5') as HTMLInputElement;
    light.checked = true;
  }

}

let myVarVal;
export function updateChanges() {
  let primaryColorVal = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-bg-color')
    .trim();

  //get variable
  myVarVal =
    localStorage.getItem('Slicalight-primary-color') ||
    localStorage.getItem('Slicadark-primary-color') ||
    primaryColorVal;

  let colorData1 = hexToRgba(myVarVal, 0.1);
  document.querySelector('html')?.style.setProperty('--primary01', colorData1);

  let colorData2 = hexToRgba(myVarVal, 0.2);
  document.querySelector('html')?.style.setProperty('--primary02', colorData2);
  let colorData3 = hexToRgba(myVarVal, 0.3);
  document.querySelector('html')?.style.setProperty('--primary03', colorData3);

  let colorData6 = hexToRgba(myVarVal, 0.6);
  document.querySelector('html')?.style.setProperty('--primary06', colorData6);
  let colorData9 = hexToRgba(myVarVal, 0.9);
  document.querySelector('html')?.style.setProperty('--primary09', colorData9);

}
updateChanges()
