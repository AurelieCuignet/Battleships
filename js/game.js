// module game

const game = {
    
    // on met dans le module game les propriétés utiles au jeu
    round: 0,
    username: '',

    // méthode init
    init: function(username) {
        // init permet de lancer le jeu, on peut donc mettre ici ce qu'on avait mis dans startGame()

        // au lancement, on met le tour à 1
        this.round = 1;

        // et on stocke le username fourni en paramètre
        // ici on peut voir que le this. nous permet de différencier la propriété username de notre module game du paramètre envoyé à init()
        this.username = username;

        // cacher le formulaire d'avant jeu
        document.querySelector('#beforegame').style.display = 'none';

        // afficher le jeu
        document.querySelector('#game').style.display = 'block';
    },

    // fonction pour envoyer un missile sur une case !
    // le paramètre index sera l'index du tableau grid sur lequel on veut tirer
    sendMissileAt: function(indexRow, indexColumn) {
        // on doit tester si à cet index il y a un bateau
        if(grid.cells[indexRow][indexColumn] === 'b') {
            // notre case contient b, c'est un bateau !
            console.log('Touché !');
            // on met à jour la case avec un 't'
            grid.cells[indexRow][indexColumn] = 't';

            // avant de quitter la fonction sendMissileAt, on affiche la grille
            //displayGrid(grid);
            grid.display();

            return true;
        } else if (grid.cells[indexRow][indexColumn] === 'p' || grid.cells[indexRow][indexColumn] === 't') {
            // notre case contient p ou t
            console.log("Allooo! Allooooo! Y'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !");

            return false;
        } else {
            // notre case ne contient pas b, donc à l'eau
            console.log('à l\'eau ...');
            // on met à jour la case avec un 'p'
            grid.cells[indexRow][indexColumn] = 'p';

            // avant de quitter, on affiche la grille
            //displayGrid(grid);
            grid.display();

            return false;
        }
    },

    sendMissile: function(cellName) {
        // On utilise la fonction getGridIndexes qui traduit notre string (ex: A5) en index (Ex: A5 => row = 4 et column = 0)
        const result = grid.getGridIndexes(cellName);

        console.log(result);

        // on voit qu'on stocke result[0] et result[1] dans deux variables, rowIndex et columnIndex (donc getGridIndexes va devoir renvoyer un tableau !)
        const rowIndex = result[0];
        const columnIndex = result[1];

        // Puis on appelle la fonction sendMissileAt
        // on prend soin de retourner la valeur de retour de sendMissileAt
        // (VRAI si touché, FALSE sinon)
        return this.sendMissileAt(rowIndex, columnIndex);
    },

    checkGameOver: function() {

        // compteur de nombre de bateaux
        let nbBateaux = 0;

        // Parcourir le tableau de la grille
        // grid[][]
        // on parcourt les lignes :
        for(let i = 0;i<grid.cells.length;i++) {

            // grid[i] contient une ligne de notre grille
            //console.log(grid[i]);
            // on parcourt les colonnes :
            for(let j = 0;j<grid.cells[i].length;j++) {
                // grid[i][j] contient une cellule de notre grille
                //console.log(grid[i][j]);

                // Compter le nombre de cases `'b'`
                // on vérifie si cette cellule contient un 'b'
                if(grid.cells[i][j] === 'b') {
                    nbBateaux++;
                    //return false;
                }
            }
        }

        //return true;

        // Si ce nombre est > 0 => la partie n'est pas terminée
        if(nbBateaux > 0) {
            // le jeu n'est pas fini, on retourne false
            return false;
        } else {
            // Sinon, la partie est terminée
            return true;
        }


        // version Mika : 
        /*let flatTab = grid.flat();		// on applati
        if (flatTab.indexOf("b") == -1) {	// -1 renvoyé si "b" pas trouvé
            return true;
        } return false;*/
    },

    // méthode pour mettre à jour le tour actuel
    updateRound: function() {
        // on récupère notre h3
        const myH3 = document.querySelector('#title');
        // on le met à jour avec la valeur actuelle du tour
        myH3.textContent = this.username + ' - Tour ' + this.round;
    }

};