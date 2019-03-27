const userService = require('./userService');


exports.update = ('/', async (req, res) => {

    try {
        await userService.updateUser(req.params.id, req.body, (response) => {
            res.status(response.status).send(response);
        });
            
        
    } catch (error) {
        res.send(error);
    }
});