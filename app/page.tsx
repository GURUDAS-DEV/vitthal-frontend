import {
  Hero,
  MarketStats,
  CategoryBrowse,
  ProductSection,
  WhyChooseUs,
  CTASection,
} from "@/components/Landing_Page";

type Product = {
  name: string;
  minPrice: number;
  maxPrice: number;
  moq: number;
  sellerCount: number;
  image: string;
  id: string;
};

// Map backend response to the frontend Product shape
function mapBackendProduct(bp: any): Product {
  const vendorsCount = Number(bp.seller_count || bp.vendor_count || 0);
  const minPrice = Number(bp.min_price) || 0;
  const maxPrice = Number(bp.max_price) || 0;
  const minMoq = Number(bp.min_moq) || 1;

  return {
    name: bp.product_name || "Unknown Product",
    minPrice,
    maxPrice,
    moq: minMoq,
    sellerCount: vendorsCount,
    image:
      bp.primary_image ||
      "https://www.shutterstock.com/image-photo/neatly-stacked-light-green-gypsum-600nw-2690641841.jpg",
    id: bp.product_id || bp.id || "unknown",
  };
}

// Fetch helper
async function fetchProducts(url: string): Promise<Product[]> {
  try {
    const res = await fetch(url, {
      cache: "no-store", // Always fetch fresh data during development
    });
    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.statusText}`);
      return [];
    }
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      return json.data.map(mapBackendProduct);
    }
    return [];
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    return [];
  }
}

export default async function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/products`
    : "http://localhost:9000/api/products";

  // Fetch concurrently
  const [featuredProducts, plasticProducts, metalProducts] = await Promise.all([
    fetchProducts(`${BASE_URL}/getAllProducts?offset=0&limit=4`),
    fetchProducts(`${BASE_URL}/getProductsByCategory/plastic?offset=0&limit=4`),
    fetchProducts(`${BASE_URL}/getProductsByCategory/metal?offset=0&limit=4`),
  ]);

  return (
    <div className="min-h-screen bg-white text-zinc-900">

      <main>
        <Hero />
        <MarketStats />
        <CategoryBrowse />

        <ProductSection
          id="featured-products"
          title="Featured Products"
          subtitle="High-demand SKUs from consistently rated suppliers"
          products={featuredProducts.length > 0 ? featuredProducts : []}
          showMore
          viewAllHref="/products"
          bg="white"
        />

        <ProductSection
          title="Plastic Products"
          subtitle="Resins and compounds for packaging, molding, and extrusion"
          products={plasticProducts.length > 0 ? plasticProducts : []}
          showViewAll
          viewAllHref="/products/plastic"
          bg="zinc"
        />

        <ProductSection
          title="Metal Products"
          subtitle="Industrial-grade metal inputs for fabrication and manufacturing"
          products={metalProducts.length > 0 ? metalProducts : []}
          showViewAll
          viewAllHref="/products/metal"
          bg="white"
        />

        <WhyChooseUs />
        <CTASection />
      </main>

    </div>
  );
}

