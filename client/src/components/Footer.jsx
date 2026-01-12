import "./Footer.css";

export const Footer = () =>
{
    return(
    <>
 <div>
      <footer className="foot">
        <p>© 2024 Surplus Food Management System. All Rights Reserved.</p>
        <div className="contact-info">
          <p>📍 Address: 504107 Rgukt Campus, Nirmal, India</p>
          <p>📞 Phone: +91-6304731004</p>
          <p>✉️ Email: <a href="mailto:contact@surplusfoodmanagementsystem@gmail.com">contact@yourcompany.com</a></p>
        </div>
        <ul className="footer-links">
          <li>
            <a href="/Login.jsx">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Our Mission</a>
          </li>
          <li>
            <a href="#">Our Vision</a>
          </li>
        </ul>
      </footer>
    </div>
    </>
    );
};