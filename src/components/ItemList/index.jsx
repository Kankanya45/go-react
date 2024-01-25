import React, { useState, useEffect } from 'react'

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch items from the API
    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/items');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setItems(data); // Update the state with the fetched items data into the items array
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    //useEffect คือ react hook ที่จะทำงานอัตโนมัติเมื่อ components ถูก render หรือ Re-render
    useEffect(( ) => {
        fetchItems();
    }, []);

  return (
    
    <div>
            <h1>Items List</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {items.map(item => (
                    <li key={item.ID}>Name = {item.Name} Price = {item.Price}</li> // Assuming each item has an id and name
                ))}
            </ul>
        </div>
    
  )
}

export default ItemList