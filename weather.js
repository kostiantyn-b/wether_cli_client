#!/usr/bin/env node
import {getArgs} from "./helpers/args.js"
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import { getWeather, getIcon } from './services/api.service.js'

const saveToken = async (token)=>{
    if (!token.length){
        printError("Токен не може бути пусти");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен збережено');
    } catch (e) {
        printError(e.message);
    }
};
const saveCity = async (city)=>{
    if (!city.length){
        printError("Назва міста не може бути порожнім");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Місто збережено');
    } catch (e) {
        printError(e.message);
    }
};

const getForCast = async () => {
    try {
       const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
       const weatherRes = await  getWeather(city);
        printWeather(weatherRes, getIcon(weatherRes.weather[0].icon));
    } catch (e) {
        if (e?.response?.status == 404) {
            printError("Помилка в назві міста.");
        }else if (e?.response?.status == 401) {
            printError("Не вірно вказан токен.");
        } else {
            printError(e.message);
        }
    }
};

const initCLI = ()=>{
    const args = getArgs(process.argv);

    if (args.h) {
       return  printHelp();
    }
    if (args.c){
        return saveCity(args.c)
    }
    if (args.t) {
       return saveToken(args.t);
    }
     return getForCast();

};
initCLI();
