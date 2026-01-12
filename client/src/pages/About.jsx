// import { Navbar } from "../components/Navbar";
import "./About.css";
export const About = () =>{
    return(<>
       <section className="section-aboutus" >
        <main>
            <div className="container grid grid-two-cols">
                {/* <div className="aboutus-image">
                    <img src="/images/aboutus.png" alt="about us image"/>
                </div> */}
                <div className="about">
                  <h2>About Us</h2>
                    <p>Welcome to Surplus Food Management, a platform dedicated to reducing food waste and fighting hunger by connecting businesses with surplus food to charitable organizations. Our mission is simple but powerful: "No Food Should Go to Waste."</p>
                    <p>We are a passionate team of innovators, food lovers, and problem-solvers who believe that surplus food can create meaningful impact when shared. By leveraging technology, data, and community partnerships, we strive to bridge the gap between surplus food producers and those in need.</p>
                </div>
            </div>
            <div className='back'>
      <div className="mission">
        <h2>Our Mission</h2>
        <p>
          Our Mission is to reduce food waste by connecting food establishments with charitable organizations. We facilitate the redistribution of surplus food to those in need, addressing hunger while minimizing waste and promoting sustainability.
        </p>
        <p>
          We aim to streamline food redistribution through technology, ensuring real-time communication between food establishments and charities. Our platform efficiently matches surplus food with charity needs, making the donation process quicker and more reliable.
        </p>
        <p>
          By tracking the impact of food donations, we aim to raise awareness of food security. Our mission is to empower businesses to participate in reducing food waste and making a tangible difference.
        </p>
      </div>
      <br /><br />
      <div className="mission">
        <h2>Our Vision</h2>
        <p>
          Our Vision is to create a world where surplus food is no longer wasted but redistributed to those in need, ensuring sustainability, reducing food insecurity, and promoting a balanced, compassionate global community.
        </p>
        <p>
          We aim to be a leader in innovative food redistribution solutions, using technology to connect food establishments with charities in real-time. Our vision is to bridge gaps and optimize resources efficiently.
        </p>
        <p>
          Through partnerships and innovation, we envision a future where food waste is minimized, hunger is alleviated, and communities thrive, driven by collaboration, compassion, and a commitment to sustainable practices.
        </p>
      </div>
      </div>
        </main>
       </section>
    </>
    );
};