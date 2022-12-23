import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, List, ListItem, Stack, Typography, Popover, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, LinearProgress, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import { Ship } from '../common/interfaces/ship.interface';
import InfiniteScroll from "react-infinite-scroll-component";
 
interface ShipsProps {
  ships: Ship[]
}
 
const Shipslistview: React.FC<ShipsProps> = ({ ships }: ShipsProps) => {
   
  const [open, setOpen] = React.useState(false);
  const [scrollData, setScrollData] = React.useState(ships);
  console.log("**********",ships);
  console.log(scrollData);
const [hasMoreValue, setHasMoreValue] = React.useState(true);
let shipType:String;



// useEffect(() => {
//   setScrollData(ships.slice(0, 8));
//   console.log("in use effect",scrollData);
// }, []);
useEffect(() => {
  setScrollData(ships.slice(0, 8));
  console.log("in use effect of ship",scrollData);
}, [ships]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnRowsScrollEnd = () => {
    console.log("indis end scroll fn");
    if (scrollData.length < ships.length) {
      console.log("in if cond");
      setHasMoreValue(true);
      loadScrollData();
    } else {
      setHasMoreValue(false);
    }
  };

  const loadScrollData = async () => {
    try {
      console.log("loading data to scroll");
      setScrollData(ships.slice(0, scrollData.length + 8));
      console.log("scroll new data",scrollData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
       <InfiniteScroll
            dataLength={scrollData.length}
            next={handleOnRowsScrollEnd}
            hasMore={hasMoreValue}
            scrollThreshold={1}
            loader={<LinearProgress />}
            // Let's get rid of second scroll bar
            style={{ overflow: "unset" }}
          >
      <Grid container spacing={5} marginTop={10} >
        <Container>
          <Stack spacing={4}>
            <List>
              <h2></h2>
              {(scrollData !== undefined) &&
                scrollData.map((ship, index: number) => (
                  <Grid key={index} item xs={12} sm={6}>

                    <Card sx={{ maxWidth: 600 }}>
                      <CardActionArea>

                        <CardMedia
                          component='img'
                          height='600'
                          width='600'
                          image={ship.image}
                          alt={ship.name}
                          loading='lazy'
                        />

                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {ship.name}
                          </Typography> </CardContent> <CardActions>
                          <Button variant="contained" onClick={handleClickOpen}>
                            Select
                          </Button>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Thank You For The Selection"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Wish You Happy Holidays and Have a Nice Trip
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>ok</Button>

                            </DialogActions>
                          </Dialog>
                        </CardActions>  </CardActionArea>
                    </Card>
                  </Grid>
                ))}

            </List>
          </Stack>
        </Container>
      </Grid>
      </InfiniteScroll>

    </div>
  )
}

export default Shipslistview