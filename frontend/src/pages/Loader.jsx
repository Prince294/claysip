import React, {useEffect} from "react";
import { assets } from "../assets/assets";

export default function Loader(props) {
    const { open } = props;

    useEffect(() => {
        if(open){
            window.scrollTo(0, 0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
      }, [open]);
    if(open){
        return (
            <div className="absolute w-full text-xl h-screen flex justify-center items-center top-0 left-0 bg-opacity-70 bg-gray-200 z-[100000] overflow-hidden overflow-y-hidden">
                <div className="w-[150px] h-[150px] flex flex-col gap-3 bg-white justify-center items-center rounded-xl">
                    <img src={assets.loader} className="h-[80px]" />
                    <h2 className="font-bold">Loading...</h2>
                </div>
            </div>
        );      
    } else {
        return <></>; 
    }
}
