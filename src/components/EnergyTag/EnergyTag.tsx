import Tag from "@/assets/svg/label.svg?react";

import "./EnergyTag.scss";

interface EnergyTagProps {
  energyClass: string;
  className?: string;
}

export default function EnergyTag({ energyClass }: EnergyTagProps) {
  return (
    <div className="energy-tag">
      <Tag />
      <p>{energyClass}</p>
    </div>
  );
}
