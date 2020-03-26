export function getBrowser(){
    // CHROME
    if (navigator.userAgent.indexOf("Chrome") != -1 ) {
        return "Google Chrome";
      }
      // FIREFOX
      else if (navigator.userAgent.indexOf("Firefox") != -1 ) {
        return "Mozilla Firefox";
      }
      // INTERNET EXPLORER
      else if (navigator.userAgent.indexOf("MSIE") != -1 ) {
        return "Internet Exploder";
      }
      // EDGE
      else if (navigator.userAgent.indexOf("Edge") != -1 ) {
        return "Internet Explorer";
      }
      // SAFARI
      else if (navigator.userAgent.indexOf("Safari") != -1 ) {
        return "Safari";
      }
      // OPERA
      else if (navigator.userAgent.indexOf("Opera") != -1 ) {
        return "Opera";
      }
      // OTHER
      else {
        return "Other";
      }
}

export function getDevice(){
    if(navigator.userAgent.indexOf("Mobile") != -1 ||
    navigator.userAgent.indexOf("Phone") != -1 || 
    navigator.userAgent.indexOf("Mobi") != -1){
        return "Mobile";
    }else{
        return "Desktop";
    }
}

export async function getUserInformation(){
    return await fetch('http://www.geoplugin.net/json.gp')
    .then(response => response.json())
    .catch(error => console.log(error));
}