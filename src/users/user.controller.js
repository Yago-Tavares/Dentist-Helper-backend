const userService = require('./userService');


exports.update = ('/', async (req, res) => {

    try {
        await userService.updateUser(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
        
    } catch (error) {
        res.send(error);
    }
});