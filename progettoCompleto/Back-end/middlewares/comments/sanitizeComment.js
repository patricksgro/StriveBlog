import sanitizeHtml from 'sanitize-html'

export const sanitizeComment = (req, res, next) => {
    if (req.body.text) {
        req.body.text = sanitizeHtml(req.body.text, {
            allowedTags: ['b', 'i', 'em', 'strong', 'code', 'pre'],
            allowedAttributes: {}
        })
    }
    next()
}