// Création des Objets "Maison"

let house1 = {
    ID: 1,
    name: "Roch Gwenanen",
    img: ["./img/1.webp", "./img/2.webp", "./img/3.webp", "./img/4.webp", "./img/5.webp"],
    imgLength: 5,
    localisation: "Île-de-Bréhat",
    description: "Parenthèse enchantée, pleine de charme, la maison bénéficie d’une situation unique sur l’Ile de Bréhat. Posée sur la plage du Guerzido, au sud de l’île, la maison est comme un bateau au mouillage, avec vue sur la mer à 360°.De la terrasse plein ouest, vous verrez les plus beaux couchers de soleil. L’accès plage est direct.",
    by: "Professionnel",
    price: "125",
    carousel: "#carousel-house1",
    infos: "#infos-house1",
    desc: "#desc-Content-house1",
    submit: "#resa-house1",
    dateArrivee: "#dateArrivee1",
    dateDepart: "#dateDepart1",
    diffDate: "#diffDate1",
    url: "Roch%20Gwenanen",
}

let house2 = {
    ID: 2,
    name: "La Rosière",
    img: ["./img/1b.webp", "./img/2b.webp", "./img/3b.webp", "./img/5b.webp"],
    imgLength: 4,
    localisation: "Paris - Montmartre",
    description: "Ce petit bijou d'appartement est idéal pour passer un séjour de rêve dans une réelle atmosphère parisienne et situé au pied de la Butte Montmartre, à proximité du Moulin Rouge et de Pigalle, cet appartement cosy de caractère offre tout le confort pour passer un séjour dépaysant entre amis ou en famille dans la capitale mythique et se relaxer après une journée de visite dans Paris.",
    by: "Particulier",
    price: "160",
    carousel: "#carousel-house2",
    infos: "#infos-house2",
    desc: "#desc-Content-house2",
    submit: "#resa-house2",
    dateArrivee: "#dateArrivee2",
    dateDepart: "#dateDepart2",
    diffDate: "#diffDate2",
    url: "La%20Rosi%C3%A8re",
}

// MOYEN DE PAIEMENT
let btnCB = document.querySelector("#selectModePaiement_0");
let btnPaypal = document.querySelector("#selectModePaiement_1");
let btnVirement = document.querySelector("#selectModePaiement_2");

let body = document.body;

btnPaypal.addEventListener("click", () => {
    alert("Moyen de paiement indisponible !");
});
btnVirement.addEventListener("click", () => {
    alert("Moyen de paiement indisponible !");
});
// FIN : MOYEN DE PAIEMENT

let btnSubmit = document.querySelector("#btnSubmit");
let btnValidPayment = document.querySelector("#btnValidPayment");
let inputName = document.getElementById("name");
let inputSurname = document.querySelector("#surname");
let inputMail = document.querySelector("#mail");
let inputPhone = document.querySelector("#phoneNumber");
let nameCard = document.querySelector("#nameCard");
let cardNumber = document.querySelector("#cardNumber");
let expirationDate = document.querySelector("#expirationDate");
let CVV = document.querySelector("#CVV");

let modeCB = document.querySelector("#selectModePaiement_0");

let confirm = document.querySelector("#confirm");
let confirmPaiement = document.querySelector("#confirmPaiement");

activeChange(inputName, 0), deleteInput(inputName), saveInfos(inputName);
activeChange(inputSurname, 0), deleteInput(inputSurname), saveInfos(inputSurname);
activeChange(inputMail, 1), deleteInput(inputMail), saveInfos(inputMail);
activeChange(inputPhone, 2), deleteInput(inputPhone), saveInfos(inputPhone);
activeChange(nameCard, 0), deleteInput(nameCard), saveInfos(nameCard);
activeChange(cardNumber, 3), deleteInput(cardNumber), saveInfos(cardNumber);
activeChange(expirationDate, 4), deleteInput(expirationDate), saveInfos(expirationDate);
activeChange(CVV, 5), deleteInput(CVV), saveInfos(CVV);

// SAUVEGARDE DES DONNEES IN INPUT
function saveInfos(input) {
    if (localStorage.getItem(input.name)) {
        input.value = localStorage.getItem(input.name);
    }
}

// FONCTION SELECTION DE LA CLASSE A MODIFIER
function classSelect(input, option) {
    if (option == 0) {
        let classSelect1 = (`#txtError${input.id}`);
        return classSelect1;
    }
    if (option == 1) {
        let classSelect2 = (`#Correct${input.id}`);
        return classSelect2;
    }
}

// ACTIVER EVENEMENT CHANGE
function activeChange(input, optionValid) {
    input.addEventListener("change", (e) => {
        e.preventDefault();
        validation(e.target.value, input, optionValid);
    });
};

