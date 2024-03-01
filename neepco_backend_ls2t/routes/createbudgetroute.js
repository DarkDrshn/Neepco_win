import { Router } from 'express';
const budget=Router();
import { budgetcreation ,updatebudget,getBudget} from '../controllers/createbudget.js';
budget.post('/budgetcreate',budgetcreation);
budget.put('/updatebudget/:id',updatebudget);
budget.get('/getAllbudget',getBudget);

export default budget;
