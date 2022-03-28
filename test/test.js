const { it, equal } = require('../testSuite/suite');
const largestCountry = require('../largestCountry');

const countries = [
  { id: 4, name: 'New Zealand' },
  { id: 1, name: 'USA' },
  { id: 2, name: 'England' },
  { id: 3, name: 'Russia' },
  { id: 5, name: 'Japan' },
  { id: 6, name: 'India' },
];

const originalCountries = countries.map((country) => ({ ...country }));

const cities = [
  { id: 3, country_id: 1, name: 'Los Angeles' },
  { id: 8, country_id: 3, name: 'Moscow' },
  { id: 2, country_id: 1, name: 'Seattle' },
  { id: 11, country_id: 4, name: 'Wellington' },
  { id: 5, country_id: 1, name: 'San Diego' },
  { id: 7, country_id: 2, name: 'Manchester' },
  { id: 9, country_id: 3, name: 'Novosibirsk' },
  { id: 1, country_id: 1, name: 'New York' },
  { id: 6, country_id: 2, name: 'London' },
  { id: 10, country_id: 4, name: 'Auckland' },
  { id: 4, country_id: 1, name: 'Houston' },
  { id: 12, country_id: 5, name: 'Tokyo' },
  { id: 13, country_id: 5, name: 'Yokohama' },
  { id: 14, country_id: 5, name: 'Osaka' },
  { id: 15, country_id: 6, name: 'Mumbai' },
  { id: 16, country_id: 6, name: 'Delhi' },
  { id: 17, country_id: 100, name: 'Wonderland' },
];

const populations = [
  { id: 2, city_id: 2, amount: 724305 },
  { id: 4, city_id: 4, amount: 2310000 },
  { id: 6, city_id: 6, amount: 8982000 },
  { id: 3, city_id: 3, amount: 3967000 },
  { id: 1, city_id: 1, amount: 8419000 },
  { id: 5, city_id: 5, amount: 1410000 },
  { id: 8, city_id: 8, amount: 11920000 },
  { id: 7, city_id: 7, amount: 553230 },
  { id: 11, city_id: 11, amount: 212700 },
  { id: 12, city_id: 12, amount: 8336600 },
  { id: 13, city_id: 13, amount: 3574400 },
  { id: 9, city_id: 9, amount: 1511000 },
  { id: 10, city_id: 10, amount: 1657000 },
  { id: 14, city_id: 14, amount: 2592413 },
  { id: 15, city_id: 15, amount: 12442373 },
  { id: 16, city_id: 16, amount: 11007835 },
];

it('should not error', () => {
  largestCountry(countries, cities, populations);
});

it('should not have side effects', () => {
  originalCountries.forEach((country, i) => {
    equal(Object.keys(country).length, Object.keys(countries[i]).length);
    equal(country.name, countries[i].name);
    equal(country.id, countries[i].id);
  });
});

it('should have correct name given 3 countries', () => {
  const country = largestCountry(countries.slice(0, 3), cities, populations);
  console.log(country, 'in test');
  equal(country.name, 'USA');
});

it('should have correct name given all countries', () => {
  const country = largestCountry(countries, cities, populations);
  equal(country.name, 'India');
});

it('should have correct name given all countries with modified populations', () => {
  const modifiedPopulations = populations.map((population) => {
    const pop = { ...population };
    if (pop.city_id === 11) {
      pop.amount = 1000000000;
    }

    return pop;
  });
  const country = largestCountry(countries, cities, modifiedPopulations);
  equal(country.name, 'New Zealand');
});

it('should have correct largest population given 3 countries', () => {
  const country = largestCountry(countries.slice(0, 3), cities, populations);
  equal(country.population, 16830305);
});

it('should have correct largest population given all countries', () => {
  const country = largestCountry(countries, cities, populations);
  equal(country.population, 23450208);
});

it('should have correct largest population given all countries with modified populations', () => {
  const modifiedPopulations = populations.map((population) => {
    const pop = { ...population };
    if (pop.city_id === 11) {
      pop.amount = 1000000000;
    }

    return pop;
  });
  const country = largestCountry(countries, cities, modifiedPopulations);
  equal(country.population, 1001657000);
});
