import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import ProductModal from "../components/ProductModal"; 
import { listarProductos, listarOfertas } from "../services/productoService";
import { listarCategorias } from "../services/categoriaService";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FaFire, FaStar } from "react-icons/fa"; 

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    listarProductos()
      .then((data) => {
        const lista = data.content || (Array.isArray(data) ? data : []);
        setProductos(lista);
      })
      .catch(() => setProductos([]));

    listarOfertas()
      .then((data) => setOfertas(data || []))
      .catch(() => setOfertas([]));

    listarCategorias()
      .then((data) => setCategorias(data || []))
      .catch(() => setCategorias([]));
  }, []);

  const productosDisponibles = Array.isArray(productos) ? productos.filter((p) => p.stock > 0) : [];

  return (
    <div className="home-wrapper">
      
      {/* 1. HERO KPBM (Estructura Clásica) */}
      <section className="home-hero">
        <div className="container home-hero-inner">
          <div className="home-hero-left">
            <span style={{textTransform:'uppercase', letterSpacing:'2px', fontSize:'0.85rem', color:'#FFD54F', fontWeight:'bold'}}>
              Tienda Oficial
            </span>
            
            {/* LOGO KPBM */}
            <div style={{ margin: "10px 0 20px 0" }}>
              <img 
                src="/kpbm_logo.PNG" 
                alt="KPBM" 
                style={{ 
                  maxWidth: "350px", 
                  width: "100%", 
                  height: "auto",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" 
                }} 
              />
            </div>
            
            <p>Descubre nuestra selección exclusiva de productos. Calidad garantizada para tu negocio y familia.</p>
            
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("/productos")} style={{padding:'14px 32px', fontSize:'1.1rem'}}>
                Ver Catalogo
              </button>
            </div>
          </div>

          <div className="home-hero-right">
             <div className="hero-info-cards">
                <div className="info-card">
                    <h3>🚀 Envíos Rápidos</h3>
                    <p>Contamos con envíos en zonas seleccionadas</p>
                </div>
                <div className="info-card">
                    <h3>📦 Precios Mayoreo</h3>
                    <p>Precios accesibles para invertir en tu negocio</p>
                </div>
                <div className="info-card">
                    <h3>🔒 Pago Seguro</h3>
                    <p>Aceptamos PayPal y Tarjetas.</p>
                </div>
                <div className="info-card">
                    <h3>⭐ Calidad</h3>
                    <p>Productos originales garantizados.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="container">
        
        {/* 2. CATEGORÍAS */}
        <section className="categories-section">
            <h2 className="section-title-center" style={{color:'#880E4F'}}>Explora por Categoría</h2>
            
            <div className="categories-grid">
                {categorias.map(cat => (
                    <div key={cat.id} className="category-card-modern" onClick={() => navigate(`/productos?cat=${cat.id}`)}>
                        {cat.imagenUrl ? (
                            <img 
                                src={cat.imagenUrl} 
                                alt={cat.nombre} 
                                style={{
                                    width:'80px', height:'80px', borderRadius:'50%', 
                                    objectFit:'cover', marginBottom:'15px',
                                    border:'3px solid #F8BBD0'
                                }} 
                            />
                        ) : (
                            <div className="cat-icon-modern">
                                {cat.nombre.charAt(0)}
                            </div>
                        )}
                        <h3>{cat.nombre}</h3>
                    </div>
                ))}
            </div>
        </section>

        {/* 3. OFERTAS RELÁMPAGO */}
        {ofertas.length > 0 && (
            <section className="ofertas-section-pro">
                <h2 className="section-title-center" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', color:'#C2185B'}}>
                    <FaFire className="fire-icon-anim" style={{color:'#D81B60'}} /> Ofertas Relámpago
                </h2>
                <p className="section-subtitle" style={{color:'#AD1457'}}>¡Precios increíbles por tiempo limitado!</p>
                
                <div className="product-grid-normal">
                    {ofertas.map(p => (
                        <div key={p.id} onClick={() => setProductoSeleccionado(p)} style={{cursor:'pointer'}}>
                            <ProductCard producto={p} />
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* 4. CARRUSEL */}
        <div style={{margin: '60px 0'}}>
            <Carousel />
        </div>

        {/* 5. LO MÁS VENDIDO */}
        <section className="mas-vendido-section">
            <div className="section-header-flex">
                <h2 style={{display:'flex', alignItems:'center', gap:'10px', color:'#880E4F'}}>
                    <FaStar style={{color:'#FFD54F'}} /> Lo Más Vendido
                </h2>
                <button className="link-ver-todo" onClick={() => navigate("/productos")}>
                    Ver catálogo completo →
                </button>
            </div>

            <div className="product-grid-normal">
                {productosDisponibles.slice(0, 8).map(p => (
                    <div key={p.id} onClick={() => setProductoSeleccionado(p)} style={{cursor:'pointer'}}>
                        <ProductCard producto={p} />
                    </div>
                ))}
            </div>
        </section>

      </div>

      {productoSeleccionado && (
        <ProductModal 
            producto={productoSeleccionado} 
            onClose={() => setProductoSeleccionado(null)} 
        />
      )}
    </div>
  );
}