import { Router } from 'express';
import { getPersonas, deletePersona, updatePersona } from "../controllers/persona.js";

const router = Router();

router.get('/lista', getPersonas);
router.delete('/:id', deletePersona);
router.post('/registro', updatePersona);

export default router;