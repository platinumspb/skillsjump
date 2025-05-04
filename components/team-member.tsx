import Image from "next/image"
import Link from "next/link"
import { Linkedin, Facebook, Globe } from "lucide-react"

interface TeamMemberProps {
  name: string
  position: string
  image: string
  bio: string
  linkedin?: string
  facebook?: string
  website?: string
  hexagon?: boolean
}

export default function TeamMember({
  name,
  position,
  image,
  bio,
  linkedin,
  facebook,
  website,
  hexagon = false,
}: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`relative h-64 w-full bg-gray-100 ${hexagon ? "flex items-center justify-center" : ""}`}>
        {hexagon ? (
          <div
            className="relative w-48 h-48 overflow-hidden"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-blue-500 font-medium mb-3">{position}</p>
        <p className="text-gray-600 mb-4">{bio}</p>

        <div className="flex space-x-3">
          {linkedin && (
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-500 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          )}

          {facebook && (
            <Link
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-500 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </Link>
          )}

          {website && (
            <Link
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-500 transition-colors"
            >
              <Globe className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
