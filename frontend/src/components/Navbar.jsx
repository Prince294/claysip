import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [hasShadow, setHasShadow] = useState(false);
    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, toggleSidebar } = useContext(ShopContext);

    const [cartRoute, setCartRoute] = useState('/cart');

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHasShadow(true);
            } else {
                setHasShadow(false);
            }
        };

        if (!token) {
            setCartRoute('/login')
        }

        window.addEventListener("scroll", handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }




    return (


        <div className={`h-[120px] fixed w-full top-0 left-0 z-50 flex items-center justify-between p-2 font-medium px-4 md:px-6 xl:px-12 bg-lightstone ${hasShadow ? "shadow-lg" : ""}`}>

            <Link to='/'><img src={assets.logo} className='-ml-2 w-28 md:w-32' alt="" /></Link>

            <ul className='hidden sm:flex gap-8 text-sm text-secondary'>

                <NavLink to='/' className='flex flex-col items-center gap-1 hover:text-primary'>
                    <p>HOME</p>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 hover:text-primary'>
                    <p>COLLECTION</p>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 hover:text-primary'>
                    <p>ABOUT</p>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 hover:text-primary'>
                    <p>CONTACT</p>
                </NavLink>

            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                    {/* Dropdown Menu */}
                    {token &&
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5bg-slate-100 text-gray-500 rounded'>
                                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>}
                </div>
                {cartRoute !== "/cart" ?
                    <div className='relative cursor-pointer' onClick={() => {
                        if (cartRoute !== "/cart") {
                            toggleSidebar(true);
                        }
                    }}>
                        <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-primary text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </div>
                    :
                    <Link to={cartRoute} className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>}
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

              {/* Sidebar menu for small screens */}
              <div className={`z-[99] absolute top-0 right-0 bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-3 cursor-pointer'>
                        <img className='h-4 rotate-90' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 text-base text-secondary capitalize' to='/'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 text-base text-secondary capitalize' to='/collection'>Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 text-base text-secondary capitalize' to='/about'>About</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 text-base text-secondary capitalize' to='/contact'>Contact</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
