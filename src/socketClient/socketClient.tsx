import { io } from 'socket.io-client';

const {
  REACT_APP_FEIJOA_SOCKET_URL,
  FEIJOA_SOCKET_URL = "https://gateway.feijoa.dev",
  REACT_APP_FEIJOA_APP_ID,
  FEIJOA_APP_ID,
  REACT_APP_FEIJOA_ACCESS_KEY,
  FEIJOA_ACCESS_KEY,
} = process.env;

const createSocketClient = ({
  flagName, 
  environment
}: {
  flagName: string; 
  environment: string;
}) => {
  
  const config = {
    baseUrl: REACT_APP_FEIJOA_SOCKET_URL || FEIJOA_SOCKET_URL,
    appId: REACT_APP_FEIJOA_APP_ID || FEIJOA_APP_ID,
    accessKey: REACT_APP_FEIJOA_ACCESS_KEY || FEIJOA_ACCESS_KEY
  };

  const socketClient = io(config.baseUrl, {
    autoConnect: false,
    query: {
      accessKey: config.accessKey, 
      appId: config.appId, 
      flagName, 
      environment,
      location: window?.location
    }
  })

  socketClient.on("connect_error", (err) => {
    console.error(`Feijoa connect_error due to ${err.message}`);
  });
  
  return socketClient
}

export default createSocketClient
