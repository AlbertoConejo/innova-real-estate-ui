import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import PropertyForm from '../components/PropertyForm';
import axios from 'axios';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

function Home() {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://localhost:44345/api/Properties');
      setProperties(response.data);
    } catch (error) {
      setError('Error fetching properties');
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProperty = async (property) => {
    try {
      await axios.post('https://localhost:44345/api/Properties', property);
      fetchProperties();
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const updateProperty = async (property) => {
    try {
      await axios.put(`https://localhost:44345/api/Properties/${property.id}`, property);
      fetchProperties();
      closeModal();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`https://localhost:44345/api/Properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProperty(null);
    setIsModalOpen(false);
  };

  const handleAddClick = () => {
    setEditingProperty(null); // Reset any editing property
    openModal();
  };

  const handleEditClick = (property) => {
    setEditingProperty(property);
    openModal();
  };

  if (loading) {
    return <p>Loading properties...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="property-list">
      
      {user && user.role === 'admin' && (
       <div>
       <button className='btn-add' onClick={handleAddClick}>
         <svg
           xmlns="http://www.w3.org/2000/svg"
           enableBackground="new 0 0 512 512"
           height="20px"
           viewBox="0 0 512 512"
           width="20px"
         >
           <path
             fill="white" 
             d="M256,512C114.625,512,0,397.391,0,256C0,114.609,114.625,0,256,0c141.391,0,256,114.609,256,256  C512,397.391,397.391,512,256,512z M256,64C149.969,64,64,149.969,64,256s85.969,192,192,192c106.047,0,192-85.969,192-192  S362.047,64,256,64z M288,384h-64v-96h-96v-64h96v-96h64v96h96v64h-96V384z"
           />
         </svg>
         {}
       </button>
     </div>
      )}
      </div>

      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isAdmin={user && user.role === 'admin'}
            deleteProperty={deleteProperty}
            handleEditClick={handleEditClick}
          />
        ))}
      </div>

      {/* Modal for Add/Edit Property */}
      {user && user.role === 'admin' && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={editingProperty ? 'Edit Property' : 'Add New Property'}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
          <PropertyForm
            addProperty={addProperty}
            updateProperty={updateProperty}
            editingProperty={editingProperty}
            closeModal={closeModal}
          />
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
}

export default Home;
