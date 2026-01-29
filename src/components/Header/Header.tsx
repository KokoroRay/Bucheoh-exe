import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Header.module.css';
import { 
    FaBars, 
    FaTimes, 
    FaHome, 
    FaInfoCircle, 
    FaBoxOpen, 
    FaNewspaper, 
    FaEnvelope
} from 'react-icons/fa';
import { SearchBox } from '../SearchBox';
import { LanguageSwitcher } from '../LanguageSwitcher';

interface HeaderProps {
    logoSrc?: string;
}

export const Header = ({ logoSrc }: HeaderProps) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
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

    const handleScrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    const handleHomeClick = () => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleProductsClick = () => {
        navigate('/', { state: { scrollToProducts: true } });
    };

    const navItems = [
        { label: t('nav.home'), href: '/', icon: FaHome },
        { label: t('nav.products'), href: '#products', icon: FaBoxOpen },
        { label: t('nav.about'), href: '/about', icon: FaInfoCircle },
        { label: t('nav.blog'), href: '/blog', icon: FaNewspaper },
        { label: t('nav.faq'), href: '/faq', icon: FaInfoCircle },
        { label: t('nav.contact'), href: '/contact', icon: FaEnvelope },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo} onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                    {logoSrc ? (
                        <img src={logoSrc} alt="BUCHAOH Logo" />
                    ) : (
                        <div className={styles.logoText}>
                            <span className={styles.logoMain}>BUCHAOH</span>
                            <span className={styles.logoSub}>Nước Trái Cây Lên Men</span>
                        </div>
                    )}
                </div>

                <nav className={styles.desktopNav}>
                    <ul className={styles.desktopNavList}>
                        {navItems.map((item) => {
                            const isHome = item.href === '/';
                            const isProducts = item.href === '#products';
                            const isExternalLink = item.href.startsWith('#');
                            return (
                                <li key={item.label}>
                                    {isProducts ? (
                                        <button 
                                            onClick={handleProductsClick}
                                            className={styles.navLink}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}
                                        >
                                            {item.label}
                                        </button>
                                    ) : isExternalLink ? (
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleScrollToSection(item.href);
                                            }}
                                            className={styles.navLink}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}
                                        >
                                            {item.label}
                                        </button>
                                    ) : isHome ? (
                                        <button 
                                            onClick={handleHomeClick}
                                            className={styles.navLink}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}
                                        >
                                            {item.label}
                                        </button>
                                    ) : (
                                        <Link to={item.href} className={styles.navLink}>
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Search Box */}
                <div className={styles.searchContainer}>
                    <SearchBox 
                        onSearch={handleSearch} 
                        placeholder={t('ui.search')} 
                    />
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
                        {navItems.map((item) => {
                            const isHome = item.href === '/';
                            const isProducts = item.href === '#products';
                            const isExternalLink = item.href.startsWith('#');
                            return (
                                <li key={item.label}>
                                    {isProducts ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleProductsClick();
                                                setIsMenuOpen(false);
                                            }}
                                            className={styles.navLink}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                                        >
                                            <item.icon className={styles.navIcon} />
                                            <span className={styles.navText}>{item.label}</span>
                                        </button>
                                    ) : isExternalLink ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleScrollToSection(item.href);
                                                setIsMenuOpen(false);
                                            }}
                                            className={styles.navLink}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                                        >
                                            <item.icon className={styles.navIcon} />
                                            <span className={styles.navText}>{item.label}</span>
                                        </button>
                                    ) : isHome ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleHomeClick();
                                                setIsMenuOpen(false);
                                            }}
                                            className={styles.navLink}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                                        >
                                            <item.icon className={styles.navIcon} />
                                            <span className={styles.navText}>{item.label}</span>
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={styles.navLink}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <item.icon className={styles.navIcon} />
                                            <span className={styles.navText}>{item.label}</span>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
