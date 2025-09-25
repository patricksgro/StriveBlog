import { login, register } from "../controllers/auth.js"
import express from "express"
import { sanitizeRequest } from "../middlewares/common/sanitizeRequest.js"
import { validateRequest } from "../middlewares/common/validateRequest.js"
import { createAuthorSchema } from "../validations.js/author.validator.js"
import passport from "passport"

const authRouter = express.Router()

authRouter.post('/login', login)

authRouter.post('/register', sanitizeRequest, validateRequest(createAuthorSchema), register)

//rotta che viene vhiamata quando utente clicca su accedi con google, ci porta alla pagina google
//la rotta prevede il primo middleware che è previsto da passport e si chiama cosi, 'google' rappresenta l'ente, necessario perche abbiamo usato gooleStrategyAouth20 e nello scope indichiamo che dati vogliamo
authRouter.get('/login-google', passport.authenticate('google', { scope: ['profile', 'email'] }))

//rotta che viene chiamata quando utente accetta di dare i dati tramite google, quindi google chiama questo endpoint passando i dati, la configurazione dei dati passati ed il processo sta in passportConfig.js
//richiamiamo passport.authenticate con google e come oggetto session: false perche usando react non usiamo i cookie per il jwt ma localStorage
//e poi callback che chiamiamo qui senza fare funzione a parte e la risposta sarà il redirect al nostro front end con jwt negli indirizzi
//è una get perche i dati vanno nel header
authRouter.get('/callback-google', passport.authenticate('google', { session: false }), (req, res, next) => {
    res.redirect(process.env.FRONTEND_HOST + '/login?jwt=' + req.user.jwt)
})

export default authRouter