import FilterTableSearch from "./FilterTableSearch";
import HealthForm from "./ui/HealthForm/HealthForm";

export default function Header() {
  return (
    <div className="max-w-5xl m-auto">
      <div className="p-5">
        <h1 className="text-3xl">Pasien Masuk Rawat Inap</h1>
      </div>
      <div className="p-2">
        {/* Search Form */}
        <FilterTableSearch />
        {/* FORMULIR */}
        <HealthForm />
        {/*  */}
      </div>
    </div>
  );
}
