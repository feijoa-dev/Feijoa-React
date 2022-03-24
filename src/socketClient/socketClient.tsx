import { io } from 'socket.io-client';

const {
  REACT_APP_FEATURELY_SOCKET_URL,
  FEATURELY_SOCKET_URL,
  REACT_APP_FEATURELY_APP_ID,
  FEATURELY_APP_ID,
  REACT_APP_FEATURELY_ACCESS_KEY,
  FEATURELY_ACCESS_KEY,
} = process.env;

const createSocketClient = ({
  flagName, 
  environment
}: {
  flagName: string; 
  environment: string;
}) => {
  
  const config = {
    baseUrl: REACT_APP_FEATURELY_SOCKET_URL || FEATURELY_SOCKET_URL || 'http://localhost:3001',
    appId: REACT_APP_FEATURELY_APP_ID || FEATURELY_APP_ID,
    accessKey: REACT_APP_FEATURELY_ACCESS_KEY || FEATURELY_ACCESS_KEY
  };

  const socketClient = io(config.baseUrl, {
    autoConnect: false,
    query: {
      accessKey: config.accessKey, 
      appId: config.appId, 
      flagName, 
      environment
    }
  })

  socketClient.on("connect_error", (err) => {
    console.log(`Featurely connect_error due to ${err.message}`);
  });
  
  return socketClient
}

export default createSocketClient
