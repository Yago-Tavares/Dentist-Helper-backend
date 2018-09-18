const bcrypt = require('bcryptjs');
const async = require('async');
const jwt = require('jsonwebtoken');
const User = require('../users/user');
const secret = require('../../config/secret');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

function generateToken( params = {}){
    return jwt.sign(params, secret.secret, {
        expiresIn: 86400
    });
}

exports.register = async(req, res) => {

    const {email} = req.body;

    try{

        if ( await User.findOne({ email })){
            return res.status(400).send({ error: "User already exists"});
        }

        console.log(email);

        const user = await User.create(req.body);

        user.password = undefined;
        console.log(user);

        return res.send({user, token: generateToken({id: user.id})});
    } catch (e) {
        return res.status(400).send({error: 'Registration failed. ' + e});
    }


};

exports.authenticate = async (req, res) => {


    const {email, password} = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user){
        return res.status(400).send({ error: 'User not found'});
    }

    if (! await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Invalid password' });
    }

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ id: user.id})
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
                    req.status(400).send({error: 'No account with that email address exists.'});
                    return res.redirect('/forgot');
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
                subject: 'Node.js Password Reset',
                text: 'Você está recebendo esta mensagem porque você (ou alguém) solicitou a redefinição de senha da sua conta.\n\n' +
                'Clique no link ou cole no seu navegador para completar o processo:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'Se você não solicitou a redefinição de senha, ignore o email e sua senha permanecerá a mesma.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                res.status(200).send({message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
};

exports.reset_password = function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    return res.status(400).send({error: 'Password reset token is invalid or has expired.'});
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
                res.status(200).send({message: 'Success! Your password has been changed.'});
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
            res.status(404).send({errorMessage: "User not found!"});
        }

        const oldPassword = req.body.oldPassword;
        var newPassword  = req.body.newPassword;
        const isValidPassword = bcrypt.compareSync(oldPassword, user.password);

        if (isValidPassword) {
            newPassword = await bcrypt.hash(newPassword, 10);
            await User.update({ _id: userId }, { $set: { "password": newPassword } });
            res.status(201).send({message: "Password successful updated!"});
        }else {
            res.status(400).send({message: "Password not updated!"});
        }
    }catch (error) {
        res.status(500).send({errorMessage: error.message});

    }
};

module.exports = exports;