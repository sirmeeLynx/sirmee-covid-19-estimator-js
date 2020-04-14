'use strict';
const multer = require('multer');
const upload = multer(); // for parsing multipart/form-data

module.exports = function (app) {
    const controller = require('../controller/on-covid');
    const { covid19estimator, logger } = controller;
    const fnOnCovidJSON = covid19estimator();
    const fnOnCovidXML = covid19estimator('xml');

    app.route('/api/v1/on-covid-19').post(fnOnCovidJSON);
    app.route('/api/v1/on-covid-19/json').post(fnOnCovidJSON);
    app.route('/api/v1/on-covid-19/xml').post(fnOnCovidXML);
    app.route('/api/v1/on-covid-19/logs').get(logger);

     app.route('*')
        .get((req,res)=>{
            res.send({
                status: 'error',
                message: 'Invalid endpoint',
                data: null
            })
        })
        .post((req,res)=>{
            res.send({
                status: 'error',
                message: 'Invalid endpoint',
                data: null
            })
        })            
};
