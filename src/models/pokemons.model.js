// À ajuster selon la structure
import db from '../config/db.js';

const getPokemonFromID = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM pokemon WHERE id = ?`;
        const params = [id]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};

const getPokemonPageFromType = (page, type) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM pokemon WHERE (? IS NULL OR type_primaire = ? OR type_secondaire = ?) LIMIT 25 OFFSET ?`;
        const params = [type, type, type, ( page - 1 ) * 25]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(
                resultat
            );
        });
    });
};

const getPokemonCountFromType = (type) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT COUNT(*) FROM pokemon WHERE (? IS NULL OR type_primaire = ? OR type_secondaire = ?)`;
        const params = [type, type, type]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(
                resultat
            );
        });
    });
};

const creerPokemon = (nom, type_primaire, type_secondaire, pv, attaque, defense) => {
    return new Promise((resolve, reject) => {

        const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire, pv, attaque, defense)  
                            VALUES (?, ?, ?, ?, ?, ?);`;
        const params = [nom, type_primaire, type_secondaire, pv, attaque, defense]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(
                resultat
                
            );
        });
    });
}

const modifierPokemon = (id, nom, type_primaire, type_secondaire, pv, attaque, defense) => {
    return new Promise((resolve, reject) => {

        const requete = `UPDATE pokemon 
                            SET 
                                nom = ?,
                                type_primaire = ?,
                                type_secondaire = ?,
                                pv = ?,
                                attaque = ?,
                                defense = ?
                            WHERE id = ?;
                            `;
        const params = [nom, type_primaire, type_secondaire, pv, attaque, defense, id]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(
                resultat
                
            );
        });
    });
}

const deletePokemonFromID = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `DELETE FROM pokemon WHERE id = ?`;
        const params = [id]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};

export default {
    getPokemonFromID,
    getPokemonPageFromType,
    getPokemonCountFromType,
    creerPokemon,
    modifierPokemon,
    deletePokemonFromID
}