import { useProductContext } from "@/hooks/useProductContext";

import EnergyTag from "@/components/EnergyTag/EnergyTag";
import BaseButton from "@/components/BaseButton/BaseButton";

import "./ProductCard.scss";

export interface ProductCardProps {
  id: number;
  name: string;
  capacity: string;
  dimensions: {
    depth: number;
    width: number;
    height: number;
  };
  features: string[];
  energyClass: string;
  priceStartDate: Date;
  priceEndDate: Date;
  price: number;
  installments: number;
  image: string;
  popularity: number;
}

const SPEC_LABELS = ["Pojemnośc (kg)", "Wymiary (GxSxW)", "Funkcje"];

const formatDimensions = (dimensions: ProductCardProps["dimensions"]) =>
  `${dimensions.depth}x${dimensions.width}x${dimensions.height} cm`;

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

const formatPriceDateRange = (startDate: Date, endDate: Date) =>
  `${formatDate(startDate)} - ${formatDate(endDate)}`;

export default function ProductCard(props: ProductCardProps) {
  const specsData: { [key: string]: string } = {
    "Pojemnośc (kg)": `${props.capacity} kg`,
    "Wymiary (GxSxW)": formatDimensions(props.dimensions),
    Funkcje: props.features.join(", "),
  };

  const { selectedProductId, setSelectedProductId } = useProductContext();

  return (
    <div className="product-card">
      <img
        className="product-card__image"
        src={`/images/${props.image}`}
        alt={props.name}
      />
      <div className="product-card__data">
        <h3 className="product-card__name">{props.name}</h3>
        <ul className="product-card__list">
          {SPEC_LABELS.map((label) => (
            <li className="product-card__list-item" key={label}>
              {label}: <strong>{specsData[label]}</strong>
            </li>
          ))}
        </ul>
        <div className="product-card__energy">
          <p className="product-card__energy-label">Klasa energetyczna:</p>
          <EnergyTag
            className="product-card__energy-tag"
            energyClass={props.energyClass}
          />
        </div>
        <div className="product-card__price-info">
          <p className="product-card__price-dates">
            {formatPriceDateRange(props.priceStartDate, props.priceEndDate)}
          </p>
          <h3 className="product-card__price">
            {props.price}
            <div className="product-card__price-decimal">
              <span>00</span>
              <span>zł</span>
            </div>
          </h3>
        </div>
        <p className="product-card__installments">
          {`${(props.price / props.installments).toFixed(2)} zł x ${
            props.installments
          } rat`}
        </p>
      </div>
      <BaseButton
        className={
          props.id.toString() === selectedProductId ? "active" : "initial"
        }
        onClick={() => setSelectedProductId(props.id.toString())}
      >
        {props.id.toString() === selectedProductId ? "Wybrano" : "Wybierz"}
      </BaseButton>
    </div>
  );
}
