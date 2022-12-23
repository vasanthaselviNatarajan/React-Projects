import { Hidden, ImageList, ImageListItem, ImageListItemBar, Stack } from '@mui/material';
import React from 'react'
import { Ship } from '../common/interfaces/ship.interface';

interface ShipsProps {
    ships: Ship[]
}

const Shipsgallery: React.FC<ShipsProps> = ({ ships }: ShipsProps) => {
    return (
        <Stack spacing={4} style={{overflow:'hidden'}}>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={5} rowHeight={164} style={{overflow:'hidden'}}>
                {
                    (ships !== undefined) &&
                    ships.map((ship) => (
                        <ImageListItem key={ship.image}>
                            <img src={ship.image} alt={ship.name} width={600} height={600} loading='lazy' />
                        </ImageListItem>

                    ))
                }
            </ImageList>
        </Stack>
    )
}

export default Shipsgallery