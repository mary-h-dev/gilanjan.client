import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";
import TextTitle from "../shared/TextTitle";

const MyFavoritesPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>شما می بایست احراز هویت شوید.</p>
            </main>
        )
    }


    return (
        <main className="max-w-[1500px] max-auto px-6 pb-12">
            <TextTitle title="آیتم هایی که مورد علاقه من واقع شده اند:"/>
            <div className="w-full">
                <PropertyList 
                    favorites={true}
                />
            </div>
        </main>
    )
}

export default MyFavoritesPage;