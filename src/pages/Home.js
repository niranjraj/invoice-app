import React from 'react'
import Wrapper from '../components/shared/Wrapper'; 
import {Header} from '../components/home/Header';
import InvoiceList from "../components/home/InvoiceList";
function Home() {
    return (
        <>
        <Wrapper>
        <Header />
        <InvoiceList/>
        </Wrapper>
        </>
    )
}

export default Home
