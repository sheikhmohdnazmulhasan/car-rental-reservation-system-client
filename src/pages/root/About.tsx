import Footer from "../../components/root/Footer";
import Navbar from "../../components/root/Navbar";

const About = () => {
    return (
        <div className="">
            <Navbar />
            <div data-aos='fade-left'>
                {/* Header Section */}
                <header className="bg-rose-600 text-white py-6">
                    <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-4xl font-bold">About Us</h1>
                    </div>
                </header>

                {/* Company History Section */}
                <section className="bg-gray-100 py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our History</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            RentNGo was founded in 2k24 with a mission to provide accessible, affordable, and reliable vehicle rental services.
                            Our vision is to become the leading choice for customers seeking a hassle-free and seamless rental experience. Over the years,
                            we have grown our fleet and expanded our services to meet the evolving needs of our customers.
                        </p>
                    </div>
                </section>

                {/* Our Fleet Section */}
                <section className="bg-gray-100 py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Fleet</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            At RentNGo, we offer a wide variety of vehicles to meet your specific needs. Whether you're looking for an economical option,
                            a luxury ride, or an SUV for a family trip, our fleet has you covered. Each vehicle is regularly maintained to ensure safety,
                            comfort, and reliability.
                        </p>
                        <ul className="list-disc list-inside text-gray-600">
                            <li>Economy Cars</li>
                            <li>Luxury Vehicles</li>
                            <li>SUVs</li>
                            <li>Vans and Minivans</li>
                            <li>Trucks</li>
                        </ul>
                    </div>
                </section>

                {/* Values & Commitment Section */}
                <section className="bg-white py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Values & Commitment</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            Our commitment to customer service is at the heart of everything we do at RentNGo. We believe in transparency,
                            sustainability, and delivering value to our customers. Our team is dedicated to providing excellent service and ensuring
                            that every rental experience is positive and stress-free.
                        </p>
                        <p className="text-lg text-gray-600 mb-4">
                            We are also committed to sustainability and constantly seek ways to minimize our environmental impact. Our fleet includes
                            eco-friendly vehicles, and we are continuously working to incorporate sustainable practices in our operations.
                        </p>
                    </div>
                </section>

                {/* Contact Information Section */}
                <section className="bg-gray-100 py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Information</h2>
                        <p className="text-lg text-gray-600 mb-2">
                            Phone: <a href="tel:+1234567890" className="text-rose-600">+880 1232-454255</a>
                        </p>
                        <p className="text-lg text-gray-600 mb-2">
                            Email: <a href="mailto:support@rentngo.com" className="text-rose-600">support@rentngo.com</a>
                        </p>
                        <p className="text-lg text-gray-600">
                            Address: 123 RentNGo HQ, Rangpur, Bangladesh
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default About;