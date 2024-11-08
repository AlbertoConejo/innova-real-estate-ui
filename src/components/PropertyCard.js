import React from 'react';

function PropertyCard({ property, isAdmin, deleteProperty, handleEditClick }) {
  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} />
      <h3>{property.title}</h3>
      <p>{property.description}</p>
      {property.tourLink && (
        <a href={property.tourLink} target="_blank" rel="noopener noreferrer">
          3D Tour
        </a>
      )}
      {isAdmin && (
        <div className="admin-actions">
          <button onClick={() => handleEditClick(property)}>Edit</button>
          <button onClick={() => deleteProperty(property.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
