import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import "./aboutus.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Sticker from "../Img/ap2.svg";
import Sticker_2 from "../Img/ap.png";
import BackBanner from '../Img/bannerbackground.jpg';

const Blog = () => {
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
  });

  const [imgRef, imgInView] = useInView({
    triggerOnce: true,
  });

  const infoAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0%)",
    from: { opacity: 0, transform: "translateY(100%)" },
    config: { duration: 1000 },
  });

  const imgAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0%)",
    from: { opacity: 0, transform: "translateX(100%)" },
    config: { duration: 500 },
  });

  const imgAnimation2 = useSpring({
    opacity: 1,
    transform: "translateX(0%)",
    from: { opacity: 0, transform: "translateX(200%)" },
    config: { duration: 1000 },
  });

  const containerRef = useRef(null);
  const handleAnimationEnd = () => {
    containerRef.current.style.overflow = "auto";
  };
  return (
    <div style={{
      background: `url(${BackBanner}) center/cover no-repeat`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
      margin:'0 0',
      }} 
      ref={containerRef}
      className="main_about_us"
    >
      <animated.div
        ref={infoRef}
        style={infoAnimation}
        className="about_us_info"
        onRest={handleAnimationEnd}
      >
        <h2>Site with the best films and series</h2>
        <p>
        Do you want to relax after a hard day's work and watch a good movie 
        alone or in the company of friends? Then be sure to check out the best 
        world and domestic films that are presented on the project.
        </p>
        <p>
        The best films and series take your breath away from the first second 
        of viewing and take the viewer into the world of adventure, fantasy 
        and action. Everything added is selected according to international 
        ratings, so we provide our visitors with only high-quality and interesting 
        films. The MIXFILM film site is a unique opportunity to plunge into the 
        universe of excellent and exciting masterpieces of cinema.
        </p>
        <p>
        This is where you will find only the popular and best ad-free movies 
        online belonging to a variety of genres. And for kids, on the site 
        you can find good and beautiful cartoons. To enjoy your favorite 
        TV series or famous movie, you just need to go to our movie site 
        and use a convenient filter to find the desired video. If you have 
        not decided which movie to watch at your leisure, look at the "Popular" 
        sections and choose the right one of you.
        </p>
        <p>
        Do you dream of watching the best movies and series in high quality and 
        without registration? Then try to experience unforgettable emotions with us.
        </p>
        <h3>Happy viewing!</h3>
        <p>
          Sergiy VALYANIN
        </p>
        <div className="about_us_icons">
          <a href="https://www.instagram.com/sergiy_valyanin/" target="_blank">
            <InstagramIcon sx={{ fontSize: "2rem" }} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100022643443649" target="_blank">
            <FacebookIcon sx={{ fontSize: "2rem" }} />
          </a>
        </div>
      </animated.div>

    </div>
  );
};

export default Blog;