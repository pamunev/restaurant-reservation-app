/**
 * Here I will make a form. 
 * -- useState
 * -- change handler
 * -- submit handler
 * -- cancel handler?
 * -- useEffect?
 * 
 * Submit button:
 * - need submit handler
 * -- saves new res, 
 * ---- How do I save this into the database?
 * -- takes you to /dashboard page for date of this res.
 * 
 * Cancel button:
 * - need click handler
 * -- takes you to previous page. history?
 */

import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const axios = require("axios")




function NewReservation() {
    const history = useHistory()
    
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `${process.env.REACT_APP_API_BASE_URL}/reservations/new`;
        axios
          .post(url, formData)
          .then((response) => {
            console.log("this was submitted:", response.data)
          })
        history.push(`/dashboard/${formData.reservation_date}`)
        
    }

    console.log("current value of form:", formData)

    return (
        <>
            <h2>New Reservation</h2>
            <form>
                <label htmlFor="first_name">First name:</label>
                <input 
                    className="ml-2 mt-2" 
                    type="text" 
                    id="first_name" 
                    name="first_name" 
                    value={formData.first_name}
                    onChange={handleChange}
                    required 
                />
                <br />
                <label htmlFor="last_name">Last name:</label>
                <input 
                    className="ml-2 mt-2" 
                    type="text" 
                    id="last_name" 
                    name="last_name" 
                    value={formData.last_name}
                    onChange={handleChange}
                    required 
                />
                <br />
                <label htmlFor="mobile_number">Mobile number:</label>
                <input 
                    className="ml-2 mt-2" 
                    type="tel" 
                    id="mobile_number" 
                    name="mobile_number" 
                    value={formData.mobile_number}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    minLength="10"
                    maxLength="10"
                    required 
                />
                <br />
                <label htmlFor="reservation_date">Reservation Date:</label>
                <input 
                    className="ml-2 mt-2" 
                    type="date" 
                    id="reservation_date" 
                    name="reservation_date" 
                    value={formData.reservation_date}
                    onChange={handleChange}
                    required 
                />
                <br />
                <label htmlFor="reservation_time">Reservation Time:</label>
                <input 
                    className="ml-2 mt-2" 
                    type="time" 
                    id="reservation_time" 
                    name="reservation_time" 
                    value={formData.reservation_time}
                    onChange={handleChange}
                    required 
                />
                <br />
                <label htmlFor="people">Number of people in party:</label>
                <input 
                    className="ml-2 mt-2" 
                    type="number" 
                    id="people" 
                    name="people" 
                    value={formData.people}
                    onChange={handleChange}
                    required 
                    min="1"
                />
                <button onClick={handleSubmit}>Submit</button>


            </form>
        </>
    )
}


export default NewReservation