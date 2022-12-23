import { Button, Container, Grid, Menu, MenuItem, Stack, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useGetShips } from './../hooks/posts/useGetShips';
import { AppBar } from '@material-ui/core';
import Shipsgallery from './ships-gallery.component';
import Shipslistview from './Shipslistview.component';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Ship } from '../common/interfaces/ship.interface';

const Home: React.FC = () => {


    const [view, setView] = React.useState('list');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    let shipTypes: String[] | undefined;
    let val:Ship;
    const ships = useGetShips();
    const [displayedShips, setdisplayedShips] = React.useState(ships);
   

    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setView(nextView);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.currentTarget.innerText);
        if (event.currentTarget.innerText === "All") {
            setdisplayedShips(ships);
        }
        else {
            setdisplayedShips(ships?.filter((ship) => ship.type === event.currentTarget.innerText))
        }
        setAnchorEl(null)
    }
    
    if (ships !== undefined) {
        shipTypes = ships.map((data) => data.type);

        shipTypes = shipTypes!.filter((value, index) => shipTypes!.indexOf(value) === index);

        console.log(shipTypes)
    }


    //console.log(ships);
    return (
        <div className="home">

            <AppBar position='static'  >
                <Toolbar>

                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        SPACEX SHIPS
                    </Typography>

                    <Button
                        color='inherit'
                        id='resources-button'
                        aria-controls={open ? 'resources-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleClick}>
                        Types
                    </Button>
                    <ToggleButtonGroup
                        orientation="vertical"
                        value={view}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="list" aria-label="list">
                            <ViewListIcon style={{ color: '#fff' }} />
                        </ToggleButton>
                        <ToggleButton value="module" aria-label="module">
                            <ViewModuleIcon style={{ color: '#fff' }} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Menu
                        id='resources-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}

                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'resources-button'
                        }}>
                        <MenuItem onClick={handleMenu}>All</MenuItem>
                        {shipTypes && shipTypes.map((item) =>
                            <MenuItem onClick={handleMenu}>{item}</MenuItem>
                        )}
                    </Menu>
                </Toolbar>

            </AppBar>
            
            {(view === "list") && <Shipslistview ships={displayedShips || []} />}
            {(view === "module") && <Shipsgallery ships={displayedShips || []} />
            }


        </div>
    );
}

export default Home;
