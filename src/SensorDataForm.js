import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

const SensorDataForm = ({changeData}) => {
    const postSensorData = async (data) => {
        try {
            changeData(data);
            const response = await axios.post(
                "http://localhost:8090/api/airquality",
                data
                );
                return response.data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };

    let categoryOptions = ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Hazardous"];

    const handleAddAll = useCallback(() => {
        const data = {
            createdData: new Date().toISOString(),
            floor: 1 + Math.floor(Math.random() * 3),
            airqualityindex: Math.floor(Math.random() * 450),
            category: Math.floor(Math.random * this.categoryOptions.length)
        };
        postSensorData(data)
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

    return (
        <div className='center-btn'>
            <button type='button' className="hover-btn" onClick={handleAddAll}>
                Click To Check Latest Index
            </button>
        </div>
    );
};

export default SensorDataForm;