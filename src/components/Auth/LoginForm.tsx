"use client";

import { login } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import {
	Anchor,
	Button,
	Card,
	Checkbox,
	Group,
	PasswordInput,
	TextInput,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookie } from "react-use";

export function LoginForm() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [cookie, setCookie] = useCookie("userToken");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSignIn = async () => {
		setLoading(true);
		try {
			const response = await axios.post("/api/auth/login", { email, password });
			if (response.status === 200) {
				const { token } = response.data;
				dispatch(login(token));
				const options = rememberMe
					? { path: "/", maxAge: 30 * 24 * 60 * 60 }
					: { path: "/", maxAge: 3600 };

				setCookie(token, options);
				router.push("/dashboard");
			} else {
				alert("Login failed. Please check your credentials.");
			}
		} catch (error) {
			alert("An error occurred during login. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput
				label="Email"
				placeholder="test@example.com"
				required
				value={email}
				onChange={(event) => setEmail(event.currentTarget.value)}
			/>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				required
				mt="md"
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
			/>
			<Group mt="md" justify="space-between">
				<Checkbox
					label="Remember me"
					checked={rememberMe}
					onChange={(event) => setRememberMe(event.currentTarget.checked)}
				/>
				<Anchor size="sm" href="#">
					Forgot Password?
				</Anchor>
			</Group>
			<Button fullWidth mt="xl" onClick={handleSignIn} loading={loading}>
				Sign In
			</Button>
		</Card>
	);
}
