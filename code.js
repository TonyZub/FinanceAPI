// #region Constants

const REQ_URL = "https://script.google.com/macros/s/AKfycbzHcmNqLO4qUYBl7A0C6Me39Fmhvz3ibQzzagtq6YwtDj0-ZfdtVWU9sI1_5qC3wrop/exec";
const NOT_FOUND_URL = "https://tonyzub.github.io/FinanceAPI/notFoundPage"

// #endregion


// #region Fields

var cookies = GetCookies();

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
  let xhr = new XMLHttpRequest();
    xhr.open(requestType, REQ_URL);
    xhr.send(JSON.stringify(new Object({token: cookies["Token"], function: functionName, paramter: parameter})));   
  return xhr;
}

function CheckToken(){
  let request = MakeRequest("POST", "CheckToken");
  request.onload = function() {
    if (request.status != 200) {
      alert("status error");
      console.log(request.status);
    } 
    else {
      let responseJSON = JSON.parse(request.response);
      console.log(responseJSON);
      alert("success");
    };
  };
  request.onerror = function(request) {
    alert("connection error");
  };
}

// #endregion
