export interface CurrentWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherElement[];
}

export interface WeatherElement {
    id: number;
    main: string;
    description: string;
    icon: string;
}


export interface sevenDayForeCast {
    day: number;
    weather: string;
    min: number,
    max: number,
    sunrise: number,
    sunset: number,
    humidity: number,
    uvi: number
}

export interface DailyWeather {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    moonrise:   number;
    moonset:    number;
    moon_phase: number;
    temp:       Temp;
    feels_like: FeelsLike;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    WeatherElement[];
    clouds:     number;
    pop:        number;
    rain:       number;
    uvi:        number;
}

export interface FeelsLike {
    day:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface Temp {
    day:   number;
    min:   number;
    max:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface WeatherElement {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}
