import React, { Fragment } from 'react'
import './foter.css'
const Footer = () => {
    return (
        <Fragment>
            <footer id="footer-4-cols" className="site-footer">     
                <div id="copyright-information">
                    <div id="footer-logo-section">
                        <>
                        <span className='marcaLogoFirst'>TRAVEL</span>
                        <span className='marcaLogoSecond'>Plans</span>
                        </>
                    </div>
                    <div id="social-buttons">
                        &copy; travel plans. 2022. All rights reserved. 
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer