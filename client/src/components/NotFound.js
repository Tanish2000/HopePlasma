import React from 'react';
import NotFoundGif from '../images/not_found.gif';

const NotFound = () => {
    const styles = {
        container: {
            minHeight: '70vh',
            fontFamily: "'Satisfy', cursive",
            backgroundImage: 'linear-gradient(to left, #eaced9, #f3d6d5, #f5e1d6, #f3ecdd, #f1f6e9)',
            textShadow: '0px 15px 5px rgba(0,0,0,0.1),10px 20px 5px rgba(0,0,0,0.05),-10px 20px 5px rgba(0,0,0,0.05)'
        }
    }
    return (
        <div style={styles.container} className="p-4 d-flex align-items-center justify-content-center">
            <div className="container mx-auto d-flex flex-column align-items-center h-75 justify-content-center p-5 shadow-lg">
                <img src={NotFoundGif} style={{ width: '50%', height: 'auto' }} alt="not_found" />
                <h1>Sorry</h1>
                <h2>404- Page Not found</h2>
            </div>
        </div>
    )
}

export default NotFound
