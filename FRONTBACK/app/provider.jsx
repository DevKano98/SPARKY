"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/custom/AppSideBar";

function Provider({ children }) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const convex = useConvex();
  const pathname = usePathname() || '';

  useEffect(() => {
    IsAuthenticated();
  }, []);
  
  const IsAuthenticated = async () => {
    if (typeof window !== 'undefined') {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) return;
        
        const user = JSON.parse(userString);
        
       
        const dbUser = await convex.query(api.users.GetUser, {
          email: user.email
        });
        
        if (dbUser) {
          console.log("User loaded from DB:", dbUser);
          setUserDetail(dbUser);
        } else {
   
          setUserDetail(user);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  };
  
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
                <AppSideBar />
                <div className="flex flex-col w-full">
                  {/* Do not show the default Header on the landing page (/) */}
                  {pathname !== '/' && <Header />}
                  {children}
                </div>
              </SidebarProvider>
          </NextThemesProvider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Provider;