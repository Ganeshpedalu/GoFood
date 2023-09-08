import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'



export default function Home() {
    const [search, setsearch] = useState("");
    const [foodItem, setfoodItem] = useState([]);
    const [foodCat, setfoodCat] = useState([]);

    const dataload = async () => {
        let response = await fetch("http://localhost:5000/api/fooddata", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json();
        setfoodItem(response[0]);
        setfoodCat(response[1]);
    };

    useEffect(() => {
        dataload();
    }, []);

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !impotant" }}>

                    <div className="carousel-inner " id='carousel'>
                        <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e => setsearch(e.target.value))} />
                                {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active" >
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>

                {
                    foodCat !== [] ? foodCat.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {
                                    foodItem.length !== 0 ? (
                                        foodItem
                                            .filter(
                                                (item) =>
                                                    item.CategoryName === data.CategoryName &&
                                                    item.name.toLowerCase().includes(search.toLowerCase())
                                            )
                                            .map((filterItem) => (
                                                <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card
                                                        foodItem={filterItem}
                                                        options={filterItem.options[0]}
                                                        
                                                    />
                                                </div>
                                            ))
                                    ) : (
                                        <div>No such element found</div>
                                    )
                                }
                                
                            </div>


                        )


                    }) : <div> </div>
                }

            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}