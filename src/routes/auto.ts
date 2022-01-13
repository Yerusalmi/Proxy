import express from "express";
import {config as loadEnvConfig} from "dotenv";
const importDynamic = new Function("modulePath", "return import(modulePath)");
const fetch = async (...args:any[]) => {
    const module = await importDynamic("node-fetch");
    return module.default(...args);
};

loadEnvConfig();

export const Router = express.Router();

Router.get(`/${process.env.ROUTER_PATH}/`, async function (_req:any, _res:{ send:(arg0:any) => void; }) {
    const slugs = _req.query.slugs;
    const apiKey =  _req.query.apiKey || process.env.API_KEY_VALUE;
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${slugs}&${process.env.API_KEY}=${apiKey}`);
    const data = await response.json();
    _res.send(data);
});

