import chalk from 'chalk';
import dedent from 'dedent'

const printError = (error) => {
    console.log(chalk.bgRed('ERROR:') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen('Success:')+ ' ' + message);
};
const printHelp = ()=>{
    console.log(
        dedent`${chalk.bgCyan('HELP')}
        Без параметрів - вивід погоди.
        -с [CITY] - для увстановлення міста.
        -h - для виводу допомоги.
        -t [TOKEN] - для зберігання токену.
        `
    );
};

const printWeather = (res,icon) => {
    console.log(
        dedent`${chalk.bgYellow('WEATHER')} Погода в місті ${res.name}
        ${icon}  ${res.weather[0].description}
        Температура ${res.main.temp}℃  (відчувається як ${res.main.feels_like}℃)
        Вологість ${res.main.humidity}%
        Швидкість вітру ${res.wind.speed} м/c
        Видимість ${res.visibility} м.
        `
    );

};

export {printError, printSuccess, printHelp, printWeather}
