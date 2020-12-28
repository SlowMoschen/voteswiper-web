import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import cn from 'classnames';
import Button from 'components/button';
import { useWindowScroll } from 'react-use';
import Container from '../container';
import styles from './header.module.css';
import WahlSwiperLogo from 'icons/wahlswiper_logo.svg';
import IconToggle from 'icons/navigation.svg';
import IconClose from 'icons/close.svg';
import navItems from './data';
import MobileNav from './mobile-nav';

const HEADER_THRESHOLD = 30;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileNavOpened, setMobileNavVisibility] = React.useState(false);
  const { y } = useWindowScroll();
  const { t } = useTranslation('header');

  React.useEffect(() => {
    if (y > HEADER_THRESHOLD && scrolled === false) {
      setScrolled(true);
    } else if (y <= HEADER_THRESHOLD && scrolled === true) {
      setScrolled(false);
    }
  }, [y, scrolled]);

  return (
    <>
      <header
        className={cn(
          styles.header,
          'fixed z-50 w-screen flex items-center transition-all print:hidden border-b border-black border-opacity-10 lg:border-0',
          scrolled
            ? 'h-16 bg-brand-primary bg-opacity-75 duration-500'
            : 'h-16 lg:h-32 lg:pt-12 duration-200 bg-brand-primary lg:bg-transparent',
          scrolled && styles.scrolled
        )}
      >
        <Container className="flex items-center">
          <button
            aria-label={t('toggle')}
            onClick={() => {
              setMobileNavVisibility(!mobileNavOpened);
            }}
            className="h-10 ring-1 ring-inset ring-opacity-20 hover:ring-opacity-40 ring-white mr-3 rounded-lg w-10 flex lg:hidden items-center justify-center focus-default"
          >
            {mobileNavOpened ? (
              <IconClose className="h-5 w-auto text-white" />
            ) : (
              <IconToggle className="h-5 w-auto text-white" />
            )}
          </button>
          <Link passHref href="/">
            <a className="text-white font-normal text-base lg:text-3xl flex items-center rounded focus-default">
              <WahlSwiperLogo className="h-5 lg:h-8 mr-2 lg:mr-3 w-auto" />
              {t('common:name')}
            </a>
          </Link>

          <div className="hidden lg:flex flex-1 items-center justify-between pl-8">
            <nav>
              <ul className="flex">
                {navItems.map((item) => (
                  <li className="px-3" key={item.text}>
                    <Link href={item.href} passHref>
                      <a
                        className={cn(
                          styles.link,
                          'font-medium inline-block text-white text-sm relative cursor-pointer rounded focus-default'
                        )}
                      >
                        {t(item.text)}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Button color="outline">Deutsch</Button>
          </div>
          <Button className="ml-auto lg:ml-2">
            <span className="lg:hidden">{t('app')}</span>
            <span className="hidden lg:inline">{t('download')}</span>
          </Button>
        </Container>
      </header>
      <MobileNav open={mobileNavOpened} setNav={setMobileNavVisibility} />
    </>
  );
};

export default Header;
