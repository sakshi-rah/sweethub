import React, { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from '../../components/Navbar/Navbar'
import FoodItemCard from "./../../components/FoodItemCard/FoodItemCard"
import { loginRequired } from '../../util/loginRequired'
import { currentUser } from './../../util/currentUser'
import "./Menu.css"
import Footer from "../../components/Footer/Footer"


function Menu() {

    const [searchText, setSearchText] = useState("")
    const [currentFoodItems, setCurrentFoodItems] = useState([])

    async function fetchAllItems() {
        console.log("Fetching All Items");
        const response = await axios.get('/allFoodItems')
        console.log(response.data.data);
        setCurrentFoodItems(response.data.data)
    }

    async function fetchSpecificItems() {
        console.log("Fetching Specific Items");
        const response = await axios.get(`/foodItemByTitle?title=${searchText}`)
        console.log(response.data.data);
        setCurrentFoodItems(response.data.data)
    }

    useEffect(() => {
        if (searchText.length > 0) {
            fetchSpecificItems()
        }
        else {
            fetchAllItems()
        }
    }, [searchText])

    useEffect(() => {
        loginRequired()
    }, [])

    return (
        <div>

            <Navbar user={currentUser?.name} />

            <p className='menu-card'>Menu Card</p>

            <div className='search-container'>
                <input class="search-input" type="search" placeholder="Search" aria-label="Search"
                    value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
            </div>

            <div className='food-items-result'>
                <div className='row food-items-row'>
                    {
                        currentFoodItems?.map((foodItem, index) => {
                            return (<FoodItemCard category={foodItem.category} description={foodItem.description}
                                imgUrl={foodItem.imgUrl} price={foodItem.price} title={foodItem.title} key={index} />)
                        })
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Menu