import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

function PropertyCard({ property, isAdmin, deleteProperty, handleEditClick }) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteProperty(property.id);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

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
          <button className="btn-edit" onClick={() => handleEditClick(property)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-edit"
              viewBox="0 0 24 24"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>

          <button className="btn-delete" onClick={handleDeleteClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-delete"
              viewBox="0 0 512 512"
            >
              <g>
                <rect height="160" width="64" x="288" y="224" />
                <path d="M480,96H352V32c0-17.688-14.312-32-32-32H192c-17.688,0-32,14.312-32,32v64H32c-17.688,0-32,14.312-32,32v32h32v320 c0,17.688,14.312,32,32,32h384c17.688,0,32-14.312,32-32V160h32v-32C512,110.312,497.688,96,480,96z M224,64h64v32h-64V64z M416,448H96V160h320V448z" />
                <rect height="160" width="64" x="160" y="224" />
              </g>
            </svg>
            Delete
          </button>
        </div>
      )}

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={cancelDelete}
        contentLabel="Delete Confirmation"
        className="delete-modal"
        overlayClassName="delete-modal-overlay"
      >
        <div className="modal-content">
          <h3>Are you sure you want to delete this property?</h3>
          <div className="modal-actions">
            <button className="btn-confirm" onClick={confirmDelete}>
              Confirm
            </button>
            <button className="btn-cancel" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PropertyCard;
