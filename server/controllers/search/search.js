const locations = require('../../api/locationList');

module.exports = {
    // https://localhost:4000/search?query={query}
    findOne: (req, res) => {
        if (req.query.query !== undefined) {
            // console.log(req.query.query);
            if (req.query.query.length == 0) {
                return res.status(400).json({ message: "please enter a search term" });
            }
            const list = locations.filter((location) => {
                const detailed = location.locationName.split(' ')[1];
                return detailed == req.query.query;
            });
            if (list.length > 0) {
                console.log(list[0].locationName);
                return res.status(200).json(list[0].locationName);
            } else {
                return res.status(404).json({ message: "please check the location name again" });
            }
        } else {
            return res.status(400);
        }
    }
};