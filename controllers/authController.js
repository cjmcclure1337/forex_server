const isAdmin = (req, res, next) => {
    //Authentication not implemented. Admin functions are unavailable until that is set up.
    res.send("You do not have access to this function")
}

module.exports = {isAdmin};