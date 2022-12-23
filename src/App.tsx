import React from 'react';
 
import { ApolloProvider } from '@apollo/client';

 


 
import client from './common/apollo-client';
import Home from './Component/Home';

function App() {
  return (
    
      <ApolloProvider client={client}>
             
                 
                 
                     
                        <Home />
                     
                 
        </ApolloProvider> 
  );
}

export default App;
