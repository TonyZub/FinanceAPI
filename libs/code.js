// #region Constants

const REQ_URL = "https://script.google.com/macros/s/AKfycbzcUmkPLXeOB2QyTfCAO6ns2uMhaanMHUBHvEU2a4TYKZsOJTrXZPdgPqK70NHbPpQX/exec";
const ROOT_URL = "https://tonyzub.github.io/FinanceAPI/";
const NOT_FOUND_PAGE_URL = "notFound";
const SIGNIN_PAGE_URL = "signin";
const MAIN_PAGE_URL = "main";
const EMAIL_NOTIFICATION_URL = "emailNotification";
const PAGE_TARGETS =
{
  self: "_self",
  blank: "_blank"
}
const PRELOADER_HTML = '<div class="d-flex justify-content-center mt-4"><div class="spinner-border align-self-center d-flex" role="status"><span class="visually-hidden">Loading...</span></div></div>';

// #endregion


// #region Fields

var cookies = GetCookies();
var screenHeight = window.screen.height;
var screenWidth = window.screen.width;
var today = GetTodayDateString();

// #endregion


// #region Functions - Cookies

function GetCookies(){
  return document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
}

function SetCookie(name, value){
  if(name != "") document.cookie = name + "=" + (value || "");
}

// #endregion


// #region Request functions

function MakeRequest(requestType, functionName, parameter){
  let request = new XMLHttpRequest();
  let requestBody = JSON.stringify(new Object({token: cookies["Token"], functionName: functionName, parameter: parameter}));
  request.open(requestType, REQ_URL);
  request.send(requestBody);   
  return request;
}

function CheckToken(isSigning){
  let request = MakeRequest("POST", "CheckToken");
  request.onload = function() {
    if (request.status != 200) {
      console.log(request.status);
      switch(request.status){
        case 404:
          OpenURL(NOT_FOUND_URL, PAGE_TARGETS.self);
          break;
        default:
          alert("Server error occured");
          break;
      }
    } 
    else {
      let responseJSON = JSON.parse(request.response);
      console.log(responseJSON);
      if(responseJSON.isSignedIn){
        OpenURL(MAIN_PAGE_URL, PAGE_TARGETS.self);
      }
      else{
        if(!isSigning) OpenURL(SIGNIN_PAGE_URL, PAGE_TARGETS.self);     
      }
    };
  };
  request.onerror = function(request) {
    alert("Connection error");
  };
}

function OpenURL(URL, target){
  let tab = window.open(URL,target);
  if(target == PAGE_TARGETS.blank) tab.focus();
}

// #endregion


// #region Service functions

function FormatDateForHTML(dateObj){
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  if(month.toString().length == 1) month = "0" + month.toString();
  let date = dateObj.getDate();
  if(date.toString().length == 1) date = "0" + date.toString();
  let string = year + "-" + month + "-" + date;
  return string;
}

function GetTodayDateString(){
  return FormatDateForHTML(new Date());
}

function DelayCall(delegate, seconds, doRepeat){
  return doRepeat ? setInterval(() => {delegate()},seconds * 1000) : setTimeout(() => {delegate()},seconds * 1000); 
}

function GetElementById(id){
  return document.getElementById(id);
}

function GetElementsByClass(className){
  return document.getElementsByClassName(className);
}

function GetELementsByName(name){
  return document.getElementsByName(name);
}

function GetElementsByTagName(tagName){
  return document.getElementsByTagName(tagName);
}

function Titleize(str) {
  let upperString = "";
  for(let i = 0; i < str.length; i++){
    upperString += str.substring(i, i+1).toUpperCase();
  }
  return upperString
}

// #endregion