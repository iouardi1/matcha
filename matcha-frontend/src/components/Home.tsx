import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { SparklesCore } from "./ui/sparkles";
import {
  IconBrandTinder
} from "@tabler/icons-react";

export function Home() {



  const router = useRouter()

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <nav className="text-white absolute top-0 left-0 w-full z-10 flex justify-between p-5">
          <div className="flex items-center">
            <IconBrandTinder color="#fd5564" fill="#fd5564" size={50}/>
            <h1 className="md:text-7xl text-3xl lg:text-3xl font-bold">Matcha</h1>
          </div>
          <div>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg  bg-zinc-100" onClick={() => router.push("/auth/login")}>Log in</button>
          </div>
      </nav>

      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Find your match
      </h1>
      <div className="mt-5 z-30">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-zinc-100" onClick={() => router.push("/auth/register")}>Create account</button>
      </div>
    </div>
  );
}
