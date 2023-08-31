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
 * -- takes you to /dashboard page for date of this res.
 * 
 * Cancel button:
 * - need click handler
 * -- takes you to previous page. history?
 */

import React, { useState } from "react"
import { useHistory } from "react-router-dom"


console.log("current value of name:", name)
function NewReservation() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [reservationDate, setReservationDate] = useState("")
    const [reservationTime, setReservationTime] = useState("")
    const [people, setPeople] = useState("")

    const handleChange = (event) => {
        
    }

    return (
        <>
            <h2>New Reservation</h2>
            <form>
                <label htmlFor="first_name">First name:</label>
                <input className="ml-2 mt-2" type="text" id="first_name" name="first_name" required />
                <br />
                <label htmlFor="last_name">Last name:</label>
                <input className="ml-2 mt-2" type="text" id="last_name" name="last_name" required />
                <br />
                <label htmlFor="mobile_number">Mobile number:</label>

            </form>
        </>
    )
}


export default NewReservation