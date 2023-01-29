import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import { PostContext } from './App';
import { useContext } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';

// const SensorDataForm = ({changeData}) => {
    // const postSensorData = async (item) => {
    //     try {
    //         changeData(item);
    //         const response = await axios.post(
    //             "http://localhost:8090/api/airquality",
    //             item
    //             );
    //             return response.item;
    //     }
    //     catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // };
    // const SensorDataForm = ({ post, setPost }) => {

    // const postSensorData = async (item) => {
    //     try {
    //         const response = await axios.post("http://localhost:8090/api/airquality", item);
    //         setPost([...post, response.data]);
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // };
    const SensorDataForm = () => {
        const { post, setPost } = useContext(PostContext);
      
        const postSensorData = async (item) => {
          try {
              const response = await axios.post("http://localhost:8090/api/airquality", item);
              setPost([...post, response.data]);
          } catch (error) {
              console.error(error);
              throw error;
          }
        };

    let categoryOptions = ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Hazardous"];
    // const chooseCategory = ((airqualityindex) => {
    //     if(airqualityindex < 50){
    //         return categoryOptions[0];
    //     }
    //     else if(airqualityindex < 100){
    //         return categoryOptions[1];
    //     }
    //     else if(airqualityindex < 150){
    //         return categoryOptions[2];
    //     }
    //     else if(airqualityindex < 250){
    //         return categoryOptions[3];
    //     }
    //     else if(airqualityindex < 350){
    //         return categoryOptions[4];
    //     }
    //     else {
    //         return categoryOptions[5];
    //     }
    // })

    // const diffToast = () => {
    //     toast("AQI is too high!", {
    //         position: "top-right"
    //     });
    // }

    const handleAddAll = useCallback(() => {
        const item = {
            createdData: new Date().toISOString(),
            floor: 1 + Math.floor(Math.random() * 3),
            airqualityindex: 30 + Math.floor(Math.random() * 450),
        
        };

        // render(handleAddAll); {
        //     return this.item.airqualityindex > 400 ? {diffToast} : <div></div>;
        // }
        
        
        
        // item.category = chooseCategory(item.airqualityindex);
        // const chooseCategory = ((airqualityindex) => {
        //     if(airqualityindex < 50){
        //         return categoryOptions[0];
        //     }
        //     else if(airqualityindex < 100){
        //         return categoryOptions[1];
        //     }
        //     else if(airqualityindex < 150){
        //         return categoryOptions[2];
        //     }
        //     else if(airqualityindex < 250){
        //         return categoryOptions[3];
        //     }
        //     else if(airqualityindex < 350){
        //         return categoryOptions[4];
        //     }
        //     else {
        //         return categoryOptions[5];
        //     }
        // })
        
        postSensorData(item)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [postSensorData]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleAddAll();
        }, 5000);
        return () => clearInterval(interval);
    }, [handleAddAll]);

    // return (
    //     <div className='center-btn'>
    //             <p style = {{color: "red",font: "strong", width: "500px"}}><em>Red colour: Above Thresold </em></p>
    //             <p style = {{color: "green",font: "strong", textAlign: "right"}}><em>Green colour: Within Thresold </em></p>
    //         {/* <ToastContainer /> */}
    //     </div>
        
    // );
    return (
        <div className='center-btn'>
            <p style = {{color: "red", font: "strong", float: "left", fontSize: 25}}><em>Red colour: Above Thresold </em></p>
            <p style = {{color: "green", font: "strong", float: "right", fontSize: 25}}><em>Green colour: Within Thresold </em></p>
        </div>
    );
    
};

export default SensorDataForm;