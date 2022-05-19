import axios from 'axios'

const baseURL = 'https://restcountries.com/v3.1'

export const filters = {
  name: { label: 'País', key: 'name' },
  region: { label: 'Região', key: 'region' },
  capital: { label: 'Capital', key: 'capital' },
  lang: { label: 'Idioma', key: 'languages' },
  currency: { label: 'Moeda', key: 'currencies' },
}
export const filtersArr = Object.values(filters)
export const filtersKeys = Object.values(filters).map((filter) => filter.key)
export const filtersLabels = Object.values(filters).map(
  (filter) => filter.label
)
export const getLabelFromKey = (key) => {
  let filter = filtersArr.find((filter) => filter.key === key)
  return filter ? filter.label : ''
}
export const defaultFilterOptions = filtersKeys.reduce((acc, key) => {
  acc[key] = []
  return acc
}, {})

export const getCountries = (filterKey = '', filterValue) => {
  switch (filterKey) {
    case filters.name.key:
      return axios.get(`${baseURL}/name/${filterValue}`)
    case filters.region.key:
      return axios.get(`${baseURL}/region/${filterValue}`)
    case filters.capital.key:
      return axios.get(`${baseURL}/capital/${filterValue}`)
    case filters.lang.key:
      return axios.get(`${baseURL}/lang/${filterValue}`)
    case filters.currency.key:
      return axios.get(`${baseURL}/currency/${filterValue}`)
  }
}

export const getCountryInfo = (code) => {
  return axios.get(`${baseURL}/alpha/${code}`)
}

export const getCountriesByCode = (codes = []) => {
  return axios.get(`${baseURL}/alpha?codes=${codes.join(',')}`)
}

export const getAllCountries = (fields = filtersKeys) => {
  return axios.get(`${baseURL}/all?fields=${fields.join(',')}`)
}

export const formatOptions = (countries) => {
  let reduced = countries.reduce((options, item) => {
    //names
    if (options[filters.name.key]) {
      if (!options[filters.name.key].includes(item.name.common))
        options[filters.name.key] = [
          ...options[filters.name.key],
          item.name.common,
        ]
    } else {
      options[filters.name.key] = []
    }
    //region
    if (options[filters.region.key]) {
      if (!options[filters.region.key].includes(item.region))
        options[filters.region.key] = [
          ...options[filters.region.key],
          item.region,
        ]
    } else {
      options[filters.region.key] = []
    }
    //capital
    if (options[filters.capital.key]) {
      item.capital.forEach((capital) => {
        if (!options[filters.capital.key].includes(capital))
          options[filters.capital.key] = [
            ...options[filters.capital.key],
            capital,
          ]
      })
    } else {
      options[filters.capital.key] = []
    }
    //currencies
    if (options[filters.currency.key]) {
      Object.keys(item.currencies).forEach((currency) => {
        if (!options[filters.currency.key].includes(currency))
          options[filters.currency.key] = [
            ...options[filters.currency.key],
            currency,
          ]
      })
    } else {
      options[filters.currency.key] = []
    }
    //languages
    if (options[filters.lang.key]) {
      Object.values(item.languages).forEach((lang) => {
        if (!options[filters.lang.key].includes(lang))
          options[filters.lang.key] = [...options[filters.lang.key], lang]
      })
    } else {
      options[filters.lang.key] = []
    }

    return options
  }, defaultFilterOptions)
  return reduced
}
