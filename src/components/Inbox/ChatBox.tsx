"use client";
import {
	Box,
	Button,
	Divider,
	Grid,
	GridCol,
	Group,
	Image,
	Paper,
	Stack,
	Text,
	TextInput,
	useMantineTheme,
	FileInput,
	Flex,
	Textarea,
} from "@mantine/core";
import {
	IconMail,
	IconPhone,
	IconRecordMail,
	IconX,
} from "@tabler/icons-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { InlineWidget, PopupButton, PopupWidget } from "react-calendly";

const isRecruiter = true;
// Type Definitions
type User = {
	userId: number;
	name: string;
};

type Attachment = {
	name: string;
	url: string;
};

interface Chat {
	chatId: number;
	receiver: Profile;
	messages: {
		msgNum: number;
		text: string;
		attachments: Attachment[];
		links: string[];
		sender: User;
	}[];
}

interface Profile {
	userId: number;
	name: string;
	avatar: string;
	job: string;
	email: string;
	phone: string;
	calendyUserName: string;
}

// Mock Data
const mockChats: Chat[] = [
	{
		chatId: 1,
		receiver: {
			userId: 6,
			name: "Mihir Gadhe",
			job: "Senior UIX Designer",
			avatar: "https://example.com/avatar-mihir.jpg",
			email: "gadhemihir96@gmail.com",
			phone: "9637059439",
			calendyUserName: "gadhemihir96",
		},
		messages: [
			{
				msgNum: 1,
				text: "Heyy Vardhan",
				attachments: [],
				links: [],
				sender: { userId: 6, name: "Mihir" },
			},
			{
				msgNum: 2,
				text: "Hi Mihir, let's catch up",
				attachments: [],
				links: [],
				sender: { userId: 1, name: "Vardhan" },
			},
		],
	},
];

