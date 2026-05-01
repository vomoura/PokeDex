import "./Evolution.css";
import { useLanguage } from "../../../context/LanguageContext";

export default function Evolution() {
  const { t } = useLanguage();
  return (
    <div className="tab-content">
      <p>{t.evolutionSoon}</p>
    </div>
  );
}
