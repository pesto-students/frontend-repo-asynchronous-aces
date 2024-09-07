import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";

import {
	ColorSchemeScript,
	DirectionProvider,
	MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { spaceGrotesk } from "@/styles/fonts";
import { theme } from "@/styles/theme";
import { AppProvider } from "./provider";
// import { Provider } from "react-redux";
import { store } from "@/redux/store";

export const metadata = {
	metadataBase: new URL("https://mantine-admin.vercel.app/"),
	title: { default: "Mantine Admin", template: "%s | Mantine Admin" },
	description: "A Modern Dashboard with Next.js.",
	keywords: [
		"Next.js",
		"Mantine",
		"Admin",
		"Template",
		"Admin Template",
		"Admin Dashboard",
		"Admin Panel",
		"Admin UI",
	],
	authors: [
		{
			name: "jotyy",
			url: "https://jotyy.vercel.app",
		},
	],
	creator: "jotyy",
	manifest: "https://mantine-admin.vercel.app/site.webmanifest",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en-US">
			<head>
				<ColorSchemeScript />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body className={spaceGrotesk.className}>
				{/* <Provider store={store}> */}
				<DirectionProvider>
					<MantineProvider theme={theme}>
						<ModalsProvider>
							<AppProvider>{children}</AppProvider>
							<Analytics />
						</ModalsProvider>
					</MantineProvider>
				</DirectionProvider>
				{/* </Provider> */}
			</body>
		</html>
	);
}
