import React from 'react';
import BillSystem from '../BillSystem/BillSystem';
import Navbar from '../Share/Navbar/Navbar';

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <BillSystem></BillSystem>
        </>
    );
};

export default Home;