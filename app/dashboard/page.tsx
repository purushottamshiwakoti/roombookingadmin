import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import prismadb from "@/libs/prismadb";
import Image from "next/image";

const page = async () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("signin");
  if (theme?.value !== "superadmin") {
    redirect("/");
  }
  const bookings = await prismadb.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      hotel: true,
    },
  });
  console.log(bookings);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-10 grid grid-cols-3">
          {bookings.map((item) => (
            <div key={item.id} className="shadow-lg p-10 rounded-xl">
              <div className="image-container" style={{ height: "200px" }}>
                <img
                  src={item.hotel.image}
                  alt={item.hotel.image}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="p-5 text-lg font-semibold">
                <h2>{item.hotel.name}</h2>
                <h2>Location: {item.hotel.location}</h2>
                <h2>Number of Beds: {item.hotel.numberOfBeds}</h2>
                <h2>Booked By: {item.user.fullName}</h2>
                <h2>
                  Booked at: {JSON.stringify(item.createdAt).split("T")[0]}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
