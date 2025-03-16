// À ajuster selon la structure
import pokemonsModel from "../models/pokemons.model.js";

const trouverUnPokemon = async (req, res) => {
    // Teste si le paramètre id est présent et valide
    if(!req.params.id || parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id du pokemon est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction getPokemon dans le modèle
    await pokemonsModel.getPokemonFromID(req.params.id)
    // Si c'est un succès
    .then((pokemon) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (!pokemon[0]) {
            res.status(404);
            res.send({
                message: `Pokemon introuvable avec l'id ${req.params.id}`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un pokemon par id
        res.send(pokemon[0]);
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération du pokemon avec l'id " + req.params.id
        });
    });
};

const trouverListePokemon = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Page demandée, par défaut 1
        const type = req.query.type || null;

        // Récupère la liste des pokémons de la page et du type demandés
        const pokemons = await pokemonsModel.getPokemonPageFromType(page, type);

        // Vérifie si aucun Pokémon n'est trouvé
        if (!pokemons[0]) {
            return res.status(404).send({
                message: `Pokemon introuvable avec le type ${type}`
            });
        }

        // Récupère le nombre total de pokémons du type demandé
        const count = await pokemonsModel.getPokemonCountFromType(type);

        return res.send({
            type: type,
            nombrePokemonTotal: count[0]["COUNT(*)"],
            page: page,
            totalPage: Math.ceil(count[0]["COUNT(*)"] / 25),
            pokemons: pokemons
        });

    } catch (erreur) {
        console.log('Erreur : ', erreur);
        return res.status(500).send({
            message: `Erreur lors de la récupération des pokemons avec le type ${type}`
        });
    }
};

const ajouterUnPokemon = async (req, res) => {
    // Récupérer les informations du body de la requete
    const parametresRequete = req.body;

    try{

        let champsManquant = [];
        // Vérifier que toutes les informations sont présentes
        if(!parametresRequete.nom || typeof parametresRequete.nom != "string") champsManquant.push("nom");

        if(!parametresRequete.type_primaire || typeof parametresRequete.type_primaire != "string") champsManquant.push("type_primaire")

        if(typeof parametresRequete.type_secondaire != "string") champsManquant.push("type_secondaire")

        if(!parametresRequete.pv || !Number.isInteger(parametresRequete.pv)) champsManquant.push("pv")

        if(!parametresRequete.attaque || !Number.isInteger(parametresRequete.attaque)) champsManquant.push("attaque")

        if(!parametresRequete.defense || !Number.isInteger(parametresRequete.defense)) champsManquant.push("defense")

        if(champsManquant.length !== 0) {
            return res.status(400).send({
                message: `Le format des données est invalide`,
                champsManquant: champsManquant
            });
        }

        // Executer la requete
        const pokemonCree = await pokemonsModel.creerPokemon(parametresRequete.nom, parametresRequete.type_primaire, parametresRequete.type_secondaire, parametresRequete.pv, parametresRequete.attaque, parametresRequete.defense);
        
        // Renvoyer la réponse
        return res.send({
            message: `Le pokemon ${parametresRequete.nom} a été ajouté avec succès`,
            id: pokemonCree.insertId,
            nom: parametresRequete.nom,
            type_primaire: parametresRequete.type_primaire,
            type_secondaire: parametresRequete.type_secondaire,
            pv: parametresRequete.pv,
            attaque: parametresRequete.attaque,
            defense: parametresRequete.defense
        });
    
        // Gestion de l'erreur
    } catch (erreur) {
        console.log('Erreur : ', erreur);
        return res.status(500).send({
            message: `Erreur lors de la création du pokemon ${parametresRequete.nom}`
        });
    }
}

const modifierUnPokemon = async (req, res) => {
    // Teste si le paramètre id est présent et valide
    if(!req.params.id || parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id du pokemon est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction getPokemon dans le modèle
    await pokemonsModel.getPokemonFromID(req.params.id)
    // Si c'est un succès
    .then((pokemon) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (!pokemon[0]) {
            res.status(404);
            res.send({
                message: `Pokemon introuvable avec l'id ${req.params.id}`
            });
            return;
        }
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération du pokemon avec l'id " + req.params.id
        });
    });

    // Récupérer les informations du body de la requete
    const parametresRequete = req.body;

    try{

        let champsManquant = [];
        // Vérifier que toutes les informations sont présentes
        if(!parametresRequete.nom || typeof parametresRequete.nom != "string") champsManquant.push("nom");

        if(!parametresRequete.type_primaire || typeof parametresRequete.type_primaire != "string") champsManquant.push("type_primaire")

        if(typeof parametresRequete.type_secondaire != "string") champsManquant.push("type_secondaire")

        if(!parametresRequete.pv || !Number.isInteger(parametresRequete.pv)) champsManquant.push("pv")

        if(!parametresRequete.attaque || !Number.isInteger(parametresRequete.attaque)) champsManquant.push("attaque")

        if(!parametresRequete.defense || !Number.isInteger(parametresRequete.defense)) champsManquant.push("defense")

        if(champsManquant.length !== 0) {
            return res.status(400).send({
                message: `Le format des données est invalide`,
                champsManquant: champsManquant
            });
        }

        // Executer la requete
        const pokemonCree = await pokemonsModel.modifierPokemon(req.params.id, parametresRequete.nom, parametresRequete.type_primaire, parametresRequete.type_secondaire, parametresRequete.pv, parametresRequete.attaque, parametresRequete.defense);
        
        // Renvoyer la réponse
        return res.send({
            message: `Le pokemon ${req.params.id} a été modifié avec succès`,
            pokemon: {
                id: req.params.id,
                nom: parametresRequete.nom,
                type_primaire: parametresRequete.type_primaire,
                type_secondaire: parametresRequete.type_secondaire,
                pv: parametresRequete.pv,
                attaque: parametresRequete.attaque,
                defense: parametresRequete.defense
            }
            
        });
    
        // Gestion de l'erreur
    } catch (erreur) {
        console.log('Erreur : ', erreur);
        return res.status(500).send({
            message: `Erreur lors de la création du pokemon ${parametresRequete.nom}`
        });
    }
}

const supprimerUnPokemon = async (req, res) => {
    // Teste si le paramètre id est présent et valide
    if(!req.params.id || parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id du pokemon est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    const pokemonSupprime = await pokemonsModel.getPokemonFromID(req.params.id);
    // Appel à la fonction getPokemon dans le modèle
    await pokemonsModel.deletePokemonFromID(req.params.id)
    // Si c'est un succès
    .then((pokemon) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (pokemon.affectedRows == 0) {
            res.status(404);
            res.send({
                message: `Pokemon introuvable avec l'id ${req.params.id}`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un pokemon par id
        
        res.send({
            message: `Pokemon avec l'id ${req.params.id} supprimé avec succès`,
            pokemon: pokemonSupprime[0]
        });
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération du pokemon avec l'id " + req.params.id
        });
    });
};


export {
    trouverUnPokemon,
    trouverListePokemon,
    ajouterUnPokemon,
    modifierUnPokemon,
    supprimerUnPokemon
}