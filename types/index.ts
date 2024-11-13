export  interface MenuLinkProps {
    label: string;
    onClick: () => void;
}


export interface UserNavProps {
    userId?: string | null;
}


export interface CustomButtonProps {
    label: string | React.ReactElement; 
    className?: string;
    onClick: () => void;
}


// modals
export interface ModalProps {
    label: string; 
    close: () => void; 
    content: React.ReactElement; 
    isOpen: boolean; 
}

export interface SignupModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export interface LoginModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}


export type SearchQuery = {
    country?: string; 
    checkIn: Date | null;
    checkOut: Date | null;
    guests: number; 
    // bathrooms: number; 
    buildingsmeter: number,
    floorareameters: number,
    bedrooms: number; 
    category: string;
}


export interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}



export interface AddPropertyModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}


export type PropertyType = {
    id: string;
    title: string;
    image_urls: string[];
    price_per_night: number;
    is_favorite: boolean;
}



export interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

export interface PropertyProps {
    property: PropertyType,
    markFavorite?: (is_favorite: boolean) => void;

}



export type Property ={
    id: string;
    guests: number;
    price_per_night: number;
}


export interface ReservationSidebarProps {
    userId: string | null,
    property: Property
}


export interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}



export interface AddPropertyButtonProps {
    userId?: string | null;
}


export type SelectCountryValue = {
    label: string;
    value: string;
}

export interface SelectCountryProps {
    value?: SelectCountryValue;
    onChange: (value: SelectCountryValue) => void;
}

export type SelectProvinceValue = {
    label: string;
    value: string;
  };

  
export interface DayValue {
    year: number;
    month: number;
    day: number;
  }


export interface AuthStore {
    isLoggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
}




export type layoutProps = {
    isOpenSort: boolean
    isOpenFilter: boolean
    isOpenSideBar: boolean
    sliders: Record<string, any>
  }


export type drawerType = 'sort' | 'filter'
export type toggle = () => void
export type close = () => void
  

export type filter = {
    name: string
    type: string
    faName: string
    items: filterItem[]
  }
  

export type filterItem = {
    name: string
    faName: string
    value: string
  }




export type searchParams = {
    [key: string]: any
 }
  
  