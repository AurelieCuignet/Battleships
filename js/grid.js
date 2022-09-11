// Notre premier module : grid.js !

//! Un module, c'est un tableau associatif !
// chaque élément de ce module associe une clé à une valeur
// la valeur d'un élément d'un module peut être un entier, une chaîne de caractères, un tableau et même ... une fonction !

// comment on définit un module ?
const grid = {
    // cells va contenir notre grille
    //! vu qu'un module est un tableau associatif, on ne définit pas nos propriétés (variables) avec = mais avec :
    cells: [],

    //! on ne sépare pas nos éléments du module par des ; mais par des virgules ,

    headers: {
        columns: [],
        lines: []
    },

    //! dans un module, les variables sont appelées des propriétés

    // dans un module, par convention, on a toujours une méthode init
    // cette méthode init permet d'initialiser le module
    init: function() {
        // on va initialiser ici nos propriétés

        // on initialise la grille :
        grid.cells = [
            ['', 'b', 'b', 'b', '', '', '', ''],
            ['', '', '', '', '', '', 'b', ''],
            ['', '', '', '', '', '', 'b', ''],
            ['', 'b', '', '', 'b', '', '', ''],
            ['', 'b', '', '', '', '', '', ''],
            ['', 'b', '', '', '', 'b', 'b', ''],
            ['', 'b', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']
        ];

        // on initialise nos headers :
        grid.headers.lines = ['1', '2', '3', '4', '5', '6', '7', '8'];
        grid.headers.columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        //! pour accéder à une propriété d'un module, on utilise nomModule.nomPropriete (et pas simplement nomPropriete)

        // on peut aussi faire référence à une propriété du module courant avec this.nomPropriete
        //! this fait référence au module COURANT (actuel)
        //this.headers.columns = '';
        //grid.headers.columns = '';

    },

    //! une fonction dans un module ne se définit pas de la même façon !
    //! nom: function(parametres) {...}
    //! dans un module, on appelle les fonctions des méthodes !
    display: function() {
        for(let i = 0; i < this.cells.length; i++) {
            // on parcourt les lignes
    
            // pour chaque ligne, on parcourt les cellules
            for(let j = 0; j < this.cells[i].length; j++) {
                // on récupère la cellule HTML appropriée
                //let cellHTML = document.querySelector('#cell' + i + j);
                let cellHTML = document.getElementById('cell'+i+j);
    
                // on met à jour son contenu texte avec le contenu de grid[i][j]
                //cellHTML.textContent = this.cells[i][j];
                // cellHTML.innerHTML = '<span>...'
    
                // on change la couleur EN FONCTION de si touché ou plouf
                if(this.cells[i][j] === 't') {
                    // si la cellule est un bateau touché
                    // on ajoute la class hit
                    cellHTML.classList.add('hit');

                    // on ajoute notre GIF flammes
                    cellHTML.innerHTML = '<img src="./img/flames.gif" width="50" height="50"/>';

                } else if (this.cells[i][j] === 'p') {
                    // si la cellule est un plouf
                    // on ajoute la class splash
                    cellHTML.classList.add('splash');

                    // on ajoute notre GIF flammes
                    cellHTML.innerHTML = '<img src="./img/water.gif" width="50" height="50"/>';
                }
            }
        }
    },

    getGridIndexes: function(cellName) {
        // on supprime les espaces dans cellName
        cellName = cellName.trim();
    
        // gérer la casse (passer tout en majuscule)
        cellName = cellName.toUpperCase();
    
        // notre variable cellName elle est de la forme A5 -> on veut récupérer A et 5
        const letter = cellName[0]; B
        const number = cellName[1]; 7
    
        console.log("Lettre récupérée : "+letter+" & chiffre récupéré : "+number);
    
        const rowIndex = grid.headers.lines.indexOf(number); 7 --> 6
        const columnIndex = grid.headers.columns.indexOf(letter); B --> 1
    
        // on sait déjà que cette fonction doit retourner un tableau
        return [rowIndex,columnIndex]; 6, 1
    }
};