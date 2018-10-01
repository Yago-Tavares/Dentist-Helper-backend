const bcrypt = require('bcryptjs');
const async = require('async');
const jwt = require('jsonwebtoken');
const User = require('../users/user');
const config = require('../../config/config');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

function generateToken(user){
    return jwt.sign({user}, config.secret, {
        expiresIn: 86400
    });
}
exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    console.log("TOKEN ", token);
    if (!token) return res.status(403).send({error: "Token não fornecido."});

    jwt.verify(token, config.secret, (err, decoded) => {
        let userDecoded = decoded.user;
        if (err) return res.status(403).send({error: 'Falha ao autenticat token.' });

        else if (userDecoded.user.type === 'DENTIST'){
            if (req.body.type !== 'SECRETARY' && req.body.type !== 'CLIENT') return res.status(403).send({error: "Não autorizado!"});
        }

        else if (userDecoded.user.type === 'SECRETARY'){
            if (req.body.type !== 'CLIENT') return res.status(403).send({error: "Não autorizado!"});
        }

        else if (userDecoded.user.type === 'CLIENT'){
            return res.status(403).send({error: 'Não autorizado!'});
        }

        next();
    });
};
exports.register = async(req, res) => {

    const {email} = req.body;

    try{
        if ( await User.findOne({ email })){
            return res.status(400).send({ error: "Usuário já existe."});
        }

        console.log(email);

        const user = await User.create(req.body);

        user.password = undefined;
        console.log(user);

        return res.send({user, token: generateToken(user)});
    } catch (e) {
        return res.status(400).send({error: 'Falha no cadastro. ' + e});
    }


};

exports.authenticate = async (req, res) => {


    const {email, password} = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user){
        return res.status(400).send({ error: 'Usuário não encontrado.'});
    }

    if (! await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Senha incorreta.' });
    }

    user.password = undefined;

    res.send({
        user,
        token: generateToken({user})
    });

};

exports.forgot_password = function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                let token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    return res.status(400).send({error: 'Não existe uma conta com o endereço de e-mail inserido.'});
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            const transporter = nodemailer.createTransport({
                debug: true,
                host: 'smtp.gmail.com',
                secureConnection: false, //also tried secure: false
                port: 465,
                auth: {
                    user: 'dentist.helperp1@gmail.com',
                    pass: 'projetop1' //triple checked, even tried changing it to something very simple (without any special characters)
                }
            });

            let mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Dentist-Helper Password Reset',
                text: 'Você está recebendo esta mensagem porque você (ou alguém) solicitou a redefinição de senha da sua conta.\n\n' +
                'Clique no link ou cole no seu navegador para completar o processo:\n\n' +
                config["front-url"] + '/reset/' + token + '\n\n' +
                'Se você não solicitou a redefinição de senha, ignore o email e sua senha permanecerá a mesma.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                res.status(200).send({message: 'Um email foi enviado para ' + user.email + ' com mais instruções.'});
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
    });
};

exports.reset_password = function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    return res.status(400).send({error: 'Token de recuperação de senha expirado ou inválido.'});
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                        done(err, user);
                });
            });
        },
        function(user, done) {
            const transporter = nodemailer.createTransport({
                debug: true,
                host: 'smtp.gmail.com',
                secureConnection: false, //also tried secure: false
                port: 465,
                auth: {
                    user: 'dentist.helperp1@gmail.com',
                    pass: 'projetop1' //triple checked, even tried changing it to something very simple (without any special characters)
                }
            });

            let mailOptions = {
                to: user.email,
                from: 'dentist.helperp1@gmail.com',
                subject: 'Your password has been changed',
                text: 'Olá,\n\n' +
                'Você redefiniu com sucesso a senha da sua conta  ' + user.email + ' no Dentist Helper.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                res.status(200).send({message: 'A senha foi alterada.'});
                //done(err);
            });
        }
    ], function(err) {
        res.status(400).send({error: err});
    });
};

exports.update_password = async(req,  res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user) {
            res.status(404).send({errorMessage: "Usuário não encontrado."});
        }

        const oldPassword = req.body.oldPassword;
        var newPassword  = req.body.newPassword;
        const isValidPassword = bcrypt.compareSync(oldPassword, user.password);

        if (isValidPassword) {
            newPassword = await bcrypt.hash(newPassword, 10);
            await User.update({ _id: userId }, { $set: { "password": newPassword } });
            res.status(201).send({message: "A senha foi alterada com sucesso."});
        }else {
            res.status(400).send({message: "A senha não foi alterada. Você deve informar corretamente a senha anterior."});
        }
    }catch (error) {
        res.status(500).send({errorMessage: error.message});

    }
};

module.exports = exports;