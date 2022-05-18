import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
const api = {
    key:"a3ccd6b3ddb5f673fd9e882d79e77d3a",
    base:"https://api.openweathermap.org/data/2.5/"
}
function dateBuilder(d){

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();



    return `${day},${date} ${month} ${year}`
}
function App() {

  const [online , setOnline] = useState(true);
  const [input , setInput] = useState('');
  const [weatherData , setWeatherData] = useState('');
 // const [query , setQuery] = useState('');

  useEffect(()=>{
     defaultData()
  },[])


  const fetchApiWeather = (e) => {
  e.preventDefault()
  checkConnection()
  const InstanceAxios = axios.create();
  const y = InstanceAxios.get(`${api.base}weather?q=${input}&units=metric&appid=${api.key}`);
   y.then(res=>{
       console.log(res.data)
       setWeatherData(res.data)
   });
   y.catch(err =>{
          alert('err')
   })
      setInput('')

  }

  const defaultData = () => {
      checkConnection()
      const InstanceAxios = axios.create();
      const y = InstanceAxios.get(`${api.base}weather?q=${"tehran"}&units=metric&appid=${api.key}`);
      y.then(res=>{
          console.log(res.data)
          setWeatherData(res.data)
      });

  }


    const getInput = (e) => {
      e.preventDefault()
      let x = document.querySelector('.searchbar-cs').value;
      setInput(()=>x);

    }
    const checkConnection = ()=>{
      console.log(navigator.onLine)
      if (navigator.onLine === true){
          setInput(true)
      }else {
          setOnline(false)
      }


    }
    const setBackground = (status) => {
      switch (status) {
          case 'Clear' : {
              return `url("Assets/Images/Clear.jpg")`
          }
          case 'Clouds' : {
              return `url("Assets/Images/Cloudy.jpg")`
          }
          case 'Dust' : {
              return `url("Assets/Images/Sunny.jpg")`
          }
          case 'Haze' : {
              return `url("Assets/Images/Sunny.jpg")`
          }
          case 'Rain' : {
              return `url("Assets/Images/Rainy.jpg")`
          }

      }

    }
  return (
    <div className="App" style={{
        backgroundImage: weatherData ? setBackground(weatherData.weather[0].main):null
    }}>
    <div className="App-section" onLoad={defaultData}>
        <div className={'searchbar-section'}>
            <form>
                <input  type={'text'} className={'searchbar-cs'} placeholder={'enter city,country'}   onChange={(e)=>getInput(e)}></input>
                <button type={'submit'} className={'btn-cs'}  onClick={(e)=>fetchApiWeather(e)}>send</button>
            </form>

        </div>
        <div className={'content-section'}>
            <span className={'location-section'}>{weatherData.name?weatherData.name + ',' + weatherData.sys.country:"unknown"}</span>
            <span className={'date-section'}>{dateBuilder(new Date())}</span>
            <span className={'temperature-section'}>{weatherData ? weatherData.main.temp:null}</span>
            <span className={'weather-section'}>{weatherData ? weatherData.weather[0].main:'null'}</span>
        </div>
        <div className={'geo-section'}>
            <div className={'geo-section-title'}><i className={'bi bi-arrow-up'}></i></div>
            <div className={'geo-section-body'}>body</div>
        </div>
        <div className={'check_connection'} style={{
            display: online === true ? 'none':'flex'
        }}>
            <i className="bi bi-wifi-off"></i>
            <p>please check your connection ...</p>
        </div>
    </div>
    </div>
  );
}

export default App;
