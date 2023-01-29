import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const usenavigate = useNavigate();
    const [customerlist, listupdate] = useState(null);
    const [displayusername, displayusernameupdate] = useState('');
    useEffect(() => {

        const interval1 = setInterval(() => {
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }

            let jwttoken = sessionStorage.getItem('jwttoken');
            fetch("http://localhost:8090/api/airquality", {
                headers: {
                    'Authorization': 'bearer ' + jwttoken
                }
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                const lastTenData = resp.slice(-10);
                listupdate(lastTenData);
                // listupdate(resp);
            })
                .catch((err) => {
                    console.log(err.messsage)
                });
        }, 5000);
        return () => clearInterval(interval1);
    }, []);

    return (
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                <span style={{ marginLeft: '80%' }}>Welcome <b>{displayusername}</b></span>
                <Link style={{ float: 'right' }} to={'/login'}>Logout</Link>
            </div>
            <h1 className="text-center">Air Quality Index CTS</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Floor no</td>
                        <td>AirQuality</td>
                        {/* <td>Category</td> */}
                        <td>Date & Time</td>
                    </tr>
                </thead>
                <tbody>
                    {customerlist &&
                        customerlist.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.floor}</td>
                                <td className={item.airqualityindex > 400 ? "red" : "green"}> {item.airqualityindex}</td>
                                {/* <td>{item.category}</td> */}
                                <td>{item.createdAt}</td>
                            </tr>

                        ))
                    }
                </tbody>

            </table>
        </div>
    );
}

export default Home;