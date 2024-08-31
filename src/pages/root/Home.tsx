import Cta from "../../components/home/CTA";
import Featured from "../../components/home/Featured";
import { Hero } from "../../components/home/Hero";
import HotRides from "../../components/home/HotRides";
import Team from "../../components/home/Team";
import Testimonial from "../../components/home/Testimonial";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Navbar from "../../components/root/Navbar";

const Home = () => {
    return (
        <div className="">
            <Navbar />
            <Hero />
            <div className="">
                <Featured />
                <div className="">
                    <HotRides />
                </div>
                <div className="mt-10">
                    <Cta />
                </div>

                <div className="">
                    <WhyChooseUs />
                </div>
                <div className="">
                    <Team />
                </div>
                <div className="">
                    <Testimonial />
                </div>
            </div>
        </div>
    );
};

export default Home;