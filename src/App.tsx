import { useState } from "react";

import { products } from "@/assets/data/products";

import ProductCard from "@/components/ProductCard/ProductCard.tsx";
import SearchInput from "@/components/SearchInput/SearchInput.tsx";
import Dropdown, { Option } from "@/components/Dropdown/Dropdown.tsx";
import BaseButton from "@/components/BaseButton/BaseButton.tsx";
import ArrowSmall from "@/assets/svg/arrow-down-small.svg?react";

import type { ProductCardProps } from "./components/ProductCard/ProductCard.tsx";

import "@/App.scss";

export default function App() {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductCardProps[]>(products);

  const [visibleCount, setVisibleCount] = useState(6);

  const handleSearch = (searchQuery: string) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      Object.values(product).some((value) =>
        typeof value === "string"
          ? value.toLowerCase().includes(lowercasedQuery)
          : false
      )
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (option: Option) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (option.identifier) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "capacity_asc":
          return parseInt(a.capacity) - parseInt(b.capacity);
        case "capacity_desc":
          return parseInt(b.capacity) - parseInt(a.capacity);
        case "popularity_asc":
          return a.popularity - b.popularity;
        case "popularity_desc":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
    setFilteredProducts(sorted);
  };

  const filterBy = (
    option: Option,
    filterBy: (product: ProductCardProps) => boolean
  ) => {
    const filtered = products.filter(filterBy);
    setFilteredProducts(option.identifier === "all" ? products : filtered);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="app">
      <div className="top-bar">
        <h1>Wybierz urządzenie</h1>
      </div>
      <div className="container">
        <div className="search-filters-bar">
          <SearchInput className="search-input" onSearch={handleSearch} />
          <div className="filters-sort">
            <Dropdown
              label="Sortuj po"
              options={[
                { identifier: "price_asc", label: "Ceny rosnąco" },
                { identifier: "price_desc", label: "Ceny malejąco" },
                { identifier: "capacity_asc", label: "Pojemnoś rosnąco" },
                { identifier: "capacity_desc", label: "Pojemnoś malejco" },
                { identifier: "popularity_asc", label: "Popularnośc rosnąco" },
                { identifier: "popularity_desc", label: "Popularnośc malejco" },
              ]}
              onSelect={handleSort}
            />
            <Dropdown
              label="Funkcje"
              options={[
                { identifier: "addWash", label: "Drzwi AddWash" },
                { identifier: "aiControl", label: "Panel AI Control" },
                { identifier: "inverter", label: "Silnik inwerterowy" },
                {
                  identifier: "electronic_display",
                  label: "Wyświetlacz elektroniczny",
                },
              ]}
              onSelect={(option) =>
                filterBy(option, (product) =>
                  product.features.includes(option.label)
                )
              }
            />
            <Dropdown
              label="Klasa energetyczna"
              options={[
                { identifier: "A", label: "A" },
                { identifier: "B", label: "B" },
                { identifier: "C", label: "C" },
                { identifier: "D", label: "D" },
                { identifier: "E", label: "E" },
                { identifier: "F", label: "F" },
              ]}
              onSelect={(option) =>
                filterBy(
                  option,
                  (product) => product.energyClass === option.label
                )
              }
            />
            <Dropdown
              label="Pojemnośc"
              options={[
                { identifier: "8", label: "8" },
                { identifier: "9", label: "9" },
                { identifier: "10,5", label: "10,5" },
              ]}
              onSelect={(option) =>
                filterBy(option, (product) => product.capacity === option.label)
              }
            />
          </div>
          <span className="results-count">
            Liczba wyników: {filteredProducts.length}
          </span>
        </div>

        <div className="product-grid">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      {visibleCount < filteredProducts.length && (
        <BaseButton className="load-more" onClick={handleLoadMore}>
          Pokaż więcej
          <ArrowSmall />
        </BaseButton>
      )}
      <div className="footer" />
    </div>
  );
}
