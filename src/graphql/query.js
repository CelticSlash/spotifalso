import { gql } from "@apollo/client";

export const GET_SONGS = gql `
    query getSongs {
        musica(order_by: {created_at: desc}) {
            artist
            duration
            thumbnail
            title
            url
            id
        }
    }
`;