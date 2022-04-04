function IMGCreature() {
    let endPoint = 'https://us.api.blizzard.com/data/wow/creature-family/index?namespace=static-us&locale=en_US';
    var contenuPage = document.getElementById('resulta');
    GetDATA(endPoint, function (reponse) {
        let information = JSON.parse(reponse); let contenu;
        let contenuTD;
        contenu = "<table class='table'>";
        contenu += "<thead class='thead-dark'>";
        contenu += "<tr>";
        contenu += "<th scope='col'>" + "#" + "</th>";
        contenu += "<th scope='col'>" + "Nom" + "</th>";
        contenu += "<th scope='col'>" + "Image" + "</th>";
        contenu += "</tr>";
        contenu += "</thead>";
        contenu += "<tbody>";
        for (let i = 0; i < Object.keys(information.creature_families).length; i++) {
            let name = information.creature_families[i].name;
            contenu += "<tr>";
            contenu += "<th scope='row'>" + i + "</th>";
            contenu += "<td>" + name + "</td>";
            contenu += "<td id='case"+i+"'></td>";
            contenu += "</tr>";
            endPoint1 = information.creature_families[i].key.href;
            GetDATA(endPoint1, function (reponse) {
                let information2 = JSON.parse(reponse);
                endPoint2 = information2.media.key.href;
                GetDATA(endPoint2, function (reponse) {
                    let information3 = JSON.parse(reponse);
                    let link = information3.assets[0].value;
                    contenuTD = document.getElementById("case"+i);
                    contenuTD.innerHTML = "<img src=" + link + " alt=" + name + ">";
                });
            });
        };
        contenu += "</tbody>";
        contenu += "</table>";
        contenuPage.innerHTML = contenu;
    });
};

function SearchSpell() {
    let endPoint = 'https://us.api.blizzard.com/data/wow/search/spell?namespace=static-us&name.en_US=Holy%20Shield&orderby=id';
    var contenuPage = document.getElementById('resulta');
    GetDATA(endPoint, function (reponse) {
        let information = JSON.parse(reponse); let contenu;
        contenu = "<table class='table'>";
        contenu += "<thead class='thead-dark'>";
        contenu += "<tr>";
        contenu += "<th scope='col'>" + "#" + "</th>";
        contenu += "<th scope='col'>" + "Nom" + "</th>";
        contenu += "<th scope='col'>" + "Image" + "</th>";
        contenu += "</tr>";
        contenu += "</thead>";
        contenu += "<tbody>";
        for (let i = 0; i < Object.keys(information.results).length; i++) {
            if (i>0){
                if(information.results[i].data.name.fr_FR != null){
                    if(information.results[i].data.name.fr_FR !=information.results[i-1].data.name.fr_FR){
                        let name = information.results[i].data.name.fr_FR
                        contenu+="<tr>";
                        contenu+="<th scope='row'>"+i+"</th>";
                        contenu+="<td>"+name+"</td>";
                        contenu += "<td id='spell"+i+"'></td>";
                        contenu+="</tr>";
                        let endPoint2 = information.results[i].key.href;
                        GetDATA(endPoint2, function (reponse) {
                            let information2 = JSON.parse(reponse); let contenu2;
                            endPoint2 = information2.media.key.href;
                            GetDATA(endPoint2, function (reponse) {
                                let information3 = JSON.parse(reponse);
                                let link = information3.assets[0].value;
                                contenuTD = document.getElementById("spell"+i);
                                contenuTD.innerHTML = "<img src=" + link + " alt=" + name + ">";
                            });
                        });
                    }
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