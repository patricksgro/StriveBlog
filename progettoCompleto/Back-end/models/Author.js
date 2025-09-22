import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import Post from './Post.js'


const AuthorSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 35
    },
    cognome: {
        type: String,
        trim: true,
        maxlength: 35
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,7}$/, 'Email non valida']
    },
    dataDiNascita: {
        type: Date,
    },
    avatar: {
        type: String,
        default: 'silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    googleId: {
        type: String
    },
    password: {
        type: String,
        minlength: 6
    },
    // lastPasswordChangedAt: Date
    //da vedere la logica per la funzione di cambio password quindi una rotta autorizzata solo all'utente loggato con permessi di modifica dati propri ecc
}, { timestamps: true })

//riferimento ai post dell'autore con virtual cosi non dobbiamo fare il push manuale dentro i controller ogni volta, poi fai populate quando cerchi autore nel db ed in front end puoi avere i posts
AuthorSchema.virtual('posts', {
    ref: 'Post',            // il modello di riferimento
    localField: '_id',      // campo dell'autore
    foreignField: 'autore', // campo nel post che contiene l'ID autore
    justOne: false          // perché vogliamo un array
});

AuthorSchema.set('toObject', { virtuals: true })
AuthorSchema.set('toJSON', { virtuals: true })

//eliminazione post insieme all'autore
AuthorSchema.pre('findOneAndDelete', async function (next) {
    const author = await this.model.findOne(this.getFilter());
    if (author) {
        await Post.deleteMany({ autore: author._id });
    }
    next();
});

AuthorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next()

    } catch (err) {
        next(err)
    }
})

//istanza di un metodo ossia qualcosa che sarà disponibile su tutti i documenti utente
AuthorSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

//definiamo lo schema (collection nel nostro database) come modello (1_nome dello schema, 2_a quale deve essere associato)
const Author = mongoose.model('Author', AuthorSchema)



export default Author