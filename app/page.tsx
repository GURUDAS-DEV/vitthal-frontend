import {
  Header,
  Hero,
  MarketStats,
  CategoryBrowse,
  ProductSection,
  WhyChooseUs,
  CTASection,
  Footer,
} from "./components/Landing_Page";

type Product = {
  name: string;
  price: string;
  moq: string;
  leadTime: string;
  vendor: string;
  location: string;
  image: string;
};

const featuredProducts: Product[] = [
  {
    name: "HDPE Plastic Granules",
    price: "₹120 / unit",
    moq: "MOQ: 100 units",
    leadTime: "Lead time: 5-7 days",
    vendor: "Shree Polymers Pvt. Ltd.",
    location: "Ahmedabad, India",
    image:
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Stainless Steel Sheets",
    price: "₹340 / unit",
    moq: "MOQ: 50 units",
    leadTime: "Lead time: 4-6 days",
    vendor: "Kailash Metals",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Industrial PVC Resin",
    price: "₹95 / unit",
    moq: "MOQ: 120 units",
    leadTime: "Lead time: 6-8 days",
    vendor: "Venkat Industrial Supply",
    location: "Hyderabad, India",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cold Rolled Steel Coil",
    price: "₹410 / unit",
    moq: "MOQ: 40 units",
    leadTime: "Lead time: 3-5 days",
    vendor: "Om Sai Steels",
    location: "Pune, India",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
  },
];

const plasticProducts: Product[] = [
  {
    name: "PP Injection Grade",
    price: "₹108 / unit",
    moq: "MOQ: 100 units",
    leadTime: "Lead time: 5-8 days",
    vendor: "RK Polymer House",
    location: "Vadodara, India",
    image:
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "ABS Polymer",
    price: "₹155 / unit",
    moq: "MOQ: 80 units",
    leadTime: "Lead time: 4-6 days",
    vendor: "Apex Raw Materials",
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "LLDPE Film Grade",
    price: "₹112 / unit",
    moq: "MOQ: 150 units",
    leadTime: "Lead time: 7-9 days",
    vendor: "Eastern Industrial Traders",
    location: "Kolkata, India",
    image:
      "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "PET Bottle Flakes",
    price: "₹88 / unit",
    moq: "MOQ: 200 units",
    leadTime: "Lead time: 6-10 days",
    vendor: "GreenCycle Materials",
    location: "Surat, India",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
];

const metalProducts: Product[] = [
  {
    name: "Galvanized Iron Sheets",
    price: "₹290 / unit",
    moq: "MOQ: 60 units",
    leadTime: "Lead time: 5-7 days",
    vendor: "Prakash Iron Works",
    location: "Ludhiana, India",
    image:
      "https://images.unsplash.com/photo-1565060290692-3d7573dbb5f3?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Aluminium Ingots",
    price: "₹520 / unit",
    moq: "MOQ: 30 units",
    leadTime: "Lead time: 4-6 days",
    vendor: "Maharashtra Alloy Corp.",
    location: "Nagpur, India",
    image:
      "https://images.unsplash.com/photo-1572616766092-5f1f0d2f6d78?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "MS Round Bars",
    price: "₹245 / unit",
    moq: "MOQ: 70 units",
    leadTime: "Lead time: 3-5 days",
    vendor: "Bharat Steel Link",
    location: "Raipur, India",
    image:
      "https://images.unsplash.com/photo-1579632652839-2d3ec3f705d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Copper Wire Rods",
    price: "₹610 / unit",
    moq: "MOQ: 25 units",
    leadTime: "Lead time: 5-6 days",
    vendor: "Nexa Conductors",
    location: "Chennai, India",
    image:
      "https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&w=900&q=80",
  },
];



export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <main>
        <Hero />
        <MarketStats />
        <CategoryBrowse />

        <ProductSection
          id="featured-products"
          title="Featured Products"
          subtitle="High-demand SKUs from consistently rated suppliers"
          products={featuredProducts}
          showMore
        />

        <ProductSection
          title="Plastic Products"
          subtitle="Resins and compounds for packaging, molding, and extrusion"
          products={plasticProducts}
          showViewAll
          />

        <ProductSection
          title="Metal Products"
          subtitle="Industrial-grade metal inputs for fabrication and manufacturing"
          products={metalProducts}
          showViewAll
        />

      <WhyChooseUs />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}