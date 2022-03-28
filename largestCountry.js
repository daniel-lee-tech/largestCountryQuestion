// Find the country with the largest population by
// combining the given data on foreign keys

// The output of largestCountry should be an object with a
// key 'name' representing the country name and a key 'population'
// representing the countries total population

// Example Input Data:
// const countries = [
//   { id: 3, name: 'Russia' },
//   { id: 1, name: 'USA' },
// ];

// const cities = [
//   { id: 3, country_id: 1, name: 'Los Angeles' },
//   { id: 8, country_id: 3, name: 'Moscow' },
//   { id: 2, country_id: 1, name: 'Seattle' },
// ];

// const populations = [
//   { id: 3, city_id: 3, amount: 3960000 },
//   { id: 8, city_id: 8, amount: 11920000 },
//   { id: 2, city_id: 2, amount: 8240000 },
// ];

// Example Output: { name: 'USA', population: 12200000 }

const largestCountry = (countries, cities, populations) => {
  const countrysToCities = connectCountryToCitys(countries, cities);
  const countriesToPopulations = connectCitiesToPopulation(
    countrysToCities,
    populations
  );

  let maxId = null;
  let runningMax = 0;

  let result;

  // found my error:
  // CAN'T return out of statement in object.entries
  Object.entries(countriesToPopulations).forEach((entry) => {
    const id = entry[0];
    const population = parseInt(entry[1]);
    countries.forEach((e) => {
      if (population > runningMax) {
        maxId = id;
        runningMax = population;
      }

      if (e.id == maxId) {
        result = { name: e.name, population: runningMax };
      }
    });
  });

  return result;
};

function connectCitiesToPopulation(countryCity, populations) {
  // countyCity:
  // {}
  // key: countryId
  // value: city ids []

  // key: countryId
  // value: populationSUm
  const result = {};

  // [countryId, []]
  Object.entries(countryCity).forEach((entry) => {
    const countryId = parseInt(entry[0]);
    const cities = entry[1];

    cities.forEach((cityId) => {
      populations.forEach((population) => {
        const pCityId = population.city_id;
        const { amount } = population;

        if (pCityId === cityId) {
          if (countryId in result) {
            result[countryId] += amount;
          } else {
            result[countryId] = amount;
          }
        }
      });
    });
  });

  return result;
}

function connectCountryToCitys(countries, cities) {
  const result = {
    // key: country id
    // value: city ids[]
  };

  countries.forEach((country) => {
    const { id } = country;

    cities.forEach((city) => {
      const { country_id } = city;
      const city_id = city.id;

      if (id === country_id) {
        if (country_id in result) {
          result[country_id].push(city_id);
        } else {
          result[country_id] = [city_id];
        }
      }
    });
  });
  return result;
}

module.exports = largestCountry;
