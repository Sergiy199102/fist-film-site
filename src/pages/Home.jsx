import useRequest from "../hooks/useRequest";
import SingleCard from "../Components/SingleCard/Singlecard";
import { useDispatch, useSelector } from "react-redux";
import { action, setSearch } from "../Store/SearchSlice";
import { DEFAULT_IMAGE } from "../Constans/Constans";
import BackBanner from '../Img/john-wick-2-guns-jpg.webp';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './home.css'
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import './tvshows.css'
import useReqGenre from "../hooks/useReqGenre";
import { Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import WebFont from 'webfontloader';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const StyledButton = styled(Button)({
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'black',
      color: 'red',
      cursor: 'pointer',
    },
  });

  const HeroImage = styled('img')({
    position: 'absolute',
    top: '0',
    left: '1070px',
    width: '90px',
    height: '90px',

    zIndex: '1', 
  });

    

function Home() {

    const [favorites, setFavorites] = useState([]);
    const [setSelectedFilm] = useState(null);
    const apiSearch = useSelector((state) => state.search.search);
    const searchRef = useRef("");
    const dispatch = useDispatch();
    const apiData = useRequest(apiSearch);
    const addToFavorites = (movie) => {
        setFavorites((prevFavorites) => [...prevFavorites, movie]);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(apiData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = apiData.slice(startIndex, endIndex);
    
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect (() => {
        searchRef.current.focus();
    }, [])
    
    const handleCardClick = (id) => {
        setSelectedFilm(id)
    };
    
    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value));
    }

  const actionFilms = useReqGenre('https://dolphin-app-pc6ii.ondigitalocean.app/article/byGenre/Action');
  const comedyFilms = useReqGenre('https://dolphin-app-pc6ii.ondigitalocean.app/article/byGenre/Comedy');
  const [genres, setGenres] = useState([]);
  const [actionSwiperInitialized, setActionSwiperInitialized] = useState(false);
  const [comedySwiperInitialized, setComedySwiperInitialized] = useState(false);
  const actionSwiperRef = useRef(null);
  const comedySwiperRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const handleButtonClick = (genre) => {
    setGenres(genre);
    setShowAll(false);
  };

  useEffect(() => {
    if (actionSwiperRef.current && actionSwiperRef.current.swiper) {
      const visibleSlides = 8;
      const middleIndex = Math.floor(visibleSlides / 2);
      const initialSlide = Math.max(0, middleIndex);
      actionSwiperRef.current.swiper.slideTo(initialSlide);
      setActionSwiperInitialized(true);
    }
  }, [actionFilms]);

  useEffect(() => {
    if (comedySwiperRef.current && comedySwiperRef.current.swiper) {
      const visibleSlides = 8;
      const middleIndex = Math.floor(visibleSlides / 2);
      const initialSlide = Math.max(0, middleIndex);
      comedySwiperRef.current.swiper.slideTo(initialSlide);
      setComedySwiperInitialized(true);
    }
  }, [comedyFilms]);

        useEffect(() => {
        WebFont.load({
          google: {
            families: ['Abel', 'Roboto', 'Staatliches'], 
          },
        });
      }, []);


        return (
          <>
            <div style={{
                background: `url(${BackBanner}) center/cover no-repeat`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                }} 
            className="main-container"
            >
            <Grid container pt={5}
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}        
            >
            <input type='text' style={{
                color: 'rgba(0, 0, 0, 0.7)',
                backgroundColor: '#fff',
                height: '30px',
                border: 'none',
                marginLeft: '50px',
                textSixe:'100px',
                fontWeight:'bold',
              }}
              value={apiSearch} onChange={handleSearch} ref={searchRef} />
              </Grid>
              {visibleData.length > 0 && (
              <Grid container spacing={2} sx={{ padding: "20px" }} className="film-container">
              {visibleData?.map(({ id, name, image }, index) => (
              <Grid item xs={3} key={index}>
              <SingleCard
              id={id}
              name={name}
              image={image ? image.medium || DEFAULT_IMAGE : DEFAULT_IMAGE}
              onClick={() => handleCardClick(id)}
              onAddToFavorites={() => addToFavorites({ id, name, image })}
              />
              </Grid>
              ))}
              </Grid>
              )}
            
            <Grid container item xs={12} sx={{marginTop: '50px',
        }}>
                    <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, x: -1000 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.5, delay: 1 }}
                    >
                    <Typography 
                    variant="h3"
                    style={{ fontFamily: 'Staatliches' }}
                    className="names_genre"
                    >
                      Action Shows
                      </Typography>
                    </motion.div>
                      <Grid container sx={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <a style={{textDecoration:'none'}} href={`/show/Genre/${genres}`}>
                        <Button onClick={() => handleButtonClick('Action')} variant="text" style={{color: 'lightblue', backgroundColor: 'rgb(87, 85, 85)'}}>
                          Show all
                          </Button>
                        </a>
                        </Grid>
                    <div className="content">
                    <Grid container >
                    <Swiper
                      effect={'coverflow'}
                      loop={true}
                      rewind={true}
                      grabCursor={true}
                      centeredSlides={true}
                      spaceBetween={20}
                      slidesPerView={6}
                      coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                      }}
                      style={{height:'450px', marginRight: '30px', marginLeft: '30px', marginTop:'15px' }}
                      pagination={{clickable: true, bulletClass: 'my-custom-bullet', bulletActiveClass: 'my-custom-bullet-active' }}
                      modules={[EffectCoverflow, Pagination ]}
                      ref={actionSwiperRef}
                      className={`mySwiper ${actionSwiperInitialized  ? 'initialized' : ''}`}
                      >
                        {showAll
                      ? 
                      actionFilms.map((show, index) => (
                      <Grid item xs={3} key={index}>
                        <SwiperSlide className="actionslide">
                        <a href={`/show/${show.id}`}>
                    <img src={show.image.original || DEFAULT_IMAGE} />
                        </a>
                      </SwiperSlide>
                      </Grid>
                        ))
                      : 
                      actionFilms.slice(0, 8).map((show, index) => (
                      <Grid item xs={3} key={index}>
                      <SwiperSlide className="actionslide">
                        <a href={`/show/${show.id}`}>
                        <img src={show.image.original} />
                        </a>
                    </SwiperSlide>
                    </Grid>
                    ))}
                    </Swiper>
                      </Grid> 
              </div>
          </Grid>

          <Grid item xs={12} style={{marginTop: '100px', overflowX: 'hidden' }}>
                    <motion.div
                      initial={{ opacity: 0, x: 1000 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.5, delay: 1.5 }}
                    >
                    <Typography 
                    variant="h3"
                    style={{ fontFamily: 'Staatliches' }}
                    className="names_genre"
                    >
                      Comedy Shows
                      </Typography>
                      </motion.div>
                      <Grid container sx={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <a style={{textDecoration:'none'}} href={`/show/Genre/${genres}`}>
                        <Button onClick={() => handleButtonClick('Comedy')} variant="text" style={{color: 'lightblue', backgroundColor: 'rgb(87, 85, 85)'}}>
                          Show all
                          </Button>
                        </a>
                        </Grid>
                        
                    <div className="content">
                    <Grid container >
                    <Swiper
                      effect={'coverflow'}
                      loop={true}
                      rewind={true}
                      grabCursor={true}
                      centeredSlides={true}
                      spaceBetween={20}
                      slidesPerView={6}
                      coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                      }}
                      style={{height:'450px', marginRight: '30px', marginLeft: '30px', marginTop:'15px' }}
                      speed={1500}
                      pagination={{clickable: true, bulletClass: 'my-custom-bullet', bulletActiveClass: 'my-custom-bullet-active' }}
                      modules={[EffectCoverflow, Pagination ]}
                      ref={comedySwiperRef}
                      className={`mySwiper ${comedySwiperInitialized  ? 'initialized' : ''}`}
                      >
                        {showAll
                      ? 
                      comedyFilms.map((show, index) => (
                      <Grid item xs={3} key={index}>
                        <SwiperSlide className="actionslide">
                        <a href={`/show/${show.id}`}>
                    <img src={show.image.original} />
                        </a>
                      </SwiperSlide>
                      </Grid>
                        ))
                      : 
                      comedyFilms.slice(0, 8).map((show, index) => (
                      <Grid item xs={3} key={index}>
                      <SwiperSlide className="actionslide">
                        <a href={`/show/${show.id}`}>
                        <img src={show.image.original} />
                        </a>
                    </SwiperSlide>
                    </Grid>
                    ))}
                    </Swiper>
                      </Grid> 
              </div>
          </Grid>
            
              {visibleData.length > 0 && (
              <div className="button-container">
                <ButtonGroup>
                <StyledButton type="button" onClick={handleSearch} variant="contained" disableElevation>
    Search
</StyledButton>


                    <Button disabled style={{ margin: '0 10px', backgroundColor: 'rgba(0, 0, 0, 0.2)' ,color: 'white', fontWeight: 'bold', border: '1px solid red', borderRadius: '6px' }}>
                        {`Page ${currentPage} of ${totalPages}`}
                    </Button>
                    <StyledButton onClick={goToNextPage} disabled={currentPage === totalPages} variant="contained" disableElevation>
                    Next
                    </StyledButton>
                </ButtonGroup>
                </div>
                
                )}
              </Grid>
              </div>
              </>
        );
        }
    
    export default Home;