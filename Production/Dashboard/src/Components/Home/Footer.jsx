import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

const FooterLink = ({ href, children }) => (
    <a
        href={href}
        className="text-gray-300 hover:text-white transition-colors duration-200"
    >
        {children}
    </a>
);

const SocialIcon = ({ href, Icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
    >
        <Icon size={20} />
    </a>
);

const Footer = ({ data }) => {
    if (!data) {
        return null;
    }

    const { phone, email, facebook, instagram, linkedin } = data;

    return (
        <footer className="bg-gray-900 text-gray-300 pb-16">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                    {/* About Us */}
                    {/* <div>
                        <h3 className="text-xl font-semibold mb-4 w-[50%]">
                            About Us
                        </h3>
                        <p className="text-gray-400">
                            We are a premier institution committed to
                            excellence, delivering innovative solutions, and
                            empowering communities.
                        </p>
                    </div> */}

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Liens rapides{" "}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <FooterLink href="/Home">Home</FooterLink>
                            </li>

                            <li>
                                <FooterLink href="/Home/Contact">
                                    Contact Page
                                </FooterLink>
                            </li>

                            <li>
                                <FooterLink href="/Home/Demand">
                                    Demade
                                </FooterLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Contactez nous
                        </h3>
                        <div className="space-y-2 text-gray-400">
                            {phone && (
                                <a
                                    href={`tel:${phone}`}
                                    className="flex items-center space-x-2"
                                >
                                    <FaPhoneAlt className="text-blue-500" />
                                    <span>{phone}</span>
                                </a>
                            )}
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center space-x-2"
                                >
                                    <FaEnvelope className="text-green-500" />
                                    <span>{email}</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Follow Us
                        </h3>
                        <div className="flex justify-center space-x-4">
                            {facebook && (
                                <SocialIcon
                                    href={
                                        "https://www.facebook.com/" + facebook
                                    }
                                    Icon={FaFacebookF}
                                />
                            )}
                            {instagram && (
                                <SocialIcon
                                    href={
                                        "https://www.instagram.com/" + instagram
                                    }
                                    Icon={FaInstagram}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} Vide Maison Belgique.
                        Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
