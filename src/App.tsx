import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, Users, Megaphone, Star, Truck, Plane, ChevronDown, Check } from 'lucide-react';
import { products } from './products';
import './App.css';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  affiliateLink: string;
  rating: number;
  sold: string;
  featured?: boolean;
  freeShipping?: boolean;
  origin: 'BR' | 'INT';
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  // NOVOS ESTADOS PARA O DROPDOWN
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Início");
  const [showButtons, setShowButtons] = useState(false);

  const categories = ["Todos", ...new Set(products.map(p => p.category))];

  const filteredProducts = (products as Product[]).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    
    if (activeTab === "Novidades") {
      const totalProdutos = products.length;
      return matchesSearch && matchesCategory && products.indexOf(product) >= totalProdutos - 10;
    }
    
    if (activeTab === "Destaques") {
       return matchesSearch && matchesCategory && product.featured === true;
    }

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowButtons(window.scrollY > 300);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => observer.observe(card));

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filteredProducts]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 w-full overflow-x-hidden relative bg-transparent">
      
      {/* --- FUNDO ANIMADO (MESH GRADIENT) --- */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-shopee/20 rounded-full blur-[120px] animate-mesh-1"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-200/30 rounded-full blur-[100px] animate-mesh-2"></div>
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-white/40 rounded-full blur-[150px] animate-mesh-3"></div>
      </div>
      
      {/* --- INJEÇÃO DE ANIMAÇÃO DIRETA --- */}
      <style>{`
        @keyframes float-ball {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 40px) scale(1.2); }
        }
        .ball-anim { animation: float-ball 15s ease-in-out infinite; }
      `}</style>
  
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#f9fafb]">
        <div className="ball-anim absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(255, 138, 0, 0.15)' }}></div>
        <div className="ball-anim absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: 'rgba(255, 165, 0, 0.1)', animationDelay: '-5s' }}></div>
      </div>

      <header className="bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-50 w-full border-b border-white/20">
        <div className="w-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-shopee p-2 rounded-lg shadow-md">
              <ShoppingBag className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Takata<span className="text-shopee">Store</span></h1>
          </div>

          <nav className="hidden md:flex gap-8 font-medium text-gray-600">
            {["Início", "Novidades", "Destaques"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`hover:text-shopee transition-colors py-2 ${activeTab === tab ? "text-shopee font-bold border-b-2 border-shopee" : ""}`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 flex flex-col gap-4 animate-fade-in shadow-xl">
             {["Início", "Novidades", "Destaques"].map((tab) => (
              <button key={tab} onClick={() => {setActiveTab(tab); setIsMenuOpen(false)}} className="text-left py-3 font-medium text-gray-700 border-b border-gray-50 last:border-0">{tab}</button>
            ))}
          </div>
        )}
      </header>

      <div className="w-full overflow-hidden relative flex items-center justify-start">
        <img 
          src="https://i.postimg.cc/Y9Qwqn8X/Whisk_47da2a27667ad79855747b6a06c407e8dr.jpg" 
          alt="Takata Store Banner" 
          className="w-full h-auto object-cover shadow-sm animate-fade-in block"
        />
        <div 
          className="absolute left-4 md:left-12 flex flex-col items-start gap-3 cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
        >
          <div className="bg-black/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl font-black text-xs md:text-lg shadow-2xl border border-white/10 animate-pulse-slow flex flex-col items-center">
            <span className="tracking-tighter">CONFIRA AS OFERTAS</span>
            <div className="mt-1 animate-bounce">
               <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rotate-90" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="relative z-20 -mt-8 mb-8 px-2">
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-2xl rounded-full shadow-2xl border border-white flex items-center p-2">
            <div className="pl-4"><Search className="text-shopee w-6 h-6" /></div>
            <input 
              type="text" 
              placeholder="Digite o que você procura..." 
              className="w-full px-4 py-3 rounded-full outline-none bg-transparent text-black font-semibold placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-10">
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="bg-green-100/80 p-3 rounded-full"><Users className="text-green-600 w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">Não perca nenhuma promoção!</h3>
                <p className="text-sm text-gray-500 font-medium">Entre nos nossos grupos VIP.</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <a href="https://chat.whatsapp.com/Emv6mrbk4U7IxMECJDTjJs" target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg hover:shadow-green-200 transition-all active:scale-95">
                <Users className="w-4 h-4" /> Grupo VIP
              </a>
              <a href="https://whatsapp.com/channel/0029Vb4fX5C5fM5aXeihjl3m" target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                <Megaphone className="w-4 h-4" /> Canal
              </a>
            </div>
          </div>
        </div>

        {/* --- NOVO FILTRO DE CATEGORIAS (PESQUISA INTELIGENTE) --- */}
        <div className="relative w-full max-w-md mx-auto mb-8 px-4 z-40">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Filtrar por categoria..."
              value={categorySearch}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              onChange={(e) => {
                setCategorySearch(e.target.value);
                setIsCategoryOpen(true);
              }}
              className="w-full pl-5 pr-10 py-3 rounded-xl border border-white/40 shadow-lg outline-none focus:ring-2 focus:ring-shopee/50 font-bold text-gray-700 bg-white/60 backdrop-blur-md transition-all placeholder-gray-500"
            />
            <ChevronDown 
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            />
          </div>

          {/* LISTA QUE ABRE QUANDO CLICA */}
          {isCategoryOpen && (
            <div className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 max-h-60 overflow-y-auto z-50 animate-fade-in custom-scrollbar">
              {categories
                .filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase()))
                .map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCategorySearch(cat === 'Todos' ? '' : cat);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 hover:bg-orange-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-0 ${
                      selectedCategory === cat ? 'text-shopee font-black bg-orange-50' : 'text-gray-600 font-medium'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && <Check className="w-4 h-4 text-shopee" />}
                  </button>
                ))}
                
              {categories.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 && (
                <div className="p-4 text-center text-gray-400 text-sm font-medium">Nenhuma categoria encontrada 😕</div>
              )}
            </div>
          )}
          
          {/* ETIQUETA DE CONFIRMAÇÃO */}
          {selectedCategory !== "Todos" && (
            <div className="mt-3 text-center animate-fade-in">
              <span className="inline-flex items-center gap-2 bg-shopee text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Filtro: {selectedCategory}
                <button 
                  onClick={() => {
                    setSelectedCategory("Todos");
                    setCategorySearch("");
                  }}
                  className="bg-white/20 rounded-full p-0.5 hover:bg-white/40 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card group flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-white/60">
              <div className="relative aspect-square bg-gray-100/30">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
                {product.freeShipping && (
                  <div className="absolute top-2 left-2 bg-[#00b14f] text-white text-[10px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <Truck className="w-3 h-3" /> FRETE
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-shopee text-white text-[10px] font-extrabold px-2 py-1 rounded-md shadow-sm">OFERTA</div>
              </div>

              <div className="p-3 md:p-5 flex-1 flex flex-col justify-between bg-white/60 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {product.origin === 'BR' ? (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-green-200">
                        🇧🇷 BRASIL
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-blue-200">
                        <Plane className="w-2.5 h-2.5" /> IMPORTADO
                      </span>
                    )}
                    <span className="text-[10px] text-orange-500 uppercase font-extrabold tracking-widest ml-auto">{product.category}</span>
                  </div>
                  
                  <h3 className="text-gray-900 font-bold text-xs md:text-base leading-tight mt-1 mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /><span className="text-xs font-bold text-gray-700">{product.rating}</span></div>
                    <span className="text-[10px] text-gray-400 font-medium">{product.sold} vendidos</span>
                  </div>
                </div>
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-shopee text-white py-3 rounded-xl transition-all font-bold text-xs md:text-sm shadow-md group-hover:shadow-orange-200 active:scale-95">
                  Conferir Oferta <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className={`fixed bottom-6 right-6 z-[100] flex flex-col gap-3 transition-all duration-500 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <a 
          href="https://chat.whatsapp.com/Emv6mrbk4U7IxMECJDTjJs" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center btn-pulse"
        >
          <Users className="w-6 h-6" />
        </a>
        <button 
          onClick={scrollToTop}
          className="bg-white/80 backdrop-blur-lg text-gray-900 p-4 rounded-full shadow-xl hover:bg-shopee hover:text-white transition-all flex items-center justify-center border border-white"
        >
          <ArrowRight className="w-6 h-6 -rotate-90" />
        </button>
      </div>

      <footer className="bg-white/30 backdrop-blur-sm border-t border-white/50 py-12 text-center text-gray-500 text-xs mt-20">
        <p className="font-bold">© 2026 Takata Store. Todos os direitos reservados.</p>
        <p className="mt-2 opacity-70">Achadinhos selecionados com carinho ✨</p>
      </footer>
    </div>
  );
}

export default App;