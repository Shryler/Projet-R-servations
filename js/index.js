// Création des Objets "Maison"

let house1 = {
  ID: 1,
  name: "Roch Gwenanen",
  img: [
    "./img/1.webp",
    "./img/2.webp",
    "./img/3.webp",
    "./img/4.webp",
    "./img/5.webp",
  ],
  imgLength: 5,
  localisation: "Île-de-Bréhat",
  description:
    "Parenthèse enchantée, pleine de charme, la maison bénéficie d’une situation unique sur l’Ile de Bréhat. Posée sur la plage du Guerzido, au sud de l’île, la maison est comme un bateau au mouillage, avec vue sur la mer à 360°.De la terrasse plein ouest, vous verrez les plus beaux couchers de soleil. L’accès plage est direct.",
  by: "Professionnel",
  price: "125",
  carousel: "#carousel-house1",
  infos: "#infos-house1",
  desc: "#desc-Content-house1",
  submit: "#resa-house1",
  calendar: "#datepicker-house1",
  confirmDate: "confirm-house1",
};

let house2 = {
  ID: 2,
  name: "La Rosière",
  img: ["./img/1b.webp", "./img/2b.webp", "./img/3b.webp", "./img/5b.webp"],
  imgLength: 4,
  localisation: "Paris - Montmartre",
  description:
    "Ce petit bijou d'appartement est idéal pour passer un séjour de rêve dans une réelle atmosphère parisienne et situé au pied de la Butte Montmartre, à proximité du Moulin Rouge et de Pigalle, cet appartement cosy de caractère offre tout le confort pour passer un séjour dépaysant entre amis ou en famille dans la capitale mythique et se relaxer après une journée de visite dans Paris.",
  by: "Particulier",
  price: "160",
  carousel: "#carousel-house2",
  infos: "#infos-house2",
  desc: "#desc-Content-house2",
  submit: "#resa-house2",
  calendar: "#datepicker-house2",
  confirmDate: "confirm-house2",
};

window.onload = function () {
  localStorage.clear();
};

// FONCTION BOUCLE : CREATION DU CAROUSEL
function Carousel(nameObject) {
  let recupCarousel = document.querySelector(nameObject.carousel);
  let newDivCarousel = document.createElement("div");
  newDivCarousel.setAttribute("id", "carousel");
  newDivCarousel.className = "carousel-inner";
  recupCarousel.prepend(newDivCarousel);

  for (let i = 0; i < nameObject.imgLength; i++) {
    let newDiv = document.createElement("div");
    if (i == 0) {
      newDiv.className = "carousel-item active rounded";
    } else {
      newDiv.className = "carousel-item";
    }
    let newImg = document.createElement("img");
    newImg.setAttribute("src", nameObject.img[i]);
    newImg.className = "d-block w-100 rounded mHimg";
    newDivCarousel.append(newDiv);
    newDiv.append(newImg);
  }
}

Carousel(house1),
  CreateHouse(house1),
  SubmitReservation(house1),
  createCalendar(house1);
Carousel(house2),
  CreateHouse(house2),
  SubmitReservation(house2), createCalendar(house2);

function CreateHouse(nameObject) {
  let recupInfos = document.querySelector(nameObject.infos);
  let recupDesc = document.querySelector(nameObject.desc);

  // Création TITRE
  let nIH3 = document.createElement("h3");
  nIH3.innerText = nameObject.name;
  nIH3.className = "card-title pt-3";

  // Création LOCALISATION
  let localisation = document.createElement("p");
  localisation.innerText = `Localisation : ${nameObject.localisation}`;
  localisation.className = "card-text m-0";

  // CREATION BADGE BY
  let badge = document.createElement("p");
  badge.innerText = `Loué par un ${nameObject.by}`;
  badge.className = "badge bg-primary pt-1 mb-0";

  // CREATION PRICE
  let price = document.createElement("p");
  price.innerHTML = `<strong>${nameObject.price} €</strong> / nuit`;
  price.className = "card-text mt-2 fs-2";

  // CREATION DESCRIPTION
  let desc = document.createElement("small");
  desc.innerText = nameObject.description;

  recupInfos.append(nIH3);
  recupInfos.append(localisation);
  recupInfos.append(badge);
  recupInfos.append(price);
  recupDesc.append(desc);
}

// CALENDRIER
function createCalendar(house) {

  // DATES RESERVEES
  let bookedDates = [];

  if (sessionStorage.getItem(`bookedDatesRegistered-${house.ID}`) === null) {
    console.log("pas présent");
  } else {
    let recupTab = JSON.parse(sessionStorage.getItem(`bookedDatesRegistered-${house.ID}`));
    bookedDates = recupTab;
  }

  sessionStorage.setItem(`bookedDatesRegistered-${house.ID}`, JSON.stringify(bookedDates));

  const DateTime = easepick.DateTime;
  const newBook = bookedDates.map((d) => {
    if (d instanceof Array) {
      const start = new DateTime(d[0], "DD-MM-YYYY");
      const end = new DateTime(d[1], "DD-MM-YYYY");

      return [start, end];
    }

    return new DateTime(d, "DD-MM-YYYY");
  });


  const picker = new easepick.create({
    element: document.querySelector(house.calendar),
    css: [
      "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css",
      "https://easepick.com/css/demo_hotelcal.css",
      "./css/style.css",
    ],
    lang: "fr-FR",
    format: "DD-MM-YYYY",
    plugins: ["RangePlugin", "LockPlugin"],
    zIndex: 10,
    autoApply: false,
    locale: {
      cancel: "Annuler",
      apply: "Appliquer",
    },
    RangePlugin: {
      tooltipNumber(num) {
        localStorage.setItem(`Night ${house.name}`, num - 1);
        return num - 1;
      },
      locale: {
        one: "nuit",
        other: "nuits",
      },
    },

    LockPlugin: {
      minDate: new Date(),
      minDays: 2,
      inseparable: true,
      filter(date, picked) {
        if (picked.length === 1) {
          const incl = date.isBefore(picked[0]) ? "[)" : "(]";
          return (
            !picked[0].isSame(date, "day") && date.inArray(newBook, incl)
          );
        }
        return date.inArray(newBook, "[)");
      },
    },
    setup(picker) {
      picker.on("select", (e) => {
        const dateStart = e.detail.start;
        const dateEnd = e.detail.end;

        function formatDate(date) {
          var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;

          return [day, month, year].join("-");
        }

        localStorage.setItem(`dayStart ${house.name}`, formatDate(dateStart));
        localStorage.setItem(`dayEnd ${house.name}`, formatDate(dateEnd));
        localStorage.setItem(`${house.confirmDate}`, "1");
      });
    },
  });
}
// FIN CALENDAR

// SUBMIT RESERVATION
function SubmitReservation(house) {
  let btnSubmit = document.querySelector(house.submit);

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (localStorage.getItem(house.confirmDate) == 1) {
      document.location.href = `reservation.html?houseSelect=${house.name}`;
    } else {
      alert(`Veuillez saisir des dates correctes pour ${house.name}`);
    }
  });
}
  // FIN : SUBMIT RESERVATION