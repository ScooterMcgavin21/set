import React from 'react';
import classes from './Sets.module.css';
/**
 * Reusable Wrapping component which renders fetched API sets into a container
 * passed through props {props.children} to see whats passed into the sets component
 */

function Sets(props) {
  return (
    <div className={`${classes.sets} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Sets;
