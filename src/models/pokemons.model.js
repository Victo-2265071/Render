// À ajuster selon la structure
import db from '../config/db_pg.js';

const getPokemonFromID = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM pokemon WHERE id = $1`;
        const params = [id]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

const getPokemonPageFromType = (page, type) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM pokemon WHERE ($1 IS NULL OR type_primaire = $2 OR type_secondaire = $3) LIMIT 25 OFFSET $4`;
        const params = [type, type, type, ( page - 1 ) * 25]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(
                resultat.rows
            );
        });
    });
};

const getPokemonCountFromType = (type) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT COUNT(*) FROM pokemon WHERE ($1 IS NULL OR type_primaire = $2 OR type_secondaire = $3)`;
        const params = [type, type, type]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(
                resultat.rows
            );
        });
    });
};

const creerPokemon = (nom, type_primaire, type_secondaire, pv, attaque, defense) => {
    return new Promise((resolve, reject) => {

        const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire, pv, attaque, defense)  
                            VALUES ($1, $2, $3, $4, $5, $6);`;
        const params = [nom, type_primaire, type_secondaire, pv, attaque, defense]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(
                resultat.rows
                
            );
        });
    });
}

const modifierPokemon = (id, nom, type_primaire, type_secondaire, pv, attaque, defense) => {
    return new Promise((resolve, reject) => {

        const requete = `UPDATE pokemon 
                            SET 
                                nom = $1,
                                type_primaire = $2,
                                type_secondaire = $3,
                                pv = $4,
                                attaque = $5,
                                defense = $6
                            WHERE id = $7;
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
                resultat.rows
                
            );
        });
    });
}

const deletePokemonFromID = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `DELETE FROM pokemon WHERE id = $1`;
        const params = [id]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
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