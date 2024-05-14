"use client"
import Link from "next/link"
import React from "react"
import { AiFillBug } from "react-icons/ai"
import { usePathname } from "next/navigation"
import classNames from "classnames"
import { useSession } from "next-auth/react"
import {
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
  Avatar,
} from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton"

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
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    size="3"
                    src={session.user?.image!}
                    fallback="?"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session!.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">login</Link>
            )}
            {status === "loading" && <Skeleton width="3rem" />}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
