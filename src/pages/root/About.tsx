import Footer from "../../components/root/Footer";
import Navbar from "../../components/root/Navbar";

const About = () => {
    return (
        <div className="">
            <Navbar />
            <section className=" py-16 px-8 min-h-screen">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">About Rent<span className="text-rose-600">NGo</span></h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Welcome to RentNGo, your premier destination for vehicle rentals. Whether you’re planning a weekend getaway, a business trip, or
                        simply need a vehicle for everyday use, RentNGo is here to provide you with a seamless rental experience. We offer a wide range of
                        vehicles, from compact cars to luxury SUVs, ensuring that you find the perfect ride for your needs.
                    </p>
                    <p className="text-lg text-gray-600 mb-8">
                        At RentNGo, we pride ourselves on our customer-centric approach. Our team is dedicated to making your rental experience as smooth and
                        enjoyable as possible. From our easy online booking system to our flexible rental options, we strive to meet and exceed your expectations.
                        Our fleet is regularly maintained and updated to ensure that you receive a vehicle that is not only reliable but also meets the highest standards
                        of safety and comfort.
                    </p>
                    <p className="text-lg text-gray-600 mb-8">
                        What sets RentNGo apart is our commitment to transparency and affordability. We believe in offering competitive pricing without hidden fees.
                        Our rental packages are designed to provide you with the best value, whether you need a vehicle for a few hours or several weeks.
                        Plus, our friendly support team is always available to assist you with any questions or concerns you may have.
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default About;