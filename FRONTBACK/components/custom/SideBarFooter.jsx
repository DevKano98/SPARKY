import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function SideBarFooter() {
  const options = [
    {
      name: "Setting", 
      icon: Settings },
    { 
        name: "Help Center", 
        icon: HelpCircle 
    },
    { 
        name: "Subscription", 
        icon: Wallet 
    },
    { 
        name: "Log Out", 
        icon: LogOut 
    },
  ];

  return (
    <div className="p-5 mb-10">
      {options.map((option, index) => (
        <Button key={index} variant="ghost" className='w-full flex justify-start my-3' >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
