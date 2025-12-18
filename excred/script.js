  /*
    Program name: script.js
    Author: Hoan My Le
    Date created: 2025-11-14
    Date last edited: 2025-12-10
    Version: 1.0
    Description: MIS 3371 Extra Credit...
*/

function goToPage() 
{
  window.location.href = 'https://bauer.uh.edu/';
}

function review1() {
  var formcontents = document.getElementById("newacct");
  var formoutput;
  var datatype;
  var i;
  formoutput = "<table class='output'><th>Data Name</th><th>Type</th><th>Your Input</th>";
  for (i = 0; i < formcontents.length; i++) {
            console.log("item: "+i+" "+formcontents.elements[i].name+" = "+formcontents.elements[i].value);
            //if (formcontents.elements[i].value !="") {
              datatype = formcontents.elements[i].type;
              switch (datatype) {
                case "checkbox":
                  if (formcontents.elements[i].checked) {
                    formoutput = formoutput + "<tr><td align='right'>"+formcontents.elements[i].name+"</td>";
                    formoutput = formoutput +"<td align='right'>"+ datatype + "</td>";
                    formoutput = formoutput +"<td class='outputdata'>Checked</td></tr>";
                  }
                  break;
               case "radio":
                    if (formcontents.elements[i].checked) {
                      formoutput = formoutput + "<tr><td align='right'>"+formcontents.elements[i].name+"</td>";
                      formoutput = formoutput +"<td align='right'>"+ datatype + "</td>";
                      formoutput = formoutput +"<td class='outputdata'>"+ formcontents.elements[i].value+"</td></tr>";
                    }
                  break;
                case "button": case "submit": case "reset":
                  break;
                default:
                  formoutput = formoutput + "<tr><td align='right'>"+formcontents.elements[i].name+"</td>";
                  formoutput = formoutput +"<td align='right'>"+ datatype + "</td>";
                  formoutput = formoutput +"<td class='outputdata'>"+ formcontents.elements[i].value+"</td></tr>";
              }
  }

   if (formoutput.length>0) { 
      formoutput = formoutput + "</table>";
      document.getElementById("outputformdata").innerHTML = formoutput;
	  document.getElementById("reviewModal").showModal();
   }
}

// Check both passwords match
function checkrepassword() {
    a=document.getElementById("password").value;
    b=document.getElementById("repassword").value;
    if (a==b) 
    {
      document.getElementById("password2_text").innerHTML = "<i>Passwords match!<i>";
    } else
      {
         document.getElementById("password2_text").innerHTML = "<i>Passwords DO NOT match.<i>";
         error_flag = 1;
      }
    }

// Prevent user from entering a future birthday date
document.addEventListener('DOMContentLoaded', function() {
        const bdayInput = document.getElementById('birthday');
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const bdayFormat = `${year}-${month}-${day}`;
        bdayInput.setAttribute('max', bdayFormat);
    });

// Using Fetch API and XML file to load in States dropdown menu
function loadstates() {
	getStates("https://raw.githubusercontent.com/kle2004/MIS3371/refs/heads/main/states.xml");
}
async function getStates(file) {
  let myStates = await fetch(file);
  let myText = await myStates.text();
  document.getElementById("states").innerHTML = myText;
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of nums < 10
  return i;
}

function refreshPage() {
  location.reload(); 
}

function timeAlert() {
    alert('An hour has passed!');
}

// Starting points
function setup()
  {
    let firstnameflag;
    let middleflag;
    let lastnameflag;
    let addr1flag;
    let password1flag;
    let password2flag;
("setting up for the first run...");
    document.getElementById('newacct').addEventListener('input', saveInputs);
    checkCookie();
    getdata1();
  }

