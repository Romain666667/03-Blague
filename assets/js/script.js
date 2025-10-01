document.getElementById('formBlague').addEventListener('submit', function(e) {
  e.preventDefault();
  const categorie = document.getElementById('categorie').value;
  const nombre = document.getElementById('nombre').value;
  let nombreFinal;
  if (nombre != 1) {
    nombreFinal = '&amount=' + nombre;
  }
  else {
    nombreFinal = '';
  }
  let endpoint = `https://v2.jokeapi.dev/joke/${categorie}?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit${nombreFinal}`;

  console.log('Catégorie:', categorie);
  console.log('Nombre:', nombre);
  console.log('Endpoint généré:', endpoint);

  // 👉 Ton fetch est maintenant dans le submit
  fetch(endpoint)
  .then(function (response) {
      if (response.status == 200) {
          response.json().then(function (datas) {
              console.log(datas);

              let blague = document.getElementById('blague');
              //blague.innerHTML = ""; 

              // plusieurs blagues
              if (datas.jokes) {
                  datas.jokes.forEach(function(j) {
                      blague.appendChild(generateUsersname(j));
                  });
              } 
              // une seule blague
              else {
                  blague.appendChild(generateUsersname(datas));
              }
          })
      } else {
          console.log("Erreur");
      }
  })
})

// Fonction génératrice de lignes
function generateUsersname(dataUser)
{
    let GeneratedUsersname = document.createElement("TR");

    let tdCATEGORIE = document.createElement("TD");
    let tdBLAGUE = document.createElement("TD");
    let tdEDITION = document.createElement("TD");

    tdCATEGORIE.innerHTML = dataUser.category;
    if (dataUser.type === "single") {
        tdBLAGUE.innerHTML = dataUser.joke;
    } else {
        tdBLAGUE.innerHTML = dataUser.setup + " " + dataUser.delivery;
    }

    // Création du bouton de suppression individuel
    let btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.className = "btn btn-danger btn-sm";
    btnSupprimer.onclick = function() {
        GeneratedUsersname.remove();
    };
    tdEDITION.appendChild(btnSupprimer);

    // Gestion du bouton Supprimer tout dans l'entête du tableau (hors DOMContentLoaded car le script est chargé après le DOM)
    const btnSupprimerTout = document.getElementById('btnSupprimerTout');
    if (btnSupprimerTout) {
        btnSupprimerTout.addEventListener('click', function() {
            let blague = document.getElementById('blague');
            blague.innerHTML = "";
    });
}

    GeneratedUsersname.appendChild(tdCATEGORIE);
    GeneratedUsersname.appendChild(tdBLAGUE);
    GeneratedUsersname.appendChild(tdEDITION);

    return GeneratedUsersname;
}
