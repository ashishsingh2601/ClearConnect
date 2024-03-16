import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';
import { SocketContext } from '../../Context';
import './Notifications.css';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">
            <b>{call.name}</b> is calling:
          </Typography>
          <div>
            <Button className="answer__button" variant="contained" color="primary" onClick={answerCall}>
              <Typography variant="h5">Answer</Typography>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
