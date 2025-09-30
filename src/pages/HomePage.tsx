import { UseTableContext } from "@/contexts/TableContext";
import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import DataTable from "@/components/DataTable";
import PaginationComponent from "@/components/PaginationComponent";
export default function HomePage() {
  const { loading } = UseTableContext();

  return (
    <div className="w-full h-screen">
      <Header />
      {!loading ? (
        <div className="overflow-hidden rounded-md border max-w-5xl m-auto">
          {/* TABEL */}
          <DataTable />
          {/*  */}
          {/* PAGINATION */}
          <PaginationComponent />
          {/*  */}
        </div>
      ) : (
        // LOADING
        <LoadingComponent />
      )}
    </div>
  );
}
