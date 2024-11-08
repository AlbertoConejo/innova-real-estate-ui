import React, { useState, useEffect } from 'react';

function PropertyForm({
  addProperty,
  updateProperty,
  editingProperty,
  closeModal,
}) {
  const [property, setProperty] = useState({
    image: '',
    title: '',
    description: '',
    tourLink: '',
  });

  useEffect(() => {
    if (editingProperty) {
      setProperty(editingProperty);
    } else {
      setProperty({
        image: '',
        title: '',
        description: '',
        tourLink: '',
      });
    }
  }, [editingProperty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProperty) {
      updateProperty(property);
    } else {
      addProperty(property);
    }
    setProperty({
      image: '',
      title: '',
      description: '',
      tourLink: '',
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={property.image}
          onChange={(e) => setProperty({ ...property, image: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={property.title}
          onChange={(e) => setProperty({ ...property, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={property.description}
          onChange={(e) =>
            setProperty({ ...property, description: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>3D Tour Link:</label>
        <input
          type="text"
          value={property.tourLink}
          onChange={(e) =>
            setProperty({ ...property, tourLink: e.target.value })
          }
        />
      </div>
      <button type="submit">{editingProperty ? 'Update' : 'Add'} Property</button>
    </form>
  );
}

export default PropertyForm;
