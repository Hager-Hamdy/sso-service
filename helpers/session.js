const setSessionValues = (req, values) => {
    Object.keys(values).forEach((name) => {
        req.session[name] = values[name];
    })
}

module.exports = {
    setSessionValues
};