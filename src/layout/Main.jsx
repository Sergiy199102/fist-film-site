import Navigation from "../Components/Navigation/Navigation";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Footer from '../Components/Footer/Footer'
import { Box } from "@mui/material";
import BackBanner from '../Img/2.jpg';
function Main() {
    return (
        <div className="App" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            
             }} >
        <Navigation sx={{backgroundColor: "#4a4e69",}}/>
        <Grid container sx={{  
            minHeight: '100vh',
            background: `url(${BackBanner}) center/cover no-repeat`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat", }} >
            <Outlet />
        </Grid>
        <Footer style={{backgroundColor: "#4a4e69",}}/>
        </div>
    );
}

export default Main;

