import { Component, OnInit } from '@angular/core';
import { weatherData } from './models/weather.models';
import { WeatherService } from './services/weather.service';
import { planetData } from './planet-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  cityName: string = 'Jamshedpur';
  weatherData?: weatherData;
  planetName: string = '';
  planetDescription: string = '';
  planetHiddenMessage: string = '';
  planetImageSrc: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  onSubmit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string): void {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (response) => {
        this.weatherData = response;
        this.updatePlanetDetails();
        console.log(response);
      },
      error: (error) => {
        this.weatherData = undefined; 
        this.updatePlanetDetails();
        console.log(error);
      }
    });
  }
  getWeatherMessage(): string {
    if (!this.weatherData) {
      return 'Huh?';
    }
  
    const temperature = this.weatherData.main?.temp;
    const description = this.weatherData.weather?.[0]?.description;
  
    if (temperature && description) {
      if (temperature < 10 && description.includes('rain')) {
        return 'Yikes! It is cold and rainy.';
      } else if (temperature > 30 && description.includes('clear')) {
        return 'Whew! It is hot and sunny.';
      } else if (description.includes('cloud')) {
        return 'Ahh, it is cloudy.';
      } else if (description.includes('snow')) {
        return 'Oh my, it is snowing.';
      } else if (description.includes('thunderstorm')) {
        return 'Ugh, there is a thunderstorm.';
      } else if (description.includes('fog')) {
        return 'Wow, it is foggy.';
      } else if (description.includes('drizzle')) {
        return 'Oh, it is drizzling.';
      }
    }
  
    return 'Hmm'; 
  }
  

  updatePlanetDetails(): void {
    if (!this.weatherData || !this.weatherData.name) {
      this.planetName = 'Alderaan';
      this.planetDescription = 'Try again, or try another city.';
      this.planetHiddenMessage =
        "It might be a temporary error, or the system might not know that place.";
      this.planetImageSrc = 'assets/images/alderaan.png';
      return;
    }

    const cityName = this.weatherData.name.toLowerCase();
    let planet = planetData.find(
      (p) => p.name.toLowerCase() === cityName
    );

    if (!planet) {
      planet = planetData.find(
        (p) => p.name.toLowerCase() === 'alderaan'
      );
    }

    if (!planet) {
      return;
    }

    this.planetName = planet.name;
    this.planetDescription = planet.description;
    this.planetHiddenMessage = planet.hiddenMessage;
    this.planetImageSrc = planet.imageSrc;

    const filteredTemp = Math.round(this.weatherData.main.temp * 9 / 5 + 32);

    if (filteredTemp <= 35) {
      const hothPlanet = planetData.find((p) => p.name.toLowerCase() === 'hoth');
      if (hothPlanet) this.updatePlanetData(hothPlanet);
    } else if (filteredTemp <= 55) {
      const nabooPlanet = planetData.find((p) => p.name.toLowerCase() === 'naboo');
      if (nabooPlanet) this.updatePlanetData(nabooPlanet);
    } else if (filteredTemp <= 65) {
      const kaminoPlanet = planetData.find((p) => p.name.toLowerCase() === 'kamino');
      if (kaminoPlanet) this.updatePlanetData(kaminoPlanet);
    } else if (filteredTemp <= 72) {
      const dagobahPlanet = planetData.find((p) => p.name.toLowerCase() === 'dagobah');
      if (dagobahPlanet) this.updatePlanetData(dagobahPlanet);
    } else if (filteredTemp <= 78) {
      const tatooinePlanet = planetData.find((p) => p.name.toLowerCase() === 'tatooine');
      if (tatooinePlanet) this.updatePlanetData(tatooinePlanet);
    } else if (filteredTemp <= 90) {
      const bespinPlanet = planetData.find((p) => p.name.toLowerCase() === 'bespin');
      if (bespinPlanet) this.updatePlanetData(bespinPlanet);
    } else {
      const yavin4Planet = planetData.find((p) => p.name.toLowerCase() === 'yavin 4');
      if (yavin4Planet) this.updatePlanetData(yavin4Planet);
    }
  }

  updatePlanetData(planet: any): void {
    this.planetName = planet.name;
    this.planetDescription = planet.description;
    this.planetHiddenMessage = planet.hiddenMessage;
    this.planetImageSrc = planet.imageSrc;
  }
}
