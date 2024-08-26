"use client";

import {
	AppShell,
	Box,
	Burger,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { AdminHeader } from "@/components/Headers/AdminHeader";
import { Navbar } from "@/components/Navbar/Navbar";
import { navLinks } from "@/config";
import AsideComponent from "@/components/Aside/AsideComponent";

interface Props {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
	const [opened, { toggle }] = useDisclosure();
	const { colorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	const isSmallScreen = useMediaQuery("(max-width: 768px)");
	const bg =
		colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0];

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			aside={{
				width: 250,
				breakpoint: "sm",
				collapsed: { mobile: true },
				// Adjust top position based on header height
			}}
			padding="md"
			transitionDuration={500}
			transitionTimingFunction="ease"
		>
			<AppShell.Navbar
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					height: "100vh",
					backgroundColor:
						colorScheme === "dark"
							? theme.colors.dark[7]
							: theme.colors.navy[6],
				}}
			>
				<Navbar data={navLinks} hidden={!opened} />
			</AppShell.Navbar>
			<AppShell.Header
				style={{ position: "absolute", left: isSmallScreen ? 0 : 300 }}
			>
				<AdminHeader
					burger={
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom="sm"
							size="sm"
							mr="xl"
						/>
					}
				/>
			</AppShell.Header>

			<AppShell.Aside pos={"absolute"} w={{ sm: 60, md: 80, lg: 80 }} p={20}>
				<AsideComponent />
			</AppShell.Aside>
			<AppShell.Main bg={bg}>{children}</AppShell.Main>
			<AppShell.Footer>
				<Text w="full" size="sm" c="gray">
					CopyRight © 2023 Jotyy
				</Text>
			</AppShell.Footer>
		</AppShell>
	);
}
