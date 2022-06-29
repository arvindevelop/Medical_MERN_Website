import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from '../Sidebar';
import { Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ViewTemp from './ViewTemp';


const Viewprofile = () => {

    // const [days,setDays] = useState(10);
    // let name,val;
    // const handleInputs = (e) =>{
    //     name = e.target.name;
    //     val = e.target.value;

    //     setDays({...days,[name]:val});
    // }

    const data = [
          ['1',12],
          ['2',14],
          ['3',21],
          ['4',21],
          ['5',26],
          ['6',26],
          ['7',27],
          ['8',31],
          ['9',29],
          ['10',31],
          ['11',36],
          ['12',41],
          ['13',42],
          ['14',48],
          ['15',50],
        ];
    const label = data.map((ele) => ele[0]);
    const value =  data.map((ele) => ele[1]);

    const monthDay = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();

    //let prevDate = date - days + 1;
    let prevDate = date - 15 + 1;
    let prevMonth = month;
    if(prevDate <= 0)
    {
        prevMonth = month-1;
        prevDate = monthDay[prevMonth] - (-1*prevDate);
    }

    let currFullDate = date.toString() + '.' + month.toString() + '.' + year.toString();
    let prevFullDate = prevDate.toString() + '.' + prevMonth.toString() + '.' + year.toString();

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
                                {/* <div style={{display:"inline-block"}}>
                                    {/* <select name="days" id="days" value={days} onChange={handleInputs}> */}
                                    {/* <select name="days" id="days">
                                            <option value="10">10 days</option>
                                            <option value="15">15 days</option>
                                            <option value="20">20 days</option>
                                            <option value="50">30 days</option>
                                    </select> */}
                                {/* </div> */}
                                <div style={{display:"inline-block"}}><strong><p>15 Days Report</p></strong></div>
                                <div style={{display:"inline-block"}}><strong><p>{prevFullDate} - {currFullDate}</p></strong></div>
                            </div>
                            <Line 
                                data={{
                                    // labels: ['1990','1991','1993','1994','1996','1998','2000','2002','2004','2006','2008','20010','2012','2014','2016','2018'],
                                    labels: label,
                                    datasets: [
                                        {
                                            label: 'Temperature Analysis',
                                            // data: [12, 14, 21, 21, 26, 26, 27, 31, 29, 31, 36, 41, 42, 48, 50, 57],
                                            data: value,
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
                                              text: 'DAY'
                                            }
                                        },
                                    }
                                }}
                            />
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
