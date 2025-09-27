// RegimentDetail.tsx
import { ArrowLeft } from "lucide-react";
import RegimentPopup, { RegimentData } from "./RegimentPopup";

export default function RegimentDetail({
  data,
  onBack,
}: {
  data: RegimentData;
  onBack: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-white">
      {/* Topbar */}
      <div className="flex items-center gap-3 px-4 h-14 border-b">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbage til kort
        </button>
        <div className="font-semibold">{data.name}</div>
      </div>

      {/* Indhold (centret kort-kort) */}
      <div className="p-4 flex justify-center">
        <RegimentPopup data={data} />
      </div>
    </div>
  );
}
