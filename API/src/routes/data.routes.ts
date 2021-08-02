
import {Router} from 'express'
import * as userctrl from './data.user.controller'
import * as datactrl from './data.controller'
import * as matchctrl from './data.match.controller'

const router= Router();

router.get('/getplayers', datactrl.getplayers);

router.post('/addplayer', datactrl.addplayer);

router.post('/motosrest/:id', datactrl.restarmotos);

router.post('/motossum/:id', datactrl.sumarmotos);

router.get('/motos', datactrl.getmotos);

router.post('/addmoto', datactrl.insertmoto);

router.post('/sendmessage', datactrl.sendEmail);

//----------------------------------------UsersRoleTools--------------------------------

router.post('/loginuser', userctrl.loginUser)

router.post('/registeruser', userctrl.registerUser)

router.post('/recoveryuser', userctrl.recoveryAccount)

router.post('/roletools/getprofile', userctrl.ensureToken, userctrl.getUser)

router.get('/confirm/:code', userctrl.confirmEmail)

router.post('/resendlink', userctrl.reSendEmail)

router.post('/setnewemail', userctrl.setNewEmail)

router.post('/checkcode', userctrl.checkCode)

router.post('/restpass', userctrl.resetPassword)

router.post('/roletools/creatematch', userctrl.ensureToken, matchctrl.createMatch)

router.post('/roletools/seekmatch', userctrl.ensureToken, matchctrl.seekMatch )

router.post('/roletools/mymatch', userctrl.ensureToken, matchctrl.myMatch)


export default router
