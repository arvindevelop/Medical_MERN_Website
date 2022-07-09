import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const  Sleepattern = ({profile}) => {

    const [days, setDays] = useState(15)

    const handleInputs = (e) =>{
        setDays(e.target.value);
        getLabels();
        getValues();
    }

    function getLabels(day){
        var len = profile.allreading.length;
        var data = [];
        var totalData = len - day;
        for(let i=totalData;i<len;i++)
        {
            data.push(new Date(profile.allreading[i].timestamp).getDate());
        }
        return data;
    }
    
    function getValues(day){
        var len = profile.allreading.length;
        var data = [];
        var totalData = len - day;
        for(let i=totalData;i<len;i++)
        {
            /*---------Here we have to take min temperature for each day--------*/
            data.push(profile.allreading[i].temperature);
        }
        return data;
    }

    const monthDay = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
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
           
                        <div>
                            <div className="d-flex justify-content-between" style={{padding:"1em"}}>
                            <div style={{display:"inline-block"}}>
                                    <select name="days" id="days" value={days} onChange={handleInputs}>
                                            <option value="10">10 days</option>
                                            <option value="15">15 days</option>
                                            <option value="20">20 days</option>
                                    </select>
                                </div>
                                <div style={{display:"inline-block"}}><strong><p>{prevFullDate} - {currFullDate}</p></strong></div>
                            </div>
                            {profile.allreading===undefined?(<div></div>):
                            <Line 
                                data={{
                                    labels: getLabels(days),
                                    datasets: [
                                        {
                                            label: 'Temperature Analysis',
                                            data: getValues(days),
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
                                              text: 'Days'
                                            }
                                        },
                                    }
                                }}
                            />
                             } 
                        </div>
                   
        </>
    )
}

export default Sleepattern;
