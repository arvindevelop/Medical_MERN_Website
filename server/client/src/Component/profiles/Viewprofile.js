import React,{useState,useEffect} from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from '../Sidebar';
import { Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ViewTemp from './ViewTemp';


const Viewprofile = () => {

    const {name,email} = useLocation().state;
    const [profiles, setProfiles] = useState([])
    const [days, setDays] = useState(15)
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])

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
        setDays(e.target.value);
        getLabels();
        getValues();
    }

    function getLabels(){
        var len = profiles.allreading.length;
        console.log(days)
        var totalData = len - days;
        var data = [];
        for(let i=totalData;i<len;i++)
        {
            data.push(new Date(profiles.allreading[i].timestamp).getDate());
        }
        setLabels(data);
    }
    function getValues(){
        var len = profiles.allreading.length;
        var totalData = len - days;
        var data = [];
        for(let i=totalData;i<len;i++)
        {
            data.push(profiles.allreading[i].temperature);
        }
        setValues(data);
    }
    const monthDay = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();

    let prevDate = date - days + 1;
    let prevMonth = month;
    if(prevDate <= 0)
    {
        prevMonth = month-1;
        prevDate = monthDay[prevMonth] - (-1*prevDate) - 1;
    }

    let currFullDate = date.toString().padStart(2,"0") + '.' + month.toString().padStart(2,"0") + '.' + year.toString();
    let prevFullDate = prevDate.toString().padStart(2,"0") + '.' + prevMonth.toString().padStart(2,"0") + '.' + year.toString();

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    <div className="col py-3">
                        <div className="d-flex gap-2 col-5">
                            <button type="button" class="btn btn-primary">Charts & Logs</button>
                            <button type="button" class="btn btn-primary">Sleep Pattern</button>
                            <button type="button" class="btn btn-primary">Therapy & Suggestions</button>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between" style={{padding:"1em"}}>
                                <div style={{display:"inline-block"}}>
                                    <select name="days" id="days" value={days} onChange={handleInputs}>
                                            <option value="10">10 days</option>
                                            <option value="15">15 days</option>
                                            <option value="20">20 days</option>
                                    </select>
                                </div>
                                {/* <div style={{display:"inline-block"}}><strong><p>15 Days Report</p></strong></div> */}
                                <div style={{display:"inline-block"}}><strong><p>{prevFullDate} - {currFullDate}</p></strong></div>
                            </div>
                            {profiles.allreading===undefined?(<div></div>):
                            <Line 
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: 'Temperature Analysis',
                                            data: values,
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
                                              text: 'Temperature'
                                            }
                                        },
                                        x: {
                                            title: {
                                              display: true,
                                              text: 'Time'
                                            }
                                        },
                                    }
                                }}
                            /> 
                             } 
                        </div>
                        <div>
                        <ViewTemp/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Viewprofile;
