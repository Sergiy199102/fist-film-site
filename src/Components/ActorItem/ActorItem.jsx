import React, { useState, useEffect } from "react";
import useReqActor from "../../hooks/useReqActor";
import { CardContent, CardMedia, Typography, Container, Grid } from "@mui/material";
import './actoritem.css';
import { DEFAULT_ACTOR_IMAGE } from "../../Constans/Constans";
import ActorModal from "./ActorModal";
import WebFont from 'webfontloader';
import { BlinkingCard, ButtonEffectRight, ButtonEffectLeft } from './styledActor'

function getCharacterNames(selectedActor, actorData) {
  const duplicateActors = actorData.filter(
    (a) => a.person.id === selectedActor.person.id && a.character.name !== selectedActor.character.name
  );

  const names = [selectedActor.character.name, ...duplicateActors.map((a) => a.character.name)];
  return names.join(', ');
}

function ActorItem() {
    const { actorData } = useReqActor();
    const [offset, setOffset] = useState(0);
    const [isPrevButtonVisible, setIsPrevButtonVisible] = useState(false);
    const [selectedActor, setSelectedActor] = useState(null);
    const renderedActorIds = [];

    useEffect(() => {
      setIsPrevButtonVisible(offset > 0);
    }, [actorData, offset]);

    const handleMoveLeft = () => {
        setOffset((prevOffset) => {
          const newOffset = prevOffset - 1;
          setIsPrevButtonVisible(newOffset > 0);
          return newOffset;
        });
      };
    
      const handleMoveRight = () => {
        setOffset((prevOffset) => {
          const newOffset = prevOffset + 1;
          setIsPrevButtonVisible(newOffset > 0);
          return newOffset;
        });
      };

      const handleCardClick  = (actor) => {
        setSelectedActor(actor);
      };
    
      const handleCloseModal = () => {
        setSelectedActor(null);
      };

      useEffect(() => {
        WebFont.load({
          google: {
            families: ['Abel', 'Roboto', 'Staatliches'], 
          },
        });
      }, []);

      const actorCards = actorData.map((actor) => {
        if (renderedActorIds.includes(actor.person.id)) {
          return null;
        }
    
        renderedActorIds.push(actor.person.id);
    
        const duplicateActors = actorData.filter(
          (a) => a.person.id === actor.person.id && a.character.name !== actor.character.name
        );
    
        const characterNames = [actor.character.name, ...duplicateActors.map((a) => a.character.name)].join(', ');
    
        return (

          <Grid item xs={6} key={actor.person.id}>
            <BlinkingCard
              sx={{
                transform: `translateX(-${offset * 100}%)`,
              }}
              onClick={() => handleCardClick(actor)}
            >
              <CardContent
                style={{
                  background: '#222527',
                  padding: "0.1rem",
                  width: "100%",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  border: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "none",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={actor.person.image ? actor.person.image.medium || DEFAULT_ACTOR_IMAGE : DEFAULT_ACTOR_IMAGE}
                    alt={actor.person.name}
                    style={{
                      width: "50%",
                      border: "none",
                    }}
                  />
                  <div
                    style={{
                      marginLeft: "1rem",
                      textAlign: "left",
                      border: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ color: "rgb(251, 251, 251)", border: "none",  whiteSpace: "nowrap", marginTop: '-20px', fontFamily: 'Staatliches', fontSize: '24px' }}
                    >
                      {actor.person.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ border: "none", color: '#FF0C00' }}
                    >
                      {actor.person.birthday}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ color: "rgb(249, 249, 249)", border: "none", marginTop: "10px" }}
                    >
                      As: {characterNames}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </BlinkingCard>
          </Grid>
        );
      });
    
      return (
        <>
        {actorData.length > 0 && (
        <div style={{ backgroundColor:'rgb(0, 0, 0, 0.7)',width: "100%", height: '150px' }}><span style={{ fontFamily: 'Staatliches' }} className="Txt_Starring">
            Starring
          </span>
          
          <Container
            style={{
              overflow: "hidden",
              marginTop: '4rem',
              paddingBottom: '20px',
              margin: 'auto',
              paddingTop: '50px',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                overflow: 'hidden',
                position: 'absolute',
                width: '1880px',
                left: '0',
                right: '0',
                marginLeft: '5px',
              }}
            >
              {actorCards}
            </Grid>
          </Container>
          {selectedActor && (
            <ActorModal
              actor={selectedActor}
              characterNames={getCharacterNames(selectedActor, actorData)}
              open={Boolean(selectedActor)}
              onClose={handleCloseModal}
            />
          )}
          {actorData.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15rem",
            }}
          >
            <ButtonEffectLeft
              onClick={handleMoveLeft}
              disabled={offset === 0}
              style={{
                display: isPrevButtonVisible ? "flex" : "none",
                width: '200px',
                color: "red",
                fontWeight: "bold",
                backgroundColor: "#141414",
                height: "50px",
                marginRight: "20px",
                marginLeft: offset === 0 ? "auto" : "",
              }}
            >
              <span style={{ position: 'relative', zIndex: '1' }}>{isPrevButtonVisible && "Prev"}</span>
            </ButtonEffectLeft>
            <ButtonEffectRight
              onClick={handleMoveRight}
              disabled={offset >= actorData.length - 3}
              style={{
                color: "red",
                width: '200px',
                fontWeight: "bold",
                backgroundColor: "#141414",
                height: "50px",
                transition: 'all 0.5s',
                boxShadow: '0 5px 15px rgba(0,0,0,0.20)',
                display: 'block'
              }}
            >
              <span style={{ position: 'relative', zIndex: '1' }}>Next</span>
            </ButtonEffectRight>
          </div>  
          )}
        </div>
        )}
        </>
      );
  }
    
export default ActorItem;