import mongoose, { Schema } from "mongoose";
import { CommentSchema } from "./Comment.js";


const postsSchema = new Schema({
    titolo: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 45,
        trim: true
    },
    descrizione: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 500,
        trim: true
    },
    readTime: {
        value: {
            type: Number,
            required: true,
            min: 1
        },
        unit: {
            type: String,
            required: true,
            trim: true,
            enum: ['min', 'hour', 'day']
        }
    },
    categoria: {
        type: String,
        required: true,
        maxlength: 18,
        trim: true
    },
    cover: {
        type: String,
        trim: true,
        default: 'https://res.cloudinary.com/dkmd7iqjt/image/upload/v1757238481/noImg_jg84pm.webp',
        match: [/\.(jpg|jpeg|png|gif|webp|svg)$/i, 'URL non valida']
    },
    autore: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    //embedding dei commenti
    comments: [
        CommentSchema
    ]
    //con select false un campo non viene incluuso nella restituizione al front end
}, { timestamps: true }) //aggiunge automaticamente due voci createAt: {datacreazione} & updateAt {dataultimamodifica}

const Post = mongoose.model('Post', postsSchema)
//non fare model per gli schema embeddati altrimenti si creea la collection ,da vederr

export default Post;




