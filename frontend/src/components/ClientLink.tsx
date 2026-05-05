"use client";

import Link from "next/link";

export const ClientLink = (props: Parameters<typeof Link>[0]) => {
 return <Link {...props} />
}
