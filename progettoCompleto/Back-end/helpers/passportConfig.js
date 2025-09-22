import GoogleStrategy from 'passport-google-oauth20'
import { signJWT } from './jwt.js'
import Author from '../models/Author.js'

const googleStrategy = new GoogleStrategy({
    //dati che servono quando appare il popu google, popup in cui si chiede all'utente se accetta di dare i dati
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK_PATH}`
},
    //si attiva quando google ci passa i dati dell'utente, cioè quando l'utente autorizza al passaggio dati
    async function (accessToken, refreshToken, profile, callback) {
        //id utente sta in profile.id
        //dati privati in profile._json

        //verifichiamo che l'id utente (che passa google) non sia gia nel nostro db, se non c'è lo creiamo
        let user = await Author.findOne({ googleId: profile.id })
        try {
            if (!user) {
                user = Author.create({
                    nome: profile._json.given_name,
                    cognome: profile._json.family_name,
                    email: profile._json.email,
                    avatar: profile._json.picture,
                    googleId: profile.id
                })
            }


            const jwt = await signJWT({
                id: user._id
            })
            //alla callback si passa l'errore ed il jwt, se tutto ok errore è null e andiamo, senno errore c'è e poi null perche non importa piu cosa passiamo dopo
            callback(null, { jwt }) //req.user (perche passport crea req.user e quindi lo aggiunge li)
        }

        catch (err) {
            callback(err, null)
        }
    }
)

export default googleStrategy