"use client";

import { Box, ScrollArea } from "@mantine/core";

import { UserButton } from "@/components/UserButton/UserButton";
import type { NavItem } from "@/types/nav-item";
import { NavLinksGroup } from "./NavLinksGroup";
import classes from "./Navbar.module.css";
import { Logo } from "../Logo/Logo";
import { useEffect, useState } from "react";

interface Props {
	data: NavItem[];
	hidden?: boolean;
}

export function Navbar({ data }: Props) {
	const [selected, setSelected] = useState<string | null>(null);

	useEffect(() => {
		const savedSelection = localStorage.getItem("selectedNavLink");
		setSelected(savedSelection || "Dashboard");
	}, []);
	const handleLinkClick = (label: string) => {
		setSelected(label);
		localStorage.setItem("selectedNavLink", label);
	};
	const links = data.map((item) => (
		<NavLinksGroup
			key={item.label}
			{...item}
			isSelected={selected === item.label}
			linkClicked={handleLinkClick}
		/>
	));

	return (
		<>
			<Box p="md">
				<Logo variant="light" size="2.5rem" />
			</Box>
			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>

			<div className={classes.footer}>
				<UserButton
					image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
					name="Harriette"
					email="hspoon@outlook.com"
				/>
			</div>
		</>
	);
}
