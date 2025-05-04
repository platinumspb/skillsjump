import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="h-10 w-auto relative">
        <Image src="/images/skillsjump-logo.png" alt="Skillsjump" width={150} height={40} className="object-contain" />
      </div>
    </Link>
  )
}
