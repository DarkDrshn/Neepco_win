import { Router } from 'express';
const router = Router();
import { invitationToAdmin, invitationToEmp } from '../controllers/invitation.js';

router.post('/admin',invitationToAdmin);
router.post('/emp',invitationToEmp);


export default router;
