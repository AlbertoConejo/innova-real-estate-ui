import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div>
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default Unauthorized;
