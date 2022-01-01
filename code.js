// #region Constants

const REQ_URL = "https://script.google.com/macros/s/AKfycbzcUmkPLXeOB2QyTfCAO6ns2uMhaanMHUBHvEU2a4TYKZsOJTrXZPdgPqK70NHbPpQX/exec";
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
  let request = new XMLHttpRequest();
  let requestBody = JSON.stringify(new Object({token: cookies["Token"], functionName: functionName, paramter: parameter}));
  console.log(requestBody);
  request.open(requestType, REQ_URL);
  request.send(requestBody);   
  return request;
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