// FONCTION POUR AFFICHER/CACHER MESSAGE D'ERREUR
function changeClass(nameError, nameValid, option) {
    let txtError = document.querySelector(nameError);
    let txtValid = document.querySelector(nameValid);
    if (option == 0) {
        txtError.classList.replace("d-none", "d-block");
        txtValid.classList.replace("d-block", "d-none");
    } else if (option == 1) {
        txtError.classList.replace("d-block", "d-none");
        txtValid.classList.replace("d-none", "d-block");
    } else if (option == 3) {
        txtError.classList.replace("d-block", "d-none");
        txtValid.classList.replace("d-block", "d-none");
    }
}

// FONCTION REGEXP
function regExp(option) {
    if (option == "0") { // 0 = Nom & Prénom
        return /^[^\d]+$/;
        // TOUT SAUF LES NUMEROS
    }
    if (option == "1") { // 1 = Adresse mail
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // mysite@ourearth.com, my.ownsite@ourearth.org, mysite@you.me.net
    }
    if (option == "2") { // 2 = Phone Number
        return /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
        // 0123456789, 01 23 45 67 89, 01.23.45.67.89, 0123 45.67.89, 0033 123-456-789, +33-1.23.45.67.89, +33 - 123 456 789
        // +33(0) 123 456 789, +33 (0)123 45 67 89, +33 (0)1 2345-6789, +33(0) - 123456789
    }
    if (option == "3") { // 3 = Visa Number
        return /^4\d{3}(| |-)(?:\d{4}\1){2}\d{4}$/;
        // 4000 0000 0000 0000, 4000-0000-0000-0000, 4000000000000000
    }
    if (option == "4") { // 4 = Date Credit Card
        return /^(0[1-9]|1[0-2])\/?([0-9]{4}|[2-9]{2})$/;
    }
    if (option == "5") { // 5 = CVV
        return /^[0-9]{3,4}$/;
    }
}

// FONCTION VALIDATION
function validation(nameInput, input, optionValid) {
    let nameRegExp = regExp(optionValid);
    let result = nameRegExp.test(nameInput);
    if (result == false) {
        input.classList.add("error");
        changeClass(classSelect(input, 0), classSelect(input, 1), 0);
    } else if (result == true) {
        input.classList.remove("error");
        changeClass(classSelect(input, 0), classSelect(input, 1), 1);
        localStorage.setItem(input.name, input.value);
    }
};

// EVENEMENT AU CLICK : SUPPRESSION
function deleteInput(input) {
    input.addEventListener("click", (e) => {
        e.preventDefault();
        if (input.classList.contains("error")) {
            input.value = '';
            changeClass(classSelect(input, 0), classSelect(input, 1), 3);
            input.classList.remove("error");
        }
    });
};

// EVENEMENT AU CLICK "PAYER" - VERIFICATION DES DONNEES
btnValidPayment.addEventListener("click", (e) => {
    e.preventDefault();
    let verifCpt = 0;
    function validForm(input) {
        if (input.classList.contains("error") || input.value == "") {
            alert(`Veuillez saisir ${input.alt} valide`);
            verifCpt--;
        } else if (!input.classList.contains("error")) {
            verifCpt++;
        }
        if (verifCpt > 3) {
            confirmPaiement.classList.replace("d-none", "d-block");
            modeCB.classList.remove("error");
            document.querySelector("#CorrectnameCard").classList.replace("d-none", "d-block");
            document.querySelector("#CorrectcardNumber").classList.replace("d-none", "d-block");
            document.querySelector("#CorrectexpirationDate").classList.replace("d-none", "d-block");
            document.querySelector("#CorrectCVV").classList.replace("d-none", "d-block");
            document.querySelector("#nameCard").setAttribute("disabled", "");
            document.querySelector("#cardNumber").setAttribute("disabled", "");
            document.querySelector("#expirationDate").setAttribute("disabled", "");
            document.querySelector("#CVV").setAttribute("disabled", "");
            document.querySelector("#selectModePaiement_0").setAttribute("checked", "");
            document.querySelector("#selectModePaiement_1").setAttribute("disabled", "");
            document.querySelector("#selectModePaiement_2").setAttribute("disabled", "");
        }
    }
    validForm(nameCard);
    validForm(cardNumber);
    validForm(expirationDate);
    validForm(CVV);
});

