import Image from "next/image";

import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const LandlordDetailPage = async ({ params }: { params: { id: string } }) => {
  const landlord = await apiService.get(`/useraccount/api/v1/${params.id}`);
  const userId = await getUserId();

  return (
    <main className="my-6 max-w-[1500px] mx-auto px-6 pb-6 flex flex-row justify-between gap-2">
<aside className="w-1/4 mb-4">
        <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
          <Image
            // src={landlord.avatar_url}
            src="/conversation.svg"
            width={100}
            height={100}
            alt="Landlrod name"
            className="rounded-full"
          />

          <h1 className="mt-6 text-xl text-gray-600">{landlord.name}</h1>

          {userId != params.id && (
            <ContactButton userId={userId} landlordId={params.id} />
          )}
        </div>
      </aside>
      <div className="w-3/4">
        <PropertyList landlord_id={params.id} />
      </div>
    </main>
  );
};

export default LandlordDetailPage;
