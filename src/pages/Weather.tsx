import { useState } from 'react'

import Title from '@/components/Weather/Title'
import Form from '@/components/Weather/Form'
import Results from '@/components/Weather/Results'
import Loading from '@/components/Weather/Loading'

interface ResultsState {
  country: string
  cityName: string
  temperature: string
  conditionText: string
  icon: string
}

const Weather = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [city, setCity] = useState<string>("")
  const [results, setResults] = useState<ResultsState>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: "",
  })

  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const key = import.meta.env.VITE_WEATHERAPI_KEY
    fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`)
      .then(res=>res.json())
      .then(data=>{
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon,
        })
        setLoading(false)
        setCity("")
      })
      .catch(()=>alert("エラーが発生しました"))
  }

  return (
    <div>
      <Title />
      <Form setCity={setCity} getWeather={getWeather} city={city}/>
      {loading ? <Loading /> : <Results results={results}/>}
    </div>
  )
}

export default Weather
