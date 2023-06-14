import React from 'react';
import Highlight from './Highlight';
import Benefits from './benefits';

export default function Landing() {
  return (
    <div className="mx-auto flex max-w-[1356px] flex-col">
      <Highlight />
      <div className=" flex min-h-screen  bg-grey-#6">
        <Benefits />
      </div>
    </div>
  );
}
