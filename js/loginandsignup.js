
//! Push Data Using Array 
//! var person = [signupfullname, signupemailid, signuppassword]
// Show Signup Password
function showsignuppassword() {
    var signuppassword = document.getElementById("signuppassword");
    if (signuppassword.type === "password") {
        signuppassword.type = "text";
    } else {
        signuppassword.type = "password";
    }
}

// Show Login Password
function showloginpassword() {
    var loginpassword = document.getElementById("loginpassword")
    if (loginpassword.type === "password") {
        loginpassword.type = "text";
    } else {
        loginpassword.type = "password";
    }
}



// For Signup and save Data in localStorage
function signup() {
    let usernameforsignup = JSON.parse(localStorage.getItem("persons"));

    let signupusername = document.getElementById('signupusername').value;
    let signupfullname = document.getElementById('signupfullname').value;
    let signupemailid = document.getElementById('signupemailid').value;
    let signuppassword = document.getElementById('signuppassword').value;

    let alreadyusername = document.getElementById('alreadyusername');
    let spaceusername = document.getElementById('spaceusername');

    var d = new Date();
    var n = d.getTime()
    // Push Data Usin Object
    var createdteamarr = [];
    var partteamarr = [];
    var person = {
        username: signupusername,
        name: signupfullname,
        email: signupemailid,
        password: signuppassword,
        createdteam: createdteamarr,
        partteam: partteamarr,
        userkey: n,
    };
    if (signupusername.indexOf(" ") > -1) {
        spaceusername.style.display = "block";
        setTimeout(function () {
            spaceusername.style.display = "none";
        }, 4000);
    } else {
        if (!usernameforsignup) {
            //! Validation for empty value and email
            if ((signupusername.length && signupfullname.length && signupemailid.length && signuppassword.length) > 0 && ((signupemailid.indexOf("@") + 1) !== signupemailid.length) && signupemailid.indexOf("@") > -1) {
                var signupdata = JSON.parse(localStorage.getItem("persons")) || [];
                signupdata.push(person);
                localStorage.setItem("persons", JSON.stringify(signupdata));
                window.location = "./login.html";

            } else {
                swal("Oops 😟", "Please Fill all the field Correct!");
            }
            console.log("no");
        } else {
            let found = false;
            // Loop for searching data in Array
            for (let i = 0; i <= usernameforsignup.length - 1; i++) {
                if (usernameforsignup[i].username == signupusername) {
                    found = true;
                    alreadyusername.style.display = "block";
                    setTimeout(function () {
                        alreadyusername.style.display = "none";
                    }, 4000);
                }
                console.log(usernameforsignup[i].username);
            }
            if (found == false) {
                //! Validation for empty value and email
                if ((signupusername.length && signupfullname.length && signupemailid.length && signuppassword.length) > 0 && ((signupemailid.indexOf("@") + 1) !== signupemailid.length) && signupemailid.indexOf("@") > -1) {

                    var signupdata = JSON.parse(localStorage.getItem("persons")) || [];
                    signupdata.push(person);
                    localStorage.setItem("persons", JSON.stringify(signupdata));
                    window.location = "./login.html";

                } else {
                    swal("Oops 😟", "Please Fill all the field Correct!");
                }
            }
        }
    }
    // testing
    // console.log(signupemailid.indexOf("@") + 1);
    // console.log(signupemailid.length);

    // console.log(usernameforsignup[0].password);
}


// Retrive Data From localStorage and Match email and password.
// if email and password matched user go on the team page 
function login() {

    let loginnameoremail = document.getElementById('loginnameoremail').value;
    let loginpassword = document.getElementById('loginpassword').value;

    const dataforlogin = JSON.parse(localStorage.getItem("persons") || [])

    let found = false;
    dataforlogin.forEach((element, ind) => {

        if ((loginnameoremail == element.username || loginnameoremail == element.email) && loginpassword == element.password) {
            found = true;
            console.log("match", ind);
            localStorage.setItem("userindex", ind);
            window.location.href = "./teams.html";

        }

    });
    if (found == false) {
        swal("Wrong❌", "Email and Password is Incorrect");
    }
}
