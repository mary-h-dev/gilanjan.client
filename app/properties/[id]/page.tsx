import Image from "next/image";
import Link from "next/link";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import PropertyImageList from "@/app/components/PropertyImageList";
import ResponsivePropertyImages from "@/app/components/ResponsivePropertyImages";



const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await apiService.get(`/properties/api/v1/${params.id}`);
  const userId = await getUserId();

  console.log("userId", userId);
  const firstImageUrl = property.image_urls[0];


  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-10 mb-14">
      <ResponsivePropertyImages imageUrls={property.image_urls} />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{property.title}</h1>
          <span className="mb-6 block text-lg text-gray-600">
            {property.guests} ظرفیت مهمان - {property.bedrooms} اتاق خواب -{" "}
            {property.bathrooms} حمام
          </span>
          <hr />
          <Link
            href={`/landlords/${property.landlord.id}`}
            className="py-6 flex items-center space-x-4"
          >
            {/* {property.landlord.avatar_url && (
            )} */}

            <Image
              // src={property.landlord.avatar_url}
              src="/personn.svg"
              width={50}
              height={50}
              className="rounded-full"
              alt="The user name"
            />
            <p>
              <strong className="text-red-400 mr-2">
                {property.landlord.name}
              </strong>{" "}
              میزبان شما است
            </p>
          </Link>
          <hr />

          <p className="mt-6 text-lg">{property.description}</p>
        </div>

        <ReservationSidebar property={property} userId={userId} />
      </div>
    </main>
  );
};


export default PropertyDetailPage;
