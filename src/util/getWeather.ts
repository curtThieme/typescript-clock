import dotenv from "dotenv";
import fetch from "node-fetch";// fetch is a client side function so to use in server, use node-fetch to use within node
dotenv.config();

function getWeather(weatherLatLong: string): Promise<{}> {
    return new Promise((resolve, reject): void => {
    	const {WEATHER_LAT, WEATHER_LON, OPEN_WEATHER_API_KEY, UNITS, EXCLUDE} = process.env;
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=${UNITS}&${EXCLUDE}&appid=${OPEN_WEATHER_API_KEY}`;
        fetch(url).then((res): {} => res.json()).then((result: {}): void => resolve(result))
            .catch((err): void => reject(err));
    });
}

export default getWeather;