import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import PropertyForm from '../components/PropertyForm';
import axios from 'axios';

function Home() {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:44345/api/Properties');
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
      await axios.post('http://localhost:44345/api/Properties', property);
      fetchProperties();
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const updateProperty = async (property) => {
    try {
      await axios.put(`http://localhost:44345/api/Properties/${property.id}`, property);
      fetchProperties();
      setEditingProperty(null);
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:44345/api/Properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  if (loading) {
    return <p>Loading properties...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Featured Properties</h2>
      {user && user.role === 'admin' && (
        <div>
          <h3>{editingProperty ? 'Edit Property' : 'Add New Property'}</h3>
          <PropertyForm
            addProperty={addProperty}
            updateProperty={updateProperty}
            editingProperty={editingProperty}
            setEditingProperty={setEditingProperty}
          />
        </div>
      )}
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isAdmin={user && user.role === 'admin'}
            deleteProperty={deleteProperty}
            setEditingProperty={setEditingProperty}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
