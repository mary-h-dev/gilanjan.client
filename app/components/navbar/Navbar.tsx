
import Image from 'next/image';
import Link from 'next/link';


import SearchFilters from './SearchFilters';
import UserNav from './UserNav';
import { getUserId } from '@/app/lib/actions';
import AddPropertyButton from './AddPropertyButton';



const Navbar = async () => {
    const userId = await getUserId();

    // console.log('userId:', userId);

    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b-2 border-airbnbb bg-white z-40">
            <div className="max-w-[1500px] mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/logo.jpeg"
                            alt="DjangoBnb logo"
                            width={60}
                            height={10}
                        />
                    </Link>

                    <div className="flex mx-2">
                        <SearchFilters />
                    </div>

                    <div className="flex items-center space-x-4">
                        <AddPropertyButton 
                            userId={userId}
                        /> 
                        <UserNav 
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;