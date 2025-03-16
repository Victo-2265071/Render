import express from 'express';
import { trouverUnPokemon, trouverListePokemon, ajouterUnPokemon, modifierUnPokemon, supprimerUnPokemon } from '../controllers/pokemons.controller.js';


const router = express.Router();


router.get('/liste', trouverListePokemon);
router.get('/:id', trouverUnPokemon);
router.post('/', ajouterUnPokemon);
router.put('/:id', modifierUnPokemon);
router.delete('/:id', supprimerUnPokemon);



export default router;