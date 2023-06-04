import { children } from 'cheerio/lib/api/traversing';
import React from 'react';

export default function ChatLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
    <>
        <div className="container mx-auto mt-160">
            <div className="py-6 lg:py-12 px-1 mt-28">
                <div className="container mx-auto">
                    <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
                        <span>
                        Home / Chat
                        </span>
                    </div>
                </div>
            </div>
        </div>
        {children}
      </>
    );
  }
