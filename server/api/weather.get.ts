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
  const daily = responses[0].daily()
  if (!daily) {
    throw createError({ statusCode: 404, message: 'No data for this date' })
  }
  const tempMean = daily.variables(0)!.valuesArray()![0]
  const timestamp = Number(daily.time()) * 1000
  const resultDate = new Date(timestamp).toISOString().split('T')[0]
  return {
    date: resultDate,
    tempMean: Math.round(tempMean * 10) / 10
  }
})
