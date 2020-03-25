import React, { useState } from 'react';

const api = {
	key: '9c3d27ff9a5145ba3cdcf21ef3aa21e2',
	base: 'https://api.openweathermap.org/data/2.5/'
};

function App() {
	const [ query, setQuery ] = useState('');
	const [ weather, setWeather ] = useState({});

	const search = (evnt) => {
		if (evnt.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery('');
					console.log(result);
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	function backgroundPicker(weather) {
		if (typeof weather.main != 'undefined') {
			console.log(weather);
			if (weather.main.temp > 90) {
				return 'app-warm';
			} else if (weather.weather[0].main === 'Rain') {
				return 'app-rain';
			} else if (weather.main.temp > 60 && weather.main.temp < 90) {
				return 'app-sunny';
			} else if (weather.main.temp < 0) {
				return 'app-snow';
			} else if (weather.main.temp > 0 && weather.main.temp < 30) {
				return 'app-cold';
			} else if (weather.main.temp > 30 && weather.main.temp < 50) {
				return 'app';
			} else {
				return 'app';
			}
		} else {
			return 'app';
		}
	}

	return (
		<div className={backgroundPicker(weather)}>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">
								<p>Recorded</p> {Math.round(weather.main.temp)}°F
							</div>
							<div className="feels-temp">
								<p>Feels Like:</p> {Math.round(weather.main.feels_like)}°F
							</div>
							<div className="weather">{weather.weather[0].main}</div>
							<div className="weather-sub">{weather.weather[0].description}</div>
						</div>
					</div>
				) : null}
			</main>
		</div>
	);
}

export default App;
