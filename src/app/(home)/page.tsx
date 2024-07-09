'use client'
import HouseButton from "@/components/buttons/houseButton";
import { arapey } from "./fonts";
import Heading from "@/components/heading/heading";
import Image from "next/image";
import TextCard from "@/components/cards/textCard";
import OwlPost from "@/components/form/owlpost";
import styles from './home.module.css'
import UsersList from "@/components/testfetch";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await fetch('http://localhost:8080/userLoggedIn', {
          credentials: 'include'
      });
      const data = await response.json();
      console.log(data)
      return data;
  };

    fetchCsrfToken();
}, []);
  return (
    <>
<UsersList />

      <div className="flex gap-20 mt-40 justify-center items-center">
        <div className=" w-96 h-96 flex overflow-hidden items-center justify-center">
          <Image className="h-full w-full" width={200} height={200} src={'/images/homefeed/letter.jpg'} alt="letter" />
        </div>
        <div className="w-1/4 text-center ">

          <Heading />
          <p className="opacity-70 mb-2">Lorem ipsum dolor sit amet consectetur. Integer est vitae amet </p>
          <p className="opacity-55">Lorem ipsum dolor sit amet consectetur. Integer est vitae amet aenean quis in eget. Eu consequat tristique lacus massa volutpat. Massa tellus aenean sit imperdiet. Gravida quisque massa mi i</p>

        </div>

        <div className=" w-96 h-96 flex overflow-hidden items-center justify-center">
          <Image width={200} height={200} className="h-full w-full" src={'/images/homefeed/castle.jpg'} alt="letter" />
        </div>


      </div>
      <div className="relative ">
        <div className="bg-quidditch h-72 w-full bg-cover bg-center mt-40 "></div>
        <div className="absolute inset-0 gap-2 bg-opacity-40 bg-black flex flex-col justify-center items-center ">
          <h1 className={`mb-5 ${arapey.className}`}>NEWEST SEASON OF QUIDDITCH <br></br> ARE HERE!</h1>
          <p >WANT TO TRYOUT? </p>
          <HouseButton />
        </div>

      </div>
      <div className=" mt-40">
        <Heading />
        <div className="flex gap-20 mt-10 justify-center items-start">
      <TextCard
        imageSrc="/images/homefeed/mcgonagall.webp"
        date="May 10, 2024"
        title="McGonagall Retires"
        description="Lorem ipsum dolor sit amet consectetur. Integer est vitae amet aenean quis Integer est vitae amet aenean quis in eget. Eu consequat tristique"
      />
      <TextCard
        imageSrc="/images/homefeed/letter.jpg"
        date="May 18, 2024"
        title="New Age Group Got Their Letter"
        description="Lorem consectetur. Integer est vitae amet quis in eget. Eu consequat tristique"
      />
      <TextCard
        imageSrc="/images/homefeed/ollivanders.jpg"
        date="May 28, 2024"
        title="Ollivanders Open for Business"
        description="Lorem ipsum dolor sit amet consectetur. Integer est vitae amet aenean quis in eget. Eu consequat tristique"
      />
    </div>
      </div>


      <OwlPost />

    </>);
}

export default Home;