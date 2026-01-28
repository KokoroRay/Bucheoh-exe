import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { 
    FaBars, 
    FaTimes, 
    FaHome, 
    FaInfoCircle, 
    FaBoxOpen, 
    FaCog, 
    FaNewspaper, 
    FaEnvelope,
    FaHeart,
    FaStore,
    FaLeaf
} from 'react-icons/fa';
import { SearchBox } from '../SearchBox';
import { LanguageSwitcher } from '../LanguageSwitcher';

interface HeaderProps {
    logoSrc?: string;
}

export const Header = ({ logoSrc }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMenuOpen && !target.closest(`.${styles.nav}`) && !target.closest(`.${styles.hamburger}`)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleSearch = (query: string) => {
        console.log('Searching for:', query);
        // TODO: Implement search functionality
        // Could filter products, blog posts, etc.
    };

    const navItems = [
        { label: 'TRANG CHỦ', href: '#home', icon: FaHome },
        { label: 'GIỚI THIỆU', href: '#about', icon: FaInfoCircle },
        { label: 'SẢN PHẨM', href: '#products', icon: FaBoxOpen },
        { label: 'NƯỚC ÉP TRÁI CÂY', href: '#fruit-juice', icon: FaLeaf },
        { label: 'SẢN PHẨM YÊU THÍCH', href: '#favorites', icon: FaHeart },
        { label: 'CỬA HÀNG', href: '#store', icon: FaStore },
        { label: 'QUY TRÌNH', href: '#process', icon: FaCog },
        { label: 'TIN TỨC', href: '#news', icon: FaNewspaper },
        { label: 'LIÊN HỆ', href: '#contact', icon: FaEnvelope },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    {logoSrc ? (
                        <img src={logoSrc} alt="BUCHAOH Logo" />
                    ) : (
                        <div className={styles.logoText}>
                            <span className={styles.logoMain}>BUCHAOH</span>
                            <span className={styles.logoSub}>Nước Trái Cây Lên Men</span>
                        </div>
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.desktopNavList}>
                        {navItems.slice(0, 6).map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className={styles.navLink}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Search Box */}
                <div className={styles.searchContainer}>
                    <SearchBox onSearch={handleSearch} />
                </div>

                {/* Language Switcher */}
                <div className={styles.languageContainer}>
                    <LanguageSwitcher />
                </div>

                {/* Hamburger Button */}
                <button
                    className={styles.hamburger}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Navigation */}
                <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className={styles.navLink}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <item.icon className={styles.navIcon} />
                                    <span className={styles.navText}>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
