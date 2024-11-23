import React, { useState, useEffect } from "react";
import { findGame, findGameImagesByGame, findUser } from "./middleware";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./GamePage.css"


function GamePage() {
    const [game, setGame] = useState([]);
    const [seller, setSeller] = useState("");
    const [gameImages, setGameImages] = useState([]);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true; // Flag to track if the component is mounted

        const loadGame = async () => {
            try {
                const gameData = await findGame(id);
                if (isMounted && gameData) {
                    setGame(gameData);
                    const user = await findUser(gameData.seller);
                    if (user) {
                        setSeller(user);
                    }
                    const TheGameImages = await findGameImagesByGame(id)
                    if (TheGameImages) {
                        setGameImages(TheGameImages)
                        console.log(gameImages)
                    }    
                }
            } catch (error) {
                console.error("Failed to fetch game:", error);
            }
        };

        loadGame();

        // Cleanup function to set the flag to false when the component unmounts
        return () => {
            isMounted = false;
        };
    }, []);
    
    const scroll = (event) => {
        if (event.target.id === "Left") {
            if (!(index === 0)) {
                setIndex(index-1)
            }
            else {
                setIndex(gameImages.length - 1)
            }

        } else if (event.target.id === "Right") {
            if (!(index === gameImages.length - 1)) {
                setIndex(index+1)
            }
            else {
                setIndex(0)
            }

        }

    }

    const navigateToProfile = async () => {
           
    }

    return (
        <>
            <div className="GamePage">
                {
                    game ? <div className="View">
                                <p>{game.name}</p>
                                <p>{game.date}</p>
                                <p>${game.price}</p>
                                <div className="Seller">
                                    <p>{seller.name}</p>
                                    <div className="SellerPicContainer">
                                        <img className="SellerPic" onClick={() => (navigate(`/Profile/${seller._id}`))} src={`http://localhost:3001${seller.image}`} alt="profile picture" />
                                    </div>
                                </div>
                                <div className="GameImages">
                                    {
                                        (gameImages && gameImages.length > 0) ?
                                        <div className="GameGrid">
                                            <img id="Left" className="Left" onClick={(e) => (scroll(e))} src={"/static/ArrowLeft.png"}/>
                                            <div className="ImageDiv">
                                                <img className="Image" src={`http://localhost:3001${gameImages[index].image || "/placeholder.png"}`}/>
                                            </div>
                                            <img id="Right" className="Right" onClick={(e) => (scroll(e))} src={"/static/ArrowRight.png"}/>
                                        </div> : <p>loading</p>
                                    }
                                </div>
                                    
                                <p>{game.description}</p> 
                            </div> 
                        :
                        <div>
                                <p>loading...</p>
                        </div>
                }
            </div> 
        </>
    );
}

export default GamePage;
