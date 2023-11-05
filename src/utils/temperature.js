
function fixed(N, n) {
    return Math.round(N * Math.pow(10, n))/Math.pow(10, n);
}

export const celsiusToFahrenheit = (celsius) => {
    return fixed((celsius * 9 / 5) + 32, 2)
}

export const celsiusToKelvin = (celsius) => {
    const n = 100
    return (parseInt(celsius * n) + 27315) / n
}

export const getTemperatureName = (symbol) => {
    return {
        'c': '°C',
        'k': 'K',
        'f': '℉',
    }[symbol]
}

