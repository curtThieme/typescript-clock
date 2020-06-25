export interface WeatherForecast {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset?: number | null;
    current: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like?: number | null;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed?: number | null;
        wind_deg?: number | null;
        wind_gust?: number | null;
        weather?: (WeatherInfo)[] | null;
    };
}

export interface WeatherInfo{
    id: number;
    main: string;
    description: string;
    icon: string;
}