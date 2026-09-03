// Beispiel für Props uns TypeScript
type NavigationProps = {
    title: string;
    showTitle: boolean;
}
export function Navigation({ title, showTitle }: NavigationProps){
    return (
        <div>
            {showTitle && <h2>{title}</h2>}
            <ul>
                <li>Produkte</li>
                <li>Kunden</li>
                <li>Verleih</li>
            </ul>
        </div>
    )
}

// find (gibt kein neues Array zurück)
  const selectedProduct = products.find(
    product => product.id === 3
  );

// filter
setProducts(previousProducts => (
    previousProducts.filter(product => product.id !== id))
);
    // oder
const availableProducts = products.filter(
  product => product.status === 'Verfügbar'
);

// map
{products.map(product => (
    <ProductCard 
    key={product.id}
    product={product}
    onDelete={handleDeleteProduct}
    />
))}

// State
const [isLoggedIn, setIsLoggedIn] = useState(true);

// ? : und state ändern wenn der neue wert vom bvorherigen abhängig ist
<button onClick={() => setIsLoggedIn(previousIsLoggedIn => !previousIsLoggedIn)}>
    {isLoggedIn ? 'Abmelden' : 'Anmelden'}
</button>

{selectedProduct ? (
    <ProductCard product={selectedProduct} onDelete={handleDeleteProduct}/>
) : (
    <p>Produkt nicht gefunden</p>
)}

// TypeScript 
  const [products, setProducts] = useState<Product[]>([ // der state soll vom type Product sein
    {
      id: 1, // hier erkennt er den type automatisch
      name: 'Pflegebett',
      status: 'Verfügbar'
    }
  ]);

function handleDeleteProduct(id: number){ // hier erkennt er den type auch automatisch
    setProducts(previousProducts => (
        previousProducts.filter(product => product.id !== id))
    );
}