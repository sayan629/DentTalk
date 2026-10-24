
"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Navbar() {
    const {user} = useUser();
    const pathname = usePathname();
  return <div>Navbar</div>

}

export default Navbar