
const index = (req, res) => {
    res.render('master', {
        head: { title: 'StreetTeam Front-End Task' }
    });
}

module.exports = {
    index
};
