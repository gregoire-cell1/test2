// Données de formations (exemple)
const formations = [
  {
    id: "bts-commerce",
    titre: "BTS Commerce",
    description: "Une formation professionnalisante pour entrer rapidement sur le marché du travail."
  },
  {
    id: "but-info",
    titre: "BUT Informatique",
    description: "Une formation en 3 ans axée sur la programmation, les réseaux et la gestion de projet."
  }
];

// Données des étudiants par formation
const formationEtudiants = {
  "bts-commerce": [
    {
      prenom: "Amine",
      reseau: "Instagram",
      lien: "https://instagram.com/amine_bts",
      description: "Étudiant en 2e année, disponible pour parler de son parcours."
    },
    {
      prenom: "Sophie",
      reseau: "LinkedIn",
      lien: "https://linkedin.com/in/sophie-bts",
      description: "Passionnée par le marketing, de STMG vers BTS."
    }
  ],
  "but-info": [
    {
      prenom: "Léo",
      reseau: "Discord",
      lien: "https://discord.com/users/leo_info",
      description: "Passionné de développement, dispo pour répondre à vos questions."
    },
    {
      prenom: "Sara",
      reseau: "LinkedIn",
      lien: "https://linkedin.com/in/sara-butinfo",
      description: "Étudiante en BUT Informatique, n'hésite pas à me contacter !"
    }
  ]
};

// Injection des cartes formations
const cardsContainer = document.getElementById('cardsContainer');
formations.forEach(formation => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h2>${formation.titre}</h2>
    <p>${formation.description}</p>
    <button class="btn-contact-student" data-formation-id="${formation.id}">Contacter un étudiant</button>
  `;
  cardsContainer.appendChild(card);
});

// Gestion de la pop-up "Contacter un étudiant"
document.querySelectorAll('.btn-contact-student').forEach(button => {
  button.addEventListener('click', () => {
    const formationId = button.getAttribute('data-formation-id');
    const etudiants = formationEtudiants[formationId] || [];
    const popupContent = document.getElementById('popupContent');
    if (etudiants.length > 0) {
      popupContent.innerHTML = etudiants.map(etu => `
        <div class="student-contact-item">
          <strong>${etu.prenom}</strong><br>
          <small>${etu.description}</small><br>
          <a href="${etu.lien}" target="_blank">${etu.reseau}</a>
        </div>
      `).join('');
    } else {
      popupContent.innerHTML = '<p>Aucun étudiant disponible pour cette formation.</p>';
    }
    toggleStudentPopup(true);
  });
});

// Fonction d'affichage/masquage de la pop-up
function toggleStudentPopup(show) {
  const popup = document.getElementById('studentPopup');
  if (show) {
    popup.classList.add('active');
  } else {
    popup.classList.remove('active');
  }
}

// Gestion du champ de recherche pour filtrer les formations
document.getElementById('searchInput').addEventListener('input', event => {
  const recherche = event.target.value.toLowerCase();
  document.querySelectorAll('#cardsContainer .card').forEach(card => {
    const titre = card.querySelector('h2').textContent.toLowerCase();
    card.style.display = titre.indexOf(recherche) > -1 ? 'flex' : 'none';
  });
});
