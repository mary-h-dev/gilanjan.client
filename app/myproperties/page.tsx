import { getUserId } from "../lib/actions";
import PropertyList from "../components/properties/PropertyList";
import TextTitle from "../shared/TextTitle";



const MyPropertiesPage = async () => {
    const userId = await getUserId();


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 flex flex-col justify-center py-4">
            <TextTitle title="آگهی هایی که من اخیراً ثبت کرده ام:"/>
            <div className="w-full">
                <PropertyList 
                    landlord_id={userId}
                />
            </div>
        </main>
    )
}

export default MyPropertiesPage;