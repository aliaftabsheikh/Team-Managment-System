function showquestion(){
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let settingteamindex = sessionStorage.getItem("settingteamindex");
    let questionhtml = '';
    
    let questionfromindex = teamdata[userindex].createdteam[settingteamindex].question;
    questionfromindex.forEach((qitem, qi) =>{
        questionhtml += `<div class="col-md-12 col-10">
                            <div class="d-flex justify-content-between">
                                <p><b>Q:${qi + 1}</b> ${qitem.ques}</p>
                                <div class="col-md-2 col-2"> 
                                    <button class="btn btn-dark btn-sm outline-remove borderradius-remove" 
                                    onclick="removeonequestion(${qi})">
                                    <i class="bi bi-dash-lg"></i>
                                </div>
                            </div>
                        </div>`

    })
    // let questionhtml = ''
    document.getElementById('questionownerview').innerHTML = questionhtml;
}

function removeonequestion(qi){
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let settingteamindex = sessionStorage.getItem("settingteamindex");
    
    teamdata[userindex].createdteam[settingteamindex].question.splice(qi, 1);
    localStorage.setItem("persons", JSON.stringify(teamdata));
    showquestion();
}

function addquestion() {
    let userindex = localStorage.getItem("userindex");
    let settingteamindex = sessionStorage.getItem("settingteamindex");
    var addquestioninput = document.getElementById('addquestioninput').value;

    let questionobj = {
        ques: addquestioninput,
        ans: "",
    }
    if (addquestioninput.length !== 0) {
        let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
        teamdata[userindex].createdteam[settingteamindex].question.push(questionobj);
        localStorage.setItem("persons", JSON.stringify(teamdata));
        document.getElementById('addquestioninput').value = "";
    } else{
        alert("Type Question")
    }
    showquestion()
}

function settingteamGetData() {
    let userindex = localStorage.getItem("userindex");
    let settingteamindex = sessionStorage.getItem("settingteamindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];

    let memberfromindex = teamdata[userindex].createdteam[settingteamindex].members;
    let emailhtml = '';
    memberfromindex.forEach((eitem, ei) => {
        emailhtml += `<div class="col-md-4">
                        <li class="mainmemberli">
                        <span class="memberli"> ${eitem}  <span><i ondblclick="removeonemember(${ei})" class="bi bi-x-circle-fill"></i></span></span>
                        </li> 
                    </div>`
    });
    document.getElementById('memberownerview').innerHTML = emailhtml;
}


function removeonemember(ei) {
    let userindex = localStorage.getItem("userindex");
    let settingteamindex = sessionStorage.getItem("settingteamindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];

    teamdata[userindex].createdteam[settingteamindex].members.splice(ei, 1)
    localStorage.setItem("persons", JSON.stringify(teamdata));
    settingteamGetData();
}

function addmembers() {
    let userindex = localStorage.getItem("userindex");
    let settingteamindex = sessionStorage.getItem("settingteamindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];

    let addmembersinput = document.getElementById('addmembersinput').value;

    if (addmembersinput.length > 0) {
        teamdata[userindex].createdteam[settingteamindex].members.push(addmembersinput);
        localStorage.setItem("persons", JSON.stringify(teamdata));
        document.getElementById('addmembersinput').value = ""
        settingteamGetData();
    } else {
        swal("Please Input First")
    }
}

function deleteteam() {
    let userindex = localStorage.getItem("userindex");
    let settingteamindex = sessionStorage.getItem("settingteamindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];

    teamdata[userindex].createdteam.splice(settingteamindex, 1);
    localStorage.setItem("persons", JSON.stringify(teamdata));
    window.location.href = "./teams.html"
}