// EVENEMENT AU CLICK "RESERVER" - VERIFICATION DES DONNEES
btnSubmit.addEventListener("click", (e, house) => {
    e.preventDefault();
    let verifCpt = 0;
    function validForm(input) {
        if (input.classList.contains("error") || input.value == "") {
            alert(`Veuillez saisir ${input.alt} valide`);
            verifCpt--;
        } else if (!input.classList.contains("error")) {
            input.setAttribute("disabled", "");
            verifCpt++;
        }
        if (verifCpt > 4) {
            confirm.classList.replace("d-none", "d-block");
            document.querySelector("#Correctname").classList.replace("d-none", "d-block");
            document.querySelector("#Correctsurname").classList.replace("d-none", "d-block");
            document.querySelector("#Correctmail").classList.replace("d-none", "d-block");
            document.querySelector("#CorrectphoneNumber").classList.replace("d-none", "d-block");
            document.querySelector("#inputGroupSelect01").setAttribute("disabled", "");
            document.querySelector("#floatingTextarea2").setAttribute("disabled", "");
        }
    }
    validForm(inputName);
    validForm(inputSurname);
    validForm(inputMail);
    validForm(inputPhone);
    validForm(modeCB);
});


infosPages(house1);
infosPages(house2);

// MODIFICATION PAR RAPPORT A LA MAISON
function infosPages(house) {
    let nameReservation = document.querySelector("#nameReservation");
    let dateArriveeDisabled = document.querySelector("#dateArriveeDisabled");
    let dateDepartDisabled = document.querySelector("#dateDepartDisabled");
    let diffDate = document.querySelector("#diffDate");
    let background = document.querySelector("#header");
    let calculMontant = document.querySelector("#calculMontant");
    let totalNuit = document.querySelector("#totalNuit");
    let total = document.querySelector("#total");
    let btnSubmit = document.querySelector("#btnSubmit");

    let url = window.location.href;
    if (url.includes(house.url)) {
        nameReservation.innerText = (`Réservation : ${house.name}`);
        let recupdateArrivee = localStorage.getItem(`dayStart ${house.name}`);
        let recupdateDepart = localStorage.getItem(`dayEnd ${house.name}`);
        let nbNight = localStorage.getItem(`Night ${house.name}`);

        // INITIALISATION DES DATES SELECTIONNEES
        dateArriveeDisabled.value = recupdateArrivee;
        dateDepartDisabled.value = recupdateDepart;

        // CHANGEMENT BACKGROUND
        background.classList.replace("bg-cover", `bg-cover-house${house.ID}`);

        // NOMBRE DE NUITS
        diffDate.innerHTML = (`Durée du séjour : <strong>${nbNight}</strong> nuit(s)`);

        // FONCTION CALCUL NUIT
        function calculNuit(house, nbNight) {
            let result = house * nbNight;
            return result;
        }

        // CALCUL PRIX NUIT
        calculMontant.innerHTML = (`${house.price},00 € x ${nbNight} nuit(s)`);
        totalNuit.innerHTML = (`${calculNuit(house.price, nbNight)},00 €`);

        let totalNight = calculNuit(house.price, nbNight);
        let tabTotal = [+totalNight, 45];


        function sumArray(tabTotal) {
            let sum = 0;
            tabTotal.forEach(item => {
                sum += item;
            });
            return sum;
        }

        // CALCUL PRIX TOTAL        
        total.innerHTML = (`${sumArray(tabTotal)},00 €`);
        localStorage.setItem("Prix total", total.innerHTML);
        btnValidPayment.innerText = (`Payer ${total.innerHTML}`);

        // SUCCESS MESSAGE
        let successHouse = document.querySelector("#house");
        let successDate1 = document.querySelector("#date1");
        let successDate2 = document.querySelector("#date2");

        successHouse.innerText = (house.name);
        successDate1.innerText = (recupdateArrivee);
        successDate2.innerText = (recupdateDepart);

        // RECUP DATE RESERVE

        btnSubmit.addEventListener("click", () => {
            if (!confirm.classList.contains("d-none")) {
                let recupTab = JSON.parse(sessionStorage.getItem(`bookedDatesRegistered-${house.ID}`));
                let newTab = [recupdateArrivee, recupdateDepart];
                recupTab.push(newTab);

                sessionStorage.setItem((`bookedDatesRegistered-${house.ID}`), JSON.stringify(recupTab));

                let successName = document.querySelector("#sName");
                successName.innerText = ((`${localStorage.getItem("name")} ${localStorage.getItem("surname")}`));

                
                let count = document.getElementById("timeout");
                let value = 10;

                function Trigger() {
                    if (value > 1) {
                        value--;
                        count.innerText = value;
                    }
                    else {
                        clearInterval();
                        document.location.href = "index.html";
                    }
                }
                setInterval(Trigger, 1000);
            }
        })
    }
}

