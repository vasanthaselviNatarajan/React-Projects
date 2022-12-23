import { gql, useQuery } from "@apollo/client";
import {Ship } from "../../common/interfaces/ship.interface";

const GET_SHIPS = gql`
    query {
        ships {
          home_port
          id
          type
          image
          name
        }
      }
      
`

export const useGetShips = (): Ship[] | undefined => {
    const { data } = useQuery(GET_SHIPS);
    return data?.ships;
}