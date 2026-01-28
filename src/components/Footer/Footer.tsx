import styles from './Footer.module.css';
// 1. Import các icon cần thiết
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Section - Cập nhật text */}
                    <div className={styles.brandSection}>
                        <h3 className={styles.brandName}>BUCHAOH</h3>
                        <p className={styles.brandTagline}>Nước Trái Cây Lên Men Từ Men Vi Sinh</p>
                        <p className={styles.description}>
                            Sản phẩm nước trái cây lên men tự nhiên với men vi sinh có lợi, 
                            mang đến giải pháp chăm sóc sức khỏe và thân thiện với môi 
                            trường.
                        </p>
                    </div>

                    {/* Quick Links - Mở rộng menu */}
                    <div className={styles.linksSection}>
                        <h4 className={styles.sectionTitle}>LIÊN KẾT NHANH</h4>
                        <ul className={styles.linksList}>
                            <li><a href="#products" className={styles.link}>Sản phẩm</a></li>
                            <li><a href="#about" className={styles.link}>Về chúng tôi</a></li>
                            <li><a href="#favorites" className={styles.link}>Yêu thích</a></li>
                            <li><a href="#store" className={styles.link}>Cửa hàng</a></li>
                            <li><a href="#blog" className={styles.link}>Blog</a></li>
                            <li><a href="#contact" className={styles.link}>Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Contact Info - Đã thay icon */}
                    <div className={styles.contactSection}>
                        <h4 className={styles.sectionTitle}>LIÊN HỆ</h4>
                        <ul className={styles.contactList}>
                            <li className={styles.contactItem}>
                                <span className={styles.contactIcon}><MdLocationOn /></span>
                                <span>Cần Thơ, Việt Nam</span>
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.contactIcon}><MdEmail /></span>
                                <span>contact@buchaoh.vn</span>
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.contactIcon}><MdPhone /></span>
                                <span>+84 123 456 789</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links - Đã thay icon */}
                    <div className={styles.socialSection}>
                        <h4 className={styles.sectionTitle}>Theo dõi chúng tôi</h4>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialLink} aria-label="Facebook">
                                <span className={styles.socialIcon}><FaFacebookF /></span>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram">
                                <span className={styles.socialIcon}><FaInstagram /></span>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="YouTube">
                                <span className={styles.socialIcon}><FaYoutube /></span>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Zalo">
                                <span className={styles.socialIcon}><SiZalo /></span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                {/* Bottom Section */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>© {currentYear} BUCHAOH - Nước Trái Cây Lên Men Tự Nhiên</p>
                    <p className={styles.credits}>Made with ❤️ by BUCHAOH Team</p>
                </div>
            </div>
        </footer>
    );
};