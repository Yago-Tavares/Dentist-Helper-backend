const dentistService = require('./dentist.service');

exports.getAllClients = ('/getAll', async (req, res) => {

    try {
        await dentistService.getAllClients((req.params.id, (response) => {
            res.status(response.status).send(response.data);
        }));

    } catch (error) {
        console.log(error);
        res.status(response.status).send(response.data);
    }
}); 