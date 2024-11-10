import Banner from "./components/Banner";
import Categories from "./components/Categories";
import ContactAdminButton from "./components/ContactAdminButton";
import PropertyList from "./components/properties/PropertyList";
import { getUserId } from "@/app/lib/actions";
import { searchParams } from '@/types'
import BlogList from "./components/blog/BlogList";





const Home = async ({ searchParams }: { searchParams: searchParams }) => {
  const userId = await getUserId();


  return (
    <main className="w-full mx-auto bg-grayMedium">
      <Categories />
      <PropertyList />
      <Banner/>
      <BlogList/>
      <ContactAdminButton userId={userId} />
    </main>
  );
};

export default Home;
