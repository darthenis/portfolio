import {Router} from 'express';

const router= Router();

import * as datactrl from './data.controller';

router.get('/getplayers', datactrl.getplayers);

router.post('/addplayer', datactrl.addplayer);

router.post('/motosrest/:id', datactrl.restarmotos);

router.post('/motossum/:id', datactrl.sumarmotos);

router.get('/motos', datactrl.getmotos);

router.post('/addmoto', datactrl.insertmoto);


export default router
