var express = require('express');
var router = express.Router();

const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
  //issuer: process.env.ISSUER,
  issuer:'https://auth-dev.jpos.io',
})

router.use(async(req, res, next) =>{
    try {
        const { authorization } = req.headers
        if (!authorization) throw new Error('You must send an Authorization header')
    
        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
        await oktaJwtVerifier.verifyAccessToken(token)
        next();
    } catch (error) {
        res.json({ error: error.message })
    }
})

module.exports = router;