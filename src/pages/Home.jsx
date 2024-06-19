import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
        checkbox: false,
    })
    const [errors, setErrors] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
        checkbox: "",
    })
    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.name === "checkbox" ? e.target.checked : e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let errors = {}
        if (!data.name || data.name.trim() === "") {
            errors.name = "Name is required"
        }
        if (!data.username || data.username.trim() === "") {
            errors.username = "Username is required"
        }
        if (!data.email || data.email.trim() === "") {
            errors.email = "Email is required"
        }
        if (!data.mobile || data.mobile.trim() === "") {
            errors.mobile = "Mobile is required"
        }
        if (!data.checkbox) {
            errors.checkbox = "Checkbox is required"
        }
        setErrors(errors)
        if (Object.keys(errors).length > 0) return
        else {
            alert("Form submitted successfully")
            localStorage.setItem("userData", JSON.stringify(data))
            setData({
                name: "",
                username: "",
                email: "",
                mobile: "",
                checkbox: false,
            })
            navigate("/selection")

        }
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "20px",
                    width: "40vw",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}>
                <input type="text" name="name" placeholder="name" value={data.name} onChange={handleInput} />
                <span style={{ color: "red" }}>{errors.name}</span>
                <input type="text" name="username" placeholder="username" value={data.username} onChange={handleInput} />
                <span style={{ color: "red" }}>{errors.username}</span>
                <input type="email" placeholder="email" value={data.email} name="email" onChange={handleInput} />
                <span style={{ color: "red" }}>{errors.email}</span>
                <input type="tel" placeholder="mobile" value={data.mobile} name="mobile" onChange={handleInput} />
                <span style={{ color: "red" }}>{errors.mobile}</span>
                <div>
                    <input type="checkbox" id="checkbox" checked={data.checkbox} name="checkbox" onChange={handleInput} />
                    <label htmlFor="checkbox">Share my registration data with Superapp</label>
                </div>
                <span style={{ color: "red" }}>{errors.checkbox}</span>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}