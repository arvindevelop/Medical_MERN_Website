import React,{useState,useEffect} from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from '../Sidebar';
import { Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Logs from './Logs';
import Sleepattern from './Sleepattern';


const Viewprofile = () => {

    const {name,email} = useLocation().state;
    const [profiles, setProfiles] = useState([])
    const [log,setLog] = useState(true)
    const [pattern,setPattern] = useState(false)

    function getFullDate(newDate)
    {
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let reverseFullDate = year.toString() + '-' + month.toString().padStart(2,"0") + '-' + date.toString().padStart(2,"0");
        let currFullDate = date.toString().padStart(2,"0") + '-' + month.toString().padStart(2,"0") + '-' + year.toString();
        return [reverseFullDate,currFullDate];
    }

    const [reverseFullDate,currFullDate] = getFullDate(new Date())
    const [days, setDays] = useState(currFullDate);
    const [calender,setCalender] = useState(reverseFullDate);

     useEffect(() => {
        const fetchData = () => {
            axios.get(`http://localhost:5000/api/v1/vtrack/all/${email}/${name}`,{ withCredentials: true })
                .then(response => {
                    setProfiles(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    },[email,name]);

    const handleInputs = (e) =>{
        var val = e.target.value;
        var [calenderDate,fullDate] = getFullDate(new Date(val));
        setDays(fullDate);
        setCalender(calenderDate);
    }

    const handleLog = () =>{
        setPattern(false);
        setLog(true);
    }

    const handleSleepattern = () => {
        setLog(false);
        setPattern(true);
    }

    function getLabels(){
        var len = profiles.allreading.length;
        var data = [];
        for(let i=0;i<len;i++)
        {
            var [,tempDate] = getFullDate(new Date(profiles.allreading[i].timestamp));
            if(tempDate === days)
                data.push(new Date(profiles.allreading[i].timestamp * 1000).getHours());
        }
        //setLabel(data);
        return data;
    }
    
    function getValues(){
        var len = profiles.allreading.length;
        var data = [];
        for(let i=0;i<len;i++)
        {
            var [,tempDate] = getFullDate(new Date(profiles.allreading[i].timestamp));
            if(tempDate === days)
                data.push(profiles.allreading[i].temperature);
        }
        //setValue(data);
        return data;
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    <div className="col py-3">
                        <div className="d-flex gap-2 col-5">
                        <button type="button" class="btn btn-primary" onClick={handleLog}>Charts & Logs</button>
                        <button type="button" class="btn btn-primary" onClick={handleSleepattern}>Sleep Pattern</button>
                            <button type="button" class="btn btn-primary">Therapy & Suggestions</button>
                        </div>
                        <div>
                        {profiles.allreading===undefined?(<div></div>):(pattern?(<div></div>):(<div className="d-flex justify-content-between" style={{padding:"1em"}}>
                                <div style={{display:"inline-block"}}><input type="date" id="readingDate" name="readingDate" value={calender} 
                                min="2022-01-01" max="2022-12-31" onChange={handleInputs}/></div>
                                <div style={{display:"inline-block"}}><strong><p>{days}</p></strong></div>
                            </div>))
                        }
                            {profiles.allreading===undefined?(<div></div>):(pattern?<Sleepattern profile={profiles}/>:
                            <Line 
                                data={{
                                    labels: getLabels(),
                                    datasets: [
                                        {
                                            label: 'Temperature Analysis',
                                            data: getValues(),
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(255, 159, 64, 0.2)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)'
                                            ],
                                            borderWidth: 2,
                                        },
                                    ],
                                }}
                                height={30}
                                width={100}
                                options={{
                                    maintainAspectRatio: true,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                              display: true,
                                              text: 'Temperature(\u00B0C)'
                                            }
                                        },
                                        x: {
                                            title: {
                                              display: true,
                                              text: 'Time(24 Hrs)'
                                            }
                                        },
                                    }
                                }}
                            />)
                             } 
                        </div>
                        <div>
                        {profiles.allreading===undefined?(<div></div>):(log?<Logs label={getLabels()} value={getValues()}/>:(<div></div>))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Viewprofile;
