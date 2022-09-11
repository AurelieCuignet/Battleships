// module stats

const stats = {
    
    // méthode init
    init: function() {
        // on a rien à initialiser ici, mais on met quand même notre méthode init
    },

    // méthode d'affichage des stats de la partie actuelle
    showStats: function() {

        // pour calculer les pourcentages, on doit récupérer le nombre de tirs réussis/manqués
        const hits = document.querySelectorAll('.hit').length;
        const missed = document.getElementsByClassName('splash').length;
    
        // pour le produit en crois il nous faut le nb de tirs total
        const total = hits + missed;
    
        const percentHits = Math.round((hits*100)/total);
        const percentMissed = (missed*100)/total;
    
        if(total === 0) {
            // pas encore de tir
            alert('Statistiques : vous n\'avez pas encore tiré Capitaine !');
        } else {
            // afficher un popup avec alert 
            alert('Statistiques : ' + '\nTirs réussis : ' + percentHits + '% (' + hits + ')\nTirs manqués : ' + percentMissed.toFixed(2) + '% (' + missed + ')\nNombre de tirs total : '+total);
        }
        
    },
    
    // méthode pour ajouter un tir dans l'historique des actions
    addActionToHistory: function(isShotSuccessful, targetCell) {
        
        let myUl;
    
        // on créé notre UL si c'est le premier tour
        if(game.round === 1) {
            // on récupère le div qui sert à stocker l'historique
            const myDiv = document.querySelector('#actions');
    
            myUl = document.createElement('ul');
            myDiv.append(myUl)
        } else {
            myUl = document.querySelector('#actions ul');
        }
    
        const myLi = document.createElement('li');
        if(isShotSuccessful) {
            myLi.textContent = 'Tour#' + game.round + ' tir en ' + targetCell + ' réussi.';
        } else {
            myLi.textContent = 'Tour#' + game.round + ' tir en ' + targetCell + ' manqué.';
        }
    
        myUl.prepend(myLi);
        // autre possibilité : insertAdjacent, insertBefore   
    },

    // afficher en console les cellules qui ont été touchées (t) jusqu'à présent
    showHitCells: function() {
        // récupérer TOUTES les cellules touchées
        //let hitCells = document.getElementsByClassName('hit');
        let hitCells = document.querySelectorAll('.hit');

        let hitCellsMessage = 'Cases touchées : ';

        // on parcout tous les éléments HTML qui ont la classe hit !
        for(const cell of hitCells) {
            //console.log(cell);
            hitCellsMessage += cell.id + ', ';
        }

        console.log(hitCellsMessage);
    }
};