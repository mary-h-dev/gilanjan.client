
import Link from "next/link"
import {
    contactUs,
    footerLinkOne,
    footerLinksTwo,
} from "../../constants/data"
import MobileFooterMenu from "./MobileFooterMenu"
import FooterImages from "./FooterImages"
import QuestionLinks from "./QuestionLinks"
import ContactUs from "./ContactUs"



const Footer = () => {
    return (
        <footer className="w-full z-50 fixed bottom-0 start-0 md:static bg-primary-two py-4 md:py-10 md:shadow-footerShadow">
            <section className="container">
                <div className="hidden md:block">

                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-10 lg:grid-cols-4 place-items-center md:items-start">
                        <FooterImages />
                         <QuestionLinks data={footerLinkOne} />
                        <QuestionLinks data={footerLinksTwo} /> 
                        <ContactUs data={contactUs} /> 
                    </div>
                    <hr className="block mx-auto w-3/4 my-4 border-t-2 border-gray-300"/>
                    <p className="text-center text-sm mt-10 text-gray-500">
                        تمامی حقوق سایت محفوظ می باشد.
                    </p>
                </div>
                <MobileFooterMenu />
            </section>

        </footer>
    )
}

export default Footer