// Main ChatBox Component
const ChatBox = () => {
	const theme = useMantineTheme();
	const [chats, setChats] = useState<Chat[]>(mockChats);
	const [newMessage, setNewMessage] = useState("");
	const [newAttachments, setNewAttachments] = useState<Attachment[]>([]);
	const [newLinks, setNewLinks] = useState<string[]>([]);
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [showCalendly, setShowCalendly] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<Chat[]>("/api/chat");
				setChats(response.data);
			} catch (error) {
				console.error("Error fetching chat data:", error);
			}
		};
		fetchData();
	}, []);

	const handleSendMessage = () => {
		if (
			newMessage.trim() !== ""
			// || newAttachments.length > 0 ||
			// newLinks.length > 0
		) {
			const newMsg = {
				msgNum: selectedChat?.messages.length + 1 || 1,
				text: newMessage,
				attachments: newAttachments,
				links: newLinks,
				sender: { userId: 1, name: "Vardhan" }, // Replace with actual sender info
			};

			axios
				.post("/api/chat", { message: newMsg })
				.then((response) => {
					setChats((prevChats) => {
						return prevChats.map((chat) =>
							chat.chatId === selectedChat?.chatId
								? { ...chat, messages: [...chat.messages, response.data] }
								: chat,
						);
					});
					setNewMessage("");
					setNewAttachments([]);
					setNewLinks([]);
				})
				.catch((error) => {
					console.error("Error sending message:", error);
				});
		}
	};

	const handleChatClick = (chat: Chat) => {
		setSelectedChat(chat);
		setReceiverProfile(mockProfiles[chat.receiver.userId]);
	};

	const handleFileUpload = (file: File) => {
		// Simulate file upload and generate a mock URL
		const url = URL.createObjectURL(file);
		const attachment = { name: file.name, url };
		setNewAttachments((prevAttachments) => [...prevAttachments, attachment]);
	};

	const handleAddLink = (link: string) => {
		setNewLinks((prevLinks) => [...prevLinks, link]);
	};

	const filteredChats = chats.filter((chat) =>
		chat.receiver.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<Box p={20}>
			<Text>Chat</Text>
			<Divider />

			<Grid align="flex-start" mt={10}>
				{/* Chat list */}
				<GridCol span={3}>
					<TextInput
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.currentTarget.value)}
						mb={10}
					/>
					<Stack>
						{filteredChats.length > 0 ? (
							filteredChats.map((chat) => (
								<Button
									key={chat.chatId}
									h={60}
									bg={"white"}
									onClick={() => handleChatClick(chat)}
								>
									<ChatItem chat={chat} />
								</Button>
							))
						) : (
							<Text>No chats found.</Text>
						)}
					</Stack>
				</GridCol>

				{/* Selected chat and receiver profile */}
				{selectedChat && (
					<>
						<GridCol span={6}>
							<Paper
								p={10}
								mih={"65vh"}
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "flex-end",
								}}
							>
								{selectedChat.messages.map((message) => (
									<Box
										style={{ display: "flex", flexDirection: "column" }}
										key={message.msgNum}
										mb={10}
									>
										<Box>
											<Text fw={500}>{message.sender.name}</Text>
											<Text>{message.text}</Text>
											{message.attachments.map((attachment, index) => (
												<a
													key={index}
													href={attachment.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Text c="blue">{attachment.name}</Text>
												</a>
											))}
											{message.links.map((link, index) => (
												<a
													key={index}
													href={link}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Text color="blue">{link}</Text>
												</a>
											))}
										</Box>
									</Box>
								))}
							</Paper>

							<Grid
								bg={"white"}
								style={{ borderTop: "2px solid lightgrey" }}
								mt={10}
								h={"21.25vh"}
							>
								<GridCol span={12}>
									<Textarea
										placeholder="Type your message..."
										variant="filled"
										autosize
										minRows={7}
										maxRows={7}
										m={"sm"}
										onChange={(event) => setNewMessage(event.target.value)}
										style={{ resize: "none" }}
									/>
								</GridCol>
								{/* <GridCol span={1}>
									<FileInput
										placeholder="Attach files"
										onChange={handleFileUpload}
										mb="sm"
									/>
								</GridCol>
								<GridCol span={1}>
									<TextInput
										placeholder="Add link (e.g., Google Meet, Calendly)"
										onKeyDown={(event) => {
											if (
												event.key === "Enter" &&
												event.currentTarget.value.trim() !== ""
											) {
												handleAddLink(event.currentTarget.value.trim());
												event.currentTarget.value = "";
											}
										}}
										mb="sm"
									/>
								</GridCol> */}
								<GridCol span={12}>
									<Flex justify={"space-around"}>
										<Flex gap={20}>
											<Button
												variant="outline"
												mt="sm"
												onClick={() => {
													// Show file attachment pop-up
													const input = document.createElement("input");
													input.type = "file";
													input.onchange = (event: any) => {
														handleFileUpload(event.target.files[0]);
													};
													input.click();
												}}
											>
												Attach
											</Button>
										</Flex>

										<Button onClick={handleSendMessage} mt="sm">
											Send
										</Button>
									</Flex>
								</GridCol>
							</Grid>
						</GridCol>
						<Divider my="sm" />
						{selectedChat.receiver && (
							<GridCol bg={"white"} p={10} mt={10} span={3} h={"87vh"}>
								<Box
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									{" "}
									{/* Added flexbox styles */}
									<Image
										// src={selectedChat.receiver.avatar}
										src={"/profile.png"}
										alt={selectedChat.receiver.name}
										radius="full"
									/>
									<Text mt="xs" fw={500}>
										{selectedChat.receiver.name}
									</Text>
									{!showCalendly && (
										<>
											<Text mt="xs" c="dimmed">
												{selectedChat.receiver.job || "Not specified"}
											</Text>
											{/* <StarRating rating={4.0} />  Assuming a rating of 4.0 */}
											<Button mt="sm" variant="outline" size="sm">
												View Profile
											</Button>
											<Divider my="sm" c={"black"} />
											<Text mt="xs" fw={500}>
												Applied For:
											</Text>
											<Text mt="xs" c="dimmed">
												{selectedChat.receiver.job || "Not specified"}
											</Text>
											<Text mt="xs" c="dimmed">
												Design
											</Text>
											<Divider my="sm" />
											<Stack gap={10}>
												{/* Email */}
												<Flex justify="flex-start" align="center">
													<IconMail size={16} style={{ marginRight: "8px" }} />{" "}
													{/* Added marginRight */}
													<Text c="dimmed" style={{ lineHeight: 1 }}>
														{selectedChat.receiver.email || "Not specified"}
													</Text>
												</Flex>

												{/* Phone */}
												<Flex justify="flex-start" align="center">
													<IconPhone size={16} style={{ marginRight: "8px" }} />{" "}
													{/* Added marginRight */}
													<Text c="dimmed" style={{ lineHeight: 1 }}>
														{selectedChat.receiver.phone || "Not specified"}
													</Text>
												</Flex>
											</Stack>
										</>
									)}
									<Divider my="sm" />
									{isRecruiter && (
										<Button
											mt="sm"
											variant="outline"
											size="sm"
											onClick={() => setShowCalendly(!showCalendly)}
										>
											{!showCalendly ? "Schedule" : <IconX size={16} />}
										</Button>
									)}
									{showCalendly && (
										<InlineWidget
											styles={{ height: "50vh", marginTop: "10px" }}
											url={`https://calendly.com/${selectedChat.receiver.calendyUserName}/30min`}
										/>
									)}
								</Box>
							</GridCol>
						)}
					</>
				)}
			</Grid>
		</Box>
	);
};

export default ChatBox;

// ChatItem Component for rendering individual chat list items
const ChatItem = ({ chat }: { chat: Chat }) => {
	return (
		<Grid align="center" justify="flex-start">
			<Grid.Col span={3}>
				<Image
					src="https://example.com/avatar-placeholder.jpg"
					alt={chat.receiver.name}
					radius="sm"
					width={50}
					height={50}
				/>
			</Grid.Col>
			<Grid.Col span={9}>
				<Stack gap={0}>
					<Text size="md" c={"black"} fw={500}>
						{chat.receiver.name}
					</Text>
					<Text size="sm" c="dimmed">
						{chat.receiver.job}
					</Text>
					<Text size="xs" c="dimmed">
						Design
					</Text>
				</Stack>
			</Grid.Col>
		</Grid>
	);
};