function checkfirstname()
    {
        x = document.getElementById("firstname").value;
        firstnameflag=1;  // 1 = set error ON
        if( x.length<2) { 
              document.getElementById("name_message").innerHTML = "First name too short.";  
              error_flag = 1;
        }
        else {
            if (x.match(/[a-zA-Z3-5'-]+$/)) {
              document.getElementById("name_message").innerHTML = "";
              firstnameflag=0; // 0 = set error OFF
              setCookie("fname", x , 1);
            }
            else  {
              document.getElementById("name_message").innerHTML = "Invalid characters in first name.";
              error_flag = 1;
              }
        }
        checkflags();
    }  
function checkmiddle()
    {  
        x = document.getElementById("middleinit").value;
        middleflag=0;   // Not required to set error flag off
        if( x.length>0) { 
              if (x.match(/[a-zA-Z ]/)) {
              document.getElementById("name_message").innerHTML = "";  
            }
            else  {
              document.getElementById("name_message").innerHTML = "Invalid characters in middle name.";
              error_flag = 1;
              middleflag=1;  // Turn on error flag
              }
        } 
        checkflags();
    }
function checklastname()
    {
        x = document.getElementById("lastname").value;
        lastnameflag=1;  // turn on the error since required
        if( x.length<2) { 
              document.getElementById("name_message").innerHTML = "Last name too short.";
              error_flag = 1;  
        }
        else {
            if (x.match(/[a-zA-Z3-5'-]+$/)) {
              document.getElementById("name_message").innerHTML = "";
              lastnameflag=0; // turn off error flag  
            }
            else  {
              document.getElementById("name_message").innerHTML = "Invalid characters in last name.";
              error_flag = 1;
              }
        }
        checkflags();
    } 
function passwordentry() 
    {
    password1flag=0; // turn OFF password1 flag to start
    var passwordoutput;
    var passwordinput = document.getElementById("password1").value;
    console.log(passwordinput);
    // Validate lowercase letters
    if(passwordinput.search(/[a-z]/) < 0 ) {
      passwordoutput = "Enter At least 1 lower case letter";
      error_flag = 1;
      password1flag=1; // Turn on error in password1
    } else {
      passwordoutput = "Got at least 1 lower case letter";
    }
    document.getElementById("password_message1").innerHTML = passwordoutput;
    // Validate capital letters
    if(passwordinput.search(/[A-Z]/)< 0)  {  
      passwordoutput = "Enter at least 1 upper case letter";
      error_flag = 1;
      password1flag=1; // Turn on error in password1
    } else {
      passwordoutput = "Got at least 1 upper case letter";
    }
    document.getElementById("password_message2").innerHTML = passwordoutput;
  // Validate numbers
   if(passwordinput.search(/[0-9]/)<0 ) {   
    passwordoutput = "EnteraAt least 1 number";
    error_flag = 1;
    password1flag=1; // Turn on error in password1
    } else {
    passwordoutput = "Got at least 1 number";
    }
    document.getElementById("password_message3").innerHTML = passwordoutput;
    // Validate special chars
   if(passwordinput.search(/[!\@#\$%&*\-_\\.+\(\)]/)<0 ) {   
    passwordoutput = "Enter At least 1 special character";
    error_flag = 1;
    password1flag=1; // Turn on error in password1
    } else {
    passwordoutput = "Got at least 1 special character";
    }
    document.getElementById("password_message4").innerHTML = passwordoutput;
  // Validate length
  if(passwordinput.length < 8) {
      passwordoutput = "Enter a Minimum 8 characters";
      error_flag = 1;
      password1flag=1; // Turn on error in password1
  } else {
      passwordoutput = "Password is now 8 or more characters";
  }
  document.getElementById("password_message5").innerHTML = passwordoutput;
  checkflags();
  }

function checkaddr1() {
    x = document.getElementById("addr1").value;
    addr1flag=1; // addr1 required so turn on error flag
    console.log(x.value);
    console.log(x.length);
    if (x.length < 2 ) {  
      document.getElementById("addr1_message").innerHTML = "Address needs more characters";  
      error_flag = 1; 
      }
      else { 
          document.getElementById("addr1_message").innerHTML = ""; 
          addr1flag=0; 
      }
    checkflags();
}
function checkaddr2() {
    x = document.getElementById("addr2").value;
    addr2flag=0;
    console.log(x.value);
    console.log(x.length);
    if (x.length < 2 ) {  
      document.getElementById("addr1_message").innerHTML = "Address needs more characters";  
      error_flag = 1; 
      }
      else { 
          document.getElementById("addr1_message").innerHTML = ""; 
          addr2flag=0; 
      }
    checkflags();
}
function checkcity() {
         if (document.getElementById("city").value.match(/^[ a-zA-Z3-5'-]+$/)) {
              document.getElementById("city_message").innerHTML = "";  
            }
            else  {
              document.getElementById("city_message").innerHTML = "Invalid characters in city name.";
              error_flag = 1;
              }
}
function checkstate() {
        z=document.getElementById("state").value;
        if(z=="") { 
              document.getElementById("state_message").innerHTML = "Please choose a state";  
              error_flag = 1;
        }
        else {
          document.getElementById("state_message").innerHTML = ""; 
        }
}
//    if (document.getElementById("state").length = 0 ) {  error_flag = 1; }

// Check to see if Submit button can be turned on
function checkflags() {
    if (firstnameflag+middleflag+lastnameflag+addr1flag+password1flag+password2flag == 0)
      {
         document.getElementById("submit").disabled = false;
      }
}

function fixphone() {
    const inputField = document.getElementById('phone');
    const formattedInputValue = formatPhone(inputField.value);
    inputField.value = formattedInputValue;
  }

function formatPhone(value) {
    if (!value) return value;
    const phone = value.replace(/[^\d]/g, '');
    const phoneLength = phone.length;
  
    if (phoneLength < 3) return phone;
  
    if (phoneLength < 6) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    }
  
    if (phoneLength < 10) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
  
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  }
function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() 
  {
    let message;
    let fname = getCookie("fname");
    if (fname != "") 
      {
        message = "Welcome back "+ fname + "!\nPress OK to confirm or Cancel if this isn't "+fname+".";
        if (confirm(message)) 
          {
           document.getElementById("firstname").setAttribute('value',fname);
           loadInputs();
          }
        else
          {
            setCookie("fname", "" , 0);  
            eraseLocalStorage();
            document.getElementById("firstname").value = "";
          } 
      }
  }

// Sticky header
window.onscroll = function() {myFunction()};

var header = document.getElementById("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function saveInputs() {
  const form = document.getElementById('newacct');
  const elements = form.elements;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const id = element.id;
    const type = element.type;
    const name = element.name;
    if (id && id !== 'password' && id !== 'repassword' && id !== 'ssn' && type !== 'submit' && type !== 'button' && type !== 'reset') {
      if (type === 'checkbox') {
        localStorage.setItem(id, element.checked);
      } else if (type === 'radio' && element.checked) {
        localStorage.setItem(name, element.value);
      } else if (type === 'select-one') {
        localStorage.setItem(id, element.value);
      } else if (type !== 'radio') {
        localStorage.setItem(id, element.value);
      }
    }
  }
}

function loadInputs() {
  const form = document.getElementById('newacct');
  const elements = form.elements;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const id = element.id;
    const type = element.type;
    const name = element.name;
    const storedValue = localStorage.getItem(id) || localStorage.getItem(name);
    if (storedValue !== null) {
      if (type === 'checkbox') {
        element.checked = storedValue === 'true';
      } else if (type === 'radio') {
        if (element.value === storedValue) {
          element.checked = true;
        }
      } else if (id !== 'password' && id !== 'repassword' && id !== 'ssn' && type !== 'submit' && type !== 'button' && type !== 'reset') {
        element.value = storedValue;
      }
    }
  }
}

function eraseLocalStorage() {
  localStorage.clear();
}

// Check password pattern validity
function passwordentry() 
    {
    passwordoutput;
    passwordinput = document.getElementById("password1").value;
    console.log(passwordinput);
    // Validate lowercase letters
    if(passwordinput.search(/[a-z]/) < 0 ) {
      passwordoutput = "Enter at least 1 lowercase letter";
      error_flag = 1;
    } else {
      passwordoutput = "";
    }
    document.getElementById("pwmessage1").innerHTML = passwordoutput;
    // Validate uppercase letters
    if(passwordinput.search(/[A-Z]/)< 0)  {  
      passwordoutput = "Enter at least 1 uppercase letter";
      error_flag = 1;
    } else {
      passwordoutput = "";
    }
    document.getElementById("pwmessage2").innerHTML = passwordoutput;
  // Validate numbers
   if(passwordinput.search(/[0-9]/)<0 ) {   
    passwordoutput = "Enter at least 1 number";
    error_flag = 1;
    } else {
    passwordoutput = "Password contains at least 1 number";
    }
    document.getElementById("pwmessage3").innerHTML = passwordoutput;
    // Validate special chars
   if(passwordinput.search(/[!\@#\$%&*\-_\\.+\(\)]/)<0 ) {   
    passwordoutput = "Enter at least 1 special character";
    error_flag = 1;
    } else {
    passwordoutput = "Password contains at least 1 special character";
    }
    document.getElementById("pwmessage4").innerHTML = passwordoutput;
  // Validate length
  if(passwordinput.length < 8) {
      passwordoutput = "Enter a minimum of 8 characters";
      error_flag = 1;
  } else {
      passwordoutput = "Password is now 8 or more characters";
  }
  document.getElementById("pwmessage5").innerHTML = passwordoutput;
  }
