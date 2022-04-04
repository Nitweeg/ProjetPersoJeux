var country = "fr_FR";

// function GetToken(){
//     let endPoint = 'http://apitokenproject.000webhostapp.com/API/API.php';
//     var req = new XMLHttpRequest();
//     req.open('GET', endPoint);
//     req.addEventListener('load', function () {
//         if (req.status == 200 || req.statusText < 400) {
//             console.log(req.responseText);
//         } else {
//             console.error(req.status + ' ' + req.statusText + url);
//         }
//     });
//     req.send(null);
    
// }

function SearchCard() {
    console.log(maclef);
    let endPoint = 'https://eu.api.blizzard.com/hearthstone/cards';
    var contenuPage = document.getElementById('resulta');
    GetDATA(endPoint, function (reponse) {
        let information = JSON.parse(reponse); let contenu;
        contenu = "<table class='table'>";
        contenu += "<thead class='thead-dark'>";
        contenu += "<tr>";
        contenu += "<th scope='col'>" + "#" + "</th>";
        contenu += "<th scope='col'>" + "Nom" + "</th>";
        contenu += "<th scope='col'>" + "CoûtMana" + "</th>";
        contenu += "<th scope='col'>" + "Description" + "</th>";
        contenu += "<th scope='col'>" + "Image" + "</th>";
        contenu += "</tr>";
        contenu += "</thead>";
        contenu += "<tbody>";
        console.log(information.cards[0].name[country]);
        console.log(Object.keys(information.cards).length);
        for (let i = 0; i < Object.keys(information.cards).length; i++) {
            if (i>0){
                if(information.cards[i-1].name[country]!=information.cards[i].name[country]){
                    let name = information.cards[i].name[country];
                    let link = information.cards[i].image[country];
                    let cost = information.cards[i].manaCost;
                    let desc = information.cards[i].text[country];
                        contenu+="<tr>";
                            contenu+="<th scope='row'>"+i+"</th>";
                            contenu+="<td>"+name+"</td>";
                            contenu+="<td>"+cost+"</td>";
                            contenu+="<td>"+desc+"</td>";
                            contenu+="<td>"+"<img src=" + link + " alt=" + name + "></td>";
                        contenu+="</tr>";
                }
            }
        }
        contenu += "</tbody>";
        contenu += "</table>";
        contenuPage.innerHTML = contenu;
    });
};

function SearchBackCard() {
    let endPoint = 'https://eu.api.blizzard.com/hearthstone/cardbacks';
    var contenuPage = document.getElementById('resulta');
    GetDATA(endPoint, function (reponse) {
        let information = JSON.parse(reponse); let contenu;
        contenu = "<table class='table'>";
        contenu += "<thead class='thead-dark'>";
        contenu += "<tr>";
        contenu += "<th scope='col'>" + "#" + "</th>";
        contenu += "<th scope='col'>" + "Nom" + "</th>";
        contenu += "<th scope='col'>" + "Description" + "</th>";
        contenu += "<th scope='col'>" + "Image" + "</th>";
        contenu += "</tr>";
        contenu += "</thead>";
        contenu += "<tbody>";
        for (let i = 0; i < Object.keys(information.cardBacks).length; i++) {
            if (i>0){
                if(information.cardBacks[i-1].name[country]!=information.cardBacks[i].name[country]){
                    let name = information.cardBacks[i].name[country];
                    let link = information.cardBacks[i].image;
                    let desc = information.cardBacks[i].text[country];
                        contenu+="<tr>";
                            contenu+="<th scope='row'>"+i+"</th>";
                            contenu+="<td>"+name+"</td>";
                            contenu+="<td>"+desc+"</td>";
                            contenu+="<td>"+"<img src=" + link + " alt=" + name + "></td>";
                        contenu+="</tr>";
                }
            }
        }
        contenu += "</tbody>";
        contenu += "</table>";
        contenuPage.innerHTML = contenu;
    });
};

function GetDATA(url, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", "Bearer "+maclef);
    req.addEventListener('load', function () {
        if (req.status == 200 || req.statusText < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + ' ' + req.statusText + url);
        }
    });
    req.addEventListener('error', function () {
        console.error('Erreur avec l url' + url);
    });
    req.send(null);
}

function SearchCardGal() {
    let endPoint = 'https://eu.api.blizzard.com/hearthstone/cards';
    var contenuPage = document.getElementById('resulta');
    GetDATA(endPoint, function (reponse) {
        let information = JSON.parse(reponse); let contenu;
        contenu = "";
        contenu+="<div class='photo-gallery'>";
        contenu+="<div class='container'>";
        contenu+="<div class='row photos'>";
        for (let i = 0; i < Object.keys(information.cards).length; i++) {
            if (i>0){
                if(information.cards[i-1].name[country]!=information.cards[i].name[country]){
                    let name = information.cards[i].name[country];
                    let link = information.cards[i].image.fr_FR;
                    contenu+="<div class='col-sm-6 col-md-4 col-lg-3 item'><img class='imggal' src="+link+" alt="+name+"></a></div>";
                }
            }
        }
        contenu+="</div>";
        contenu+="</div>";
        contenu+="</div>";
        contenuPage.innerHTML = contenu;
    });
};

function ReSearch() {
        let endPoint = 'https://eu.api.blizzard.com/hearthstone/cards';
        var value  = document.getElementById("search").value;
        var contenuPage = document.getElementById('resulta');
        GetDATA(endPoint, function (reponse) {
            let information = JSON.parse(reponse); let contenu;
            contenu = "<table class='table'>";
            contenu += "<thead class='thead-dark'>";
            contenu += "<tr>";
            contenu += "<th scope='col'>" + "#" + "</th>";
            contenu += "<th scope='col'>" + "Nom" + "</th>";
            contenu += "<th scope='col'>" + "CoûtMana" + "</th>";
            contenu += "<th scope='col'>" + "Description" + "</th>";
            contenu += "<th scope='col'>" + "Image" + "</th>";
            contenu += "</tr>";
            contenu += "</thead>";
            contenu += "<tbody>";
            for (let i = 0; i < Object.keys(information.cards).length; i++) {
                let search = information.cards[i].name[country];
                if (search == value){
                    let name = information.cards[i].name[country];
                    let link = information.cards[i].image.fr_FR;
                    let cost = information.cards[i].manaCost;
                    let desc = information.cards[i].text[country];
                    contenu+="<tr>";
                            contenu+="<th scope='row'>"+i+"</th>";
                            contenu+="<td>"+name+"</td>";
                            contenu+="<td>"+cost+"</td>";
                            contenu+="<td>"+desc+"</td>";
                            contenu+="<td>"+"<img src=" + link + " alt=" + name + "></td>";
                    contenu+="</tr>";
                }
            }
            contenu += "</tbody>";
            contenu += "</table>";
            contenuPage.innerHTML = contenu;
        });
};