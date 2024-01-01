import React from "react";

const Home = () => {
  return (
    <div className="bg-black text-white flex flex-col gap-10 items-center pt-48 min-h-[90vh]">
      <div className="flex flex-col items-center text-xl">
        <h1>Worrying about </h1>
        <h1>missing out your contacts?</h1>
        <h1>We got you</h1>
      </div>
      <h1 className="text-4xl font-bold">Keeper</h1>
      <div className="flex flex-col items-center text-xl">
        <h1>Your digital Phonebook</h1>
      </div>
    </div>
  );
};

export default Home;
