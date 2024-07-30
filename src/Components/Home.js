import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Pagination from './Pagination'

const Home = () => {


    // Create Diffrent type states
    const [GetAllData, setAllData] = useState({ loading: true, data: [] })
    const [sortCountry, setSortCountry] = useState('')
    const [sortGender, setSortGenter] = useState('')
    const [isAscending, setIsAscending] = useState(true);
    const [IdUpDownArrow, setIdUpDownArrow] = useState(false)
    const [FullNameUpDownArrow, setFullNameUpDownArrow] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    // Get All the Data from Given API
    const getAllData = async () => {

        //use Axios to get the data from the API
        await axios.get('https://dummyjson.com/users')
            .then((response) => {
                if (response.status) {
                    // made filter for the gender and country
                    const filteredData = response.data.users.filter((item) => {
                        const filterGender = sortGender === "" || item.gender.toLowerCase() === sortGender.toLowerCase();
                        const filterCountry = sortCountry === "" || item.address.country.toLowerCase() === sortCountry.toLowerCase();
                        return filterGender && filterCountry;
                    });

                    // Store the data in the state
                    setAllData({
                        loading: false,
                        data: sortCountry !== "" || sortGender !== "" ? filteredData : response.data.users
                    });
                }

                // If status is not true then set the state empty
                else {
                    setAllData({
                        loading: false,
                        data: []
                    })
                }
            })

            // Handle the error
            .catch((error) => {
                console.log(error)
            })
    }

    //Use UseEffect to call the getAllData function when the page refreshes or change the filter

    useEffect(() => {
        getAllData()
    }, [sortGender, sortCountry]) // set the dependency array to call the function when the filter changes




    // Sort the Username in Ascending or Descending Order
    const sortUserName = (type) => {
        const sortedUsers = [...GetAllData.data].sort((a, b) => {
            if (isAscending) {
                return a.firstName.localeCompare(b.firstName)
            } else {
                return b.firstName.localeCompare(a.firstName);
            }
        });
        setAllData({
            loading: false,
            data: sortedUsers
        });
        setIsAscending(!isAscending);
        setFullNameUpDownArrow(!FullNameUpDownArrow)
    };


    // Sort the User ID in Ascending or Descending Order
    const SortUserByID = () => {
        const sortedUsers = [...GetAllData.data].sort((a, b) => {
            if (isAscending) {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        });

        setAllData({
            loading: false,
            data: sortedUsers
        });
        setIsAscending(!isAscending);
        setIdUpDownArrow(!IdUpDownArrow);
    };

    // Create Pagination
    const indexOfLastRecord = currentPage * recordsPerPage; // get the index of Last Record
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // get the index of First Record
    const currentRecords = GetAllData.data.slice(indexOfFirstRecord, indexOfLastRecord); // get the current records
    const NumberofPage = Math.ceil(GetAllData.data.length / recordsPerPage)  // get the number of pages

    return (
        <div className='m-4 mt-5 border rounded' style={{ 'height': 'auto' }}>

            {/* Header of the table */}
            <div className='d-flex  align-items-center justify-content-between p-2'>
                <h4>Employees</h4>
                <div className='d-flex align-items-center gap-3'>

                    <Filter size={50} color="black" />
                    {/* Country Filter */}
                    <select onChange={(e) => setSortCountry(e.target.value)} value={sortCountry} className="form-select" aria-label="Default select example" >
                        <option value="">Country</option>
                        <option value="United States">United States</option>
                        <option value="India">India</option>
                        <option value="Canada">Canada</option>
                    </select>

                    {/* Gender Filter */}
                    <select onChange={(e) => setSortGenter(e.target.value)} value={sortGender} className="form-select" aria-label="Default select example" >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                </div>
            </div>

            {/* Table */}
            <div className='m-3 border rounded'>
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={SortUserByID}> ID
                                <i className={`bi ${IdUpDownArrow ? 'bi-arrow-down-short' : 'bi-arrow-up-short'}`}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </th>
                            <th>Image</th>
                            <th onClick={sortUserName}>Full Name
                                <i className={`bi ${FullNameUpDownArrow ? 'bi-arrow-down-short' : 'bi-arrow-up-short'}`} style={{ cursor: 'pointer' }}></i></th>
                            <th >Demography</th>
                            <th >Designation</th>
                            <th >Location</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            GetAllData.loading == false && currentRecords.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td><img src={item.image} style={{borderRadius:'50%'}} alt="profile" width="50px" height="50px" /></td>
                                        <td>{item.firstName + " "+ item.maidenName + " " + item.lastName}</td>
                                        <td>{`${item.gender == 'female' ? 'F' : 'M'}/${item.age}`}</td>
                                        <td>{item.company.title}</td>
                                        <td>{item.address.state} , {item.address.country}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {/* Pagination */}
                <div className='d-flex justify-content-end mr-4'>
                    <Pagination
                        NumberofPage={NumberofPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

            </div>

        </div>
    );
}

export default Home;
