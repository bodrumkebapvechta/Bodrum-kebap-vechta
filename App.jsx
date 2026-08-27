import React, { useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Döner Teller', price: '10.50 €', category: 'Ana Yemek' },
    { id: 2, name: 'Jumbo Döner', price: '9.00 €', category: 'Ana Yemek' },
    { id: 3, name: 'Falafel Teller', price: '9.50 €', category: 'Vejetaryen' },
    { id: 4, name: 'Jäger Schnitzel', price: '12.00 €', category: 'Schnitzel' },
  ]);

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Ana Yemek');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;
    
    const newProduct = {
      id: Date.now(),
      name: newProductName,
      price: newProductPrice,
      category: newProductCategory,
    };

    setProducts([newProduct, ...products]);
    setNewProductName('');
    setNewProductPrice('');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      
      {/* YÖNETİM PANELİ EN ÜSTTE */}
      <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #333' }}>
        <h2 style={{ color: '#f39c12', marginTop: 0 }}>Bodrum Kebap - Yönetim Paneli</h2>
        <p style={{ color: '#aaa', fontSize: '14px' }}>Ürün ekleme ve silme işlemlerini buradan yönetebilirsiniz.</p>
        
        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          <input 
            type="text" 
            placeholder="Ürün Adı (Örn: Yaprak Döner)" 
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff' }}
          />
          <input 
            type="text" 
            placeholder="Fiyat (Örn: 10.00 €)" 
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff' }}
          />
          <select 
            value={newProductCategory}
            onChange={(e) => setNewProductCategory(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff' }}
          >
            <option value="Ana Yemek">Ana Yemek</option>
            <option value="Vejetaryen">Vejetaryen</option>
            <option value="Schnitzel">Schnitzel</option>
            <option value="İçecekler">İçecekler</option>
          </select>
          <button 
            type="submit"
            style={{ padding: '10px', backgroundColor: '#f39c12', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Ürün Ekle
          </button>
        </form>
      </div>

      {/* MENÜ LİSTESİ */}
      <div>
        <h1 style={{ textAlign: 'center', color: '#f39c12' }}>Bodrum Kebap Vechta</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '20px' }}>
          {products.map(product => (
            <div key={product.id} style={{ backgroundColor: '#1e1e1e', padding: '15px', borderRadius: '8px', border: '1px solid #333', position: 'relative' }}>
              <span style={{ fontSize: '12px', color: '#f39c12', textTransform: 'uppercase' }}>{product.category}</span>
              <h3 style={{ margin: '5px 0' }}>{product.name}</h3>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2ecc71' }}>{product.price}</p>
              <button 
                onClick={() => handleDeleteProduct(product.id)}
                style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', position: 'absolute', top: '15px', right: '15px' }}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
