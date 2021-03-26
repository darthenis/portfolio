import {Router} from 'express';

const router= Router();

import * as datactrl from './data.controller';

router.get('/users', datactrl.getplayers);

router.post('/userstart', datactrl.insertplayer);

router.get('/users/:id', datactrl.getuser);

router.post('/motosrest/:id', datactrl.restarmotos);

router.post('/motossum/:id', datactrl.sumarmotos);

router.get('/motos', datactrl.getmotos);

router.post('/addmoto', datactrl.insertmoto);


export default router
