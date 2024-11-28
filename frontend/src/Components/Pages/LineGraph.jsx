import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {fetchallusers} from "../Services/UserServices"
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler,} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineGraph = () => {
  const [users, setuser] = useState()
  const getusers = async()=>{
    try {
        const data = await fetchallusers()
        setuser(data)
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      getusers()
    },[])

  const userData = [1,2,3,4,5,6,7,8,9,10,11,12];
  const canvasData = {
    labels:[
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Users",
        borderColor: "grey",
        pointRadius: 2,
        fill: true,
        backgroundColor: "rgba(0, 0, 128, 0.1)",
        lineTension: 0.4,
        data: userData,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "black",
          font: {
            family: "Nunito",
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        border: {
          display: false,
        },
        min: 0,
        max: 50,
        ticks: {
          stepSize: 5,
          color: "black",
          font: {
            family: "Nunito",
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: "Monthly User Growth",
        font: {
          size: 15,
          family: "Nunito",
        },
      },
    },
  };

  const graphStyle = {
    minHeight: "30rem",
    borderRadius: "0.375rem",
    padding: "0.5rem",
  };

  return (
    <div className="col-md-12" style={graphStyle}>
      <Line id="userGraph" options={options} data={canvasData} />
    </div>
  );
};

export default LineGraph;
