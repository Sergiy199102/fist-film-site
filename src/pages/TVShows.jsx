import React from "react";
import Grid from "@mui/material/Grid";
import SingleCard from '../Components/SingleCard/Singlecard'
import usePopular from '../hooks/usePopular'
import { DEFAULT_IMAGE } from '../Constans/Constans'
import './tvshows.css'
import BackBanner from '../Img/1.png';

function TvShows() {
  const { popularData } = usePopular();

  return (
    <>
      <div
      style={{
        color: 'red',
        background: `url(${BackBanner})center/cover no-repeat`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
      }}
      >
        <h1
        className="popular_show_text"
        style={{ textAlign: 'center',
        margin: '0',
        textTransform: 'uppercase'
        }}
        >Most Popular Movies</h1>
      
      <Grid container pt={2} spacing={4}
        sx={{ display: "flex", justifyContent: "center", }}
      >
            {popularData.map(({ name, image, id, premiered }) => (
              <SingleCard
                key={id}
                id={id}
                name={name}
                premiered={premiered}
                image={image ? image.original || DEFAULT_IMAGE : DEFAULT_IMAGE}
              />
              ))}
              </Grid> 
              </div>
     
      </>
  );
}

export default TvShows;