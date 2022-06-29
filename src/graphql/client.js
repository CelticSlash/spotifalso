import { ApolloClient, InMemoryCache } from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"

export const client = new ApolloClient({
    link: new WebSocketLink({
        uri: 'wss://picked-goblin-29.hasura.app/v1/graphql',
        options: {
            reconnect: true,
            connectionParams: {
                headers: {'x-hasura-admin-secret' : 'qwHpuz1RivGoKKpOKnodLJqhGpwRpEowRrbAlc7D6fAmgsdhQiJliWTqzNoykFVS'},
            }
        },
    }),
    cache: new InMemoryCache()
});

// export const client = new ApolloClient({
//     uri: 'https://picked-goblin-29.hasura.app/v1/graphql',
//     headers: {'x-hasura-admin-secret' : 'qwHpuz1RivGoKKpOKnodLJqhGpwRpEowRrbAlc7D6fAmgsdhQiJliWTqzNoykFVS'},
//     cache: new InMemoryCache()
// });