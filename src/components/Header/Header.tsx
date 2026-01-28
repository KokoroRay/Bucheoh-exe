import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

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

    const navItems = [
        { label: 'SẢN PHẨM', href: '#products' },
        { label: 'VỀ GIỚI THIỆU', href: '#about' },
        { label: 'BLOG', href: '#blog' },
        { label: 'LIÊN HỆ', href: '#contact' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    {logoSrc && <img src={logoSrc} alt="FPT Polytechnic Logo" />}
                </div>

                {/* Hamburger Button */}
                <button
                    className={styles.hamburger}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Navigation */}
                <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className={styles.navLink}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
