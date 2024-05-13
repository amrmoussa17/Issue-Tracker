"use client"
import Link from "next/link"
import React from "react"
import { AiFillBug } from "react-icons/ai"
import { usePathname } from "next/navigation"
import classNames from "classnames"
import { useSession } from "next-auth/react"
import { Box, Container, Flex } from "@radix-ui/themes"

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ]
  const currentPath = usePathname()
  const { data: session, status } = useSession()
  return (
    <nav className="border-b px-5 mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6 ">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">logout</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
