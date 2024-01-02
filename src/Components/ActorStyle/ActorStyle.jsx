import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Modal } from "@mui/material";
import DEFAULT_IMAGE from "../../images/actorlogo.png";
import { useEffect, useState } from "react";
import axios from "axios";

// ... (imports)

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#4A4E69",
  border: "none",
  borderRadius: "3px",
  boxShadow: 24,
  p: 4,
};

export default function ActorStyle({ character = {}, person = {} }) {
  const [open, setOpen] = useState(false);
  const [actorId, setActorId] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setActorId(person.id);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function makeRequest() {
      try {
        if (actorId) {
          setLoading(true);
          const response = await axios.get(`https://dolphin-app-pc6ii.ondigitalocean.app/article/actor/${actorId}`);
          setApiData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    makeRequest();
  }, [actorId]);

  return (
    <>
      <Card sx={{ width: 350, height: 200, bgcolor: "#8d99ae" }}>
        <CardActionArea onClick={handleOpen} sx={{ display: "flex", height: "100%" }}>
          <CardMedia
            component="img"
            image={character?.image?.medium ?? person?.image?.medium ?? DEFAULT_IMAGE}
            alt={`Photo of ${person.name}`}
            sx={{ width: "150px", height: "auto" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div">
              {person.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              As {character.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {/* Display relevant information from apiData */}
                {apiData?.name || "Actor Name"}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/* Display other relevant information from apiData */}
                {apiData?.description || "Actor description"}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
