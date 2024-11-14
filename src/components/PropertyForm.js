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
      <button type="submit" className='btn-edit'>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white" // Cambia el color del ícono a blanco
    height="20px" // Ajusta el tamaño del ícono
    width="20px"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
  {editingProperty ? ' Update' : ' Add'} Property
</button>
    </form>
  );
}

export default PropertyForm;
