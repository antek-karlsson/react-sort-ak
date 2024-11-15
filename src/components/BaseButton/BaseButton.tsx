import "./BaseButton.scss";

interface BaseButtonProps {
  className: "initial" | "active" | "load-more";
  children: React.ReactNode;
  onClick?: () => void;
}

export default function BaseButton({
  className,
  children,
  onClick,
}: BaseButtonProps) {
  return (
    <button
      className={`base-button base-button--${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
