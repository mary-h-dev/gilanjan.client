import Image from "next/image";
import apiService from "../services/apiService";
import Link from "next/link";
import TextTitle from "../shared/TextTitle";
import PersianTime from "../shared/PersianTime";



const MyReservationsPage = async () => {
  const reservations = await apiService.get(
    "/useraccount/api/v1/myreservations/"
  );


  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <TextTitle title="رزروهای من:" />
      {reservations.length === 0 ? (
        <div className="w-full h-[50vh] flex justify-center my-6">
          <p className="w-fit h-fit text-gray-600 text-center bg-red-200 p-4 border-2 border-airbnbb rounded-3xl">
            تاکنون رزروی نداشته اید.
          </p>
          <Link
            href={"/"}
            className="mt-10 p-4 text-sm text-gray-400 border-b"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center my-6">
          {reservations.map((reservation: any) => {
            return (
              <div
                key={reservation.property.id}
                className="w-full md:w-1/2 bg-grayMedium flex flex-col md:flex-row gap-4 shadow-md border border-gray-300 rounded-xl"
              >
                <div className="relative overflow-hidden aspect-square rounded-xl w-1/2 flex-shrink-0">
                  <Image
                    fill
                    src={reservation.property.image_urls[0]}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                  />
                </div>

                <div className="w-1/2 flex flex-col gap-2 justify-center items-center">
                  <h2 className="mb-4 cursor-default text-xs">{reservation.property.title}</h2>

                  <p className="mb-2 cursor-default text-xs">
                    <strong>تاریخ ورود:</strong>{"   "}
                    <PersianTime time={reservation.start_date} />
                  </p>
                  <p className="mb-2 cursor-default text-xs">
                    <strong>تاریخ خروج:</strong>{" "}
                    <PersianTime time={reservation.end_date} />
                  </p>

                  <p className="mb-2 cursor-default text-xs">
                    <strong>چند روز اقامت:</strong>{" "}
                    {reservation.number_of_nights}
                  </p>
                  <p className="mb-2 flex cursor-default text-xs">
                    <strong>مبلغ قابل پرداخت:</strong>
                    <span>{reservation.total_price}{""}تومان {" "}</span>
                  </p>

                  <Link
                    href={`/properties/${reservation.property.id}`}
                    className="mt-6 inline-block cursor-pointer font-light py-4 px-6 bg-airbnbb text-white rounded-xl"
                  >
                    مشاهده جزئیات
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default MyReservationsPage;
