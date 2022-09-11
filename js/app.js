// module app

const app = {

    // méthode init, appelée au chargement de la page par l'event DOMContentLoaded
    init: function(){
        console.log('app : init');

        // on initialise la grille
        grid.init();

        // on affiche une première fois la grille
        grid.display();

        // on ajoute nos event Listener
        const beforeGameForm = document.querySelector('#beforegame form.form');
        beforeGameForm.addEventListener('submit', app.handleSubmit);

        const statsButton = document.querySelector('#stats');
        statsButton.addEventListener('click', app.handleClick);

        const historyButton = document.querySelector('#toggle-actions');
        historyButton.addEventListener('click', app.handleClick)

        const gameGrid = document.querySelector('#grid');
        gameGrid.addEventListener('mousedown', app.handleGridClick);

        const themeSelect = document.querySelector("#theme");
        themeSelect.addEventListener('change', app.handleChange);
        
        const cookies = document.cookie.split('; ');
        if(cookies.find(row => row.startsWith('theme='))) {
            // si le cookie theme est défini, on récupère sa valeur
            const cookieValue = cookies.find(row => row.startsWith('theme=')).split('=')[1];

            // on met à jour le thème :
            document.querySelector('body').className = cookieValue;

            themeSelect.value = cookieValue;
            app.changeThemeColor(cookieValue);
        }
        
        /*const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('theme='))
            .split('=')[1];
        themeSelect.value = cookieValue;
        app.changeThemeColor(cookieValue);*/
    },

    handleGridClick: function(event) {
        //console.log('currentTarget.id : ' + event.currentTarget.id);
        //console.log('target.id : ' + event.target.id);
    
        console.log('Le joueur a cliqué sur ' + event.target.dataset.cellName);
        //console.log('nom de la cellule mais avec getAttribute : ' + event.target.getAttribute('data-cell-name'));
    
        //! Merci QuentinB pour la solution ci-dessous !
    
        // on envoie la cible sur laquelle l'user a cliqué à sendMissile()
        const isShotSuccessful = game.sendMissile(event.target.dataset.cellName);
    
        // on ajoute l'action qui vient de se produire dans l'historique des actions
        stats.addActionToHistory(isShotSuccessful, event.target.dataset.cellName);
    
        // on augmente le tour
        game.round++;
        // on met à jour le h3 pour afficher le nouveau tour
        game.updateRound();
    
        if(game.checkGameOver()) {
            alert("Bravo !");
    
            // vu que tous les bateaux sont détruit, on enlève le eventListener
            document.querySelector('#grid').removeEventListener('mousedown', app.handleGridClick);
        }
        
    },
    
    handleSubmit: function(event) {
    
        console.log('here');

        // on bloque le comportement par défaut de notre formulaire
        event.preventDefault();

        console.log('there');
    
        // on va récupérer le nom de l'user
        const myInput = document.querySelector('#username');

        // vérifions que l'username n'est pas vide
        if(myInput.value.trim() !== ''){
            // on initialise le jeu
            game.init(myInput.value.trim());

            // pour afficher l'username une première fois, on appelle updateRound
            game.updateRound();                
        } else {
            console.error('Vous devez fournir votre pseudo !');
            alert('Vous devez fournir votre pseudo !');
        }
                    
    },
    
    handleClick: function(event) {
        if(event.currentTarget.id === 'stats') {
            // notre cible avait comme id stats, on veut donc afficher les stats
            stats.showStats();
        } else if (event.currentTarget.id === 'toggle-actions') {
            // notre cible avait comme id toggle-actions, on veut donc afficher/cacher l'historique
            const myDiv = document.querySelector('#actions');
            if(myDiv.style.display == 'block'){
                // si le div est visible (display = block)
                // on le cache
                myDiv.style.display = 'none';
            } else {
                // le div n'est pas visible
                // on l'affiche
                myDiv.style.display = 'block';
            }
        }
    },

    handleChange: function(event) {
        const chosenTheme = event.target.value;
        app.changeThemeColor(chosenTheme);        
    },

    changeThemeColor: function(themeName) {
        document.querySelector('body').className = event.currentTarget.value;
        //mise à jour du cookie
        document.cookie = 'theme=' + themeName + '; secure; max-age=31536000'; //1 an
    }
};

// quand le DOM est chargé, on lance app.init()
document.addEventListener('DOMContentLoaded', app.init);























