
//funzione permesso accordato
// export function restrictedTo(...roles) {
//     return (req, res, next) => {
//         if (!roles.includes(req.author.role)) {
//             return res.status(403).json({ message: 'Non hai i permessi' })
//         }
//         next()
//     }
// }

//da rivedere il processo di cambio password per ora commentato
//da rivedere il processo di creazione utente perche deve essere permesso da un admin ma comunque sia il processo di creazione significa registrazione utente per cui ci vorrà una nuova rotta che si accessibile a tutti ed i controlli saranno quelli dei controller degli utenti che gia abbiamo