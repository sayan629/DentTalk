import Image from "next/image"
import Link from "next/link"


function Header() {
  return <nav className="fixed top-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href= "/" className="flex items-center gap-2">
        <Image src={"/logo.png"} alt="DentTalk Logo" width={32} height={32} className="w-11"/>
        <span className="font-semibold text-lg">DentTalk</span>
        </Link>
    </div>
    </nav>
  
}

export default Header