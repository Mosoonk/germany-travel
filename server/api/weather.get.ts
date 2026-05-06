import { defineEventHandler, getQuery, createError } from 'h3'
import { fetchWeatherApi } from 'openmeteo'

export interface WeatherResult {
  date: string
  tempMean: number
}

export default defineEventHandler(async (event): Promise<WeatherResult> => {
  const query = getQuery(event)
  const date = query.date as string
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw createError({
      statusCode: 400,
      message: 'required format: YYYY-MM-DD'
    })
  }
  const params = {
    latitude: 50.4153,
    longitude: 12.1716,
    start_date: date,
    end_date: date,
    daily: ['temperature_2m_mean'],
    timezone: 'Europe/Berlin'
  }
  let responses
  try {
    responses = await fetchWeatherApi(
      'https://archive-api.open-meteo.com/v1/archive',
      params
    )
  } catch {
    throw createError({ statusCode: 502, message: 'Open-Meteo API error' })
  }
  const response = responses[0]
  if (!response) {
    throw createError({ statusCode: 502, message: 'No response from Open-Meteo' })
  }
  const daily = response.daily()
  if (!daily) {
    throw createError({ statusCode: 404, message: 'No data for this date' })
  }

  const valuesArray = daily.variables(0)?.valuesArray()
  if (!valuesArray || valuesArray.length === 0) {
    throw createError({ statusCode: 404, message: 'No temperature data for this date' })
  }
  const tempMean = valuesArray[0]
  if (tempMean === undefined) {
    throw createError({ statusCode: 404, message: 'No temperature data for this date' })
  }
  return {
    date,
    tempMean: Math.round(tempMean * 10) / 10
  }
})
