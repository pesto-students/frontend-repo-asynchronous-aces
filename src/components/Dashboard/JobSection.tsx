"use client";
import {
	Box,
	Button,
	Card,
	ComboboxItem,
	Divider,
	Flex,
	Grid,
	Group,
	Modal,
	Select,
	Tabs,
	Text,
	TextInput,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import {
	IconAd,
	IconCirclePlus,
	IconCirclePlus2,
	IconPlus,
	IconUpload,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import ApplyJobModal from "./ApplyJobModal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Job } from "@/types/type";
import {
	addJob,
	setSelectedDepartment,
	setSelectedStatus,
} from "@/store/slices/jobSlice";

const isRecruiter = true;
const JobCard = ({
	id: jobId,
	title,
	department,
	jobType,
	recruitmentQuota,
	experiences,
	location,
	salary,
	candidatesApplied,
}: Job) => {
	const router = useRouter();
	const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
	const handleApply = () => {
		setIsApplyModalOpen(true);
	};

	const handleModalClose = () => {
		setIsApplyModalOpen(false);
	};

	const handleApplicationSubmit = async (applicationData: {
		email: string;
		resume: File;
	}) => {
		try {
			const response = await fetch("/api/apply", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					jobId: jobId,
					email: applicationData.email,
					resume: applicationData.resume.name, // Save the file name or path
				}),
			});

			const data = await response.json();
			if (data.success) {
				alert("Application submitted successfully!");
			} else {
				alert("Failed to submit application.");
			}
		} catch (error) {
			console.error("Error submitting application:", error);
		}
	};
	const handleSeeDetails = () => {
		router.push(`/dashboard/job-details/${jobId}`);
	};
	const theme = useMantineTheme();
	const { colorScheme } = useMantineColorScheme();
	const bg =
		colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0];

	return (
		<Card withBorder>
			<Group>
				<Text size="xs" mb={"1px"} c="dimmed">
					{department.toUpperCase()}
				</Text>
				<Text size="xl" w={700}>
					{title}
				</Text>
			</Group>

			<Divider p={3} />
			{!isRecruiter ? (
				<Grid>
					<Grid.Col span={6}>
						<Text size="xs" c="dimmed">
							Department
						</Text>
						<Text size="xs" w={500}>
							{department}
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text size="xs" c="dimmed">
							Job Type
						</Text>
						<Text size="xs" w={500}>
							{jobType}
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text size="xs" c="dimmed">
							Recruitment Quota
						</Text>
						<Text size="xs" w={500}>
							{recruitmentQuota}
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text size="xs" c="dimmed">
							Experience
						</Text>
						<Text size="xs" w={500}>
							{experiences}
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text size="xs" c="dimmed">
							Location
						</Text>
						<Text size="xs" w={500}>
							{location}
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text size="xs" c="dimmed">
							Salary
						</Text>
						<Text size="xs" w={500}>
							${salary}
						</Text>
					</Grid.Col>
				</Grid>
			) : (
				<Grid>
					<Grid.Col span={6}>
						<Group style={{ padding: 15 }} align="center">
							<Text w={500}>Candidates:</Text>
							<Flex
								gap="xs"
								bg={bg}
								ta={"center"}
								w={{ base: 300, md: 250, lg: 250 }}
								h={{ base: 100, lg: 100 }}
								align={"center"}
							>
								<Text fw={"bolder"} w={700}>
									QUOTA {recruitmentQuota}
								</Text>
								<Divider
									orientation="vertical"
									size={"md"}
									color="lightgreen"
									opacity={"50%"}
								/>
								<Text fw={"bolder"} w={700}>
									CANDIDATES {candidatesApplied}
								</Text>
							</Flex>
						</Group>
					</Grid.Col>
				</Grid>
			)}

			<Divider p={3} mt={10} />
			<Flex justify="space-around" mt="md">
				<Button variant="outline" size="xs" onClick={handleSeeDetails}>
					See Details
				</Button>
				{!isRecruiter && (
					<Button size="xs" onClick={handleApply}>
						Apply
					</Button>
				)}
			</Flex>

			{/* Apply Job Modal */}
			<ApplyJobModal
				opened={isApplyModalOpen}
				onClose={handleModalClose}
				onSubmit={handleApplicationSubmit}
				jobTitle={title}
			/>
		</Card>
	);
};

const JobSection = () => {
	const dispatch = useAppDispatch();
	const { jobs, selectedStatus, selectedDepartment } = useAppSelector(
		(state) => state.jobs,
	);
	const [searchedJobs, setSearchedJobs] = useState<Job[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [formData, setFormData] = useState<Job>({
		id: 0,
		title: "",
		department: "",
		jobType: "",
		recruitmentQuota: "",
		experiences: "",
		location: "",
		salary: "",
	});

	const filterAndSortJobs = useCallback(() => {
		let filteredJobs = jobs.filter((job) => job.status === selectedStatus);

		if (selectedDepartment !== "all") {
			filteredJobs = filteredJobs.filter(
				(job) => job.department === selectedDepartment,
			);
		}

		const sortedOrders = filteredJobs.sort((a: Job, b: Job) => a.id - b.id);
		setSearchedJobs(sortedOrders);
	}, [jobs, selectedStatus, selectedDepartment]);
	useEffect(() => {
		filterAndSortJobs();
	}, [selectedStatus, selectedDepartment]);

	const handleStatusChange = (value: "active" | "inactive") => {
		dispatch(setSelectedStatus(value));
	};

	const handleDepartmentChange = (value: string | null) => {
		dispatch(setSelectedDepartment(value || "all"));
	};
	// Handle form input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(addJob({ ...formData, id: jobs.length + 1 }));
		setModalOpen(false);
	};

	return (
		<div>
			{/* Sorting and filtering options */}
			<div></div>
			{isRecruiter && (
				<Tabs
					color="#071126"
					value={selectedStatus}
					onChange={handleStatusChange}
				>
					<Tabs.List>
						<Tabs.Tab value="active">Active Jobs</Tabs.Tab>
						<Tabs.Tab value="inactive">Inactive Jobs</Tabs.Tab>
					</Tabs.List>

					{/* <Tabs.Panel value="first" pt="xs">
					First tab color is teal, it gets this value from context
				</Tabs.Panel>

				<Tabs.Panel value="second" pt="xs">
					Second tab color is blue, it gets this value from props, props have
					the priority and will override context value
				</Tabs.Panel> */}
				</Tabs>
			)}
			{isRecruiter ? (
				<Text w={600} size="xl" mt={"md"} mb={"md"}>
					{`${searchedJobs.length} ${selectedStatus === "active" ? "Active" : "InActive"} Jobs`}
				</Text>
			) : (
				<Text w={600} size="xl" mt={"md"} mb={"md"}>
					Jobs
				</Text>
			)}

			<Grid gutter="lg">
				{searchedJobs.map((job, index) => (
					<Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
						<JobCard {...job} />
					</Grid.Col>
				))}
				{isRecruiter && (
					<Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
						<Flex
							justify="center"
							align="center"
							style={{ height: "100%", border: "1px dashed lightgray" }}
						>
							<IconPlus onClick={() => setModalOpen(true)} size={50} />
						</Flex>
					</Grid.Col>
				)}
			</Grid>
			<Modal
				opened={modalOpen}
				onClose={() => setModalOpen(false)}
				title="Create New Job"
				size="auto"
				pos={"relative"}
				transitionProps={{
					transition: "fade",
					duration: 600,
					timingFunction: "linear",
				}}
			>
				<form onSubmit={handleSubmit}>
					<TextInput
						label="Job Title"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
					/>
					<TextInput
						label="Department"
						name="department"
						value={formData.department}
						onChange={handleInputChange}
					/>
					<Select
						label="Job Type"
						name="jobType"
						value={formData.jobType}
						onChange={(value) =>
							setFormData((prev) => ({ ...prev, jobType: value as string }))
						}
						data={["Full-time", "Part-time", "Contract", "Internship"]}
					/>
					<TextInput
						label="Recruitment Quota"
						name="recruitmentQuota"
						value={formData.recruitmentQuota}
						onChange={handleInputChange}
					/>
					<TextInput
						label="Experience"
						name="experiences"
						value={formData.experiences}
						onChange={handleInputChange}
					/>

					<TextInput
						label="Location"
						name="location"
						value={formData.location}
						onChange={handleInputChange}
					/>
					<TextInput
						label="Salary"
						name="salary"
						value={formData.salary}
						onChange={handleInputChange}
					/>

					<Flex justify="flex-end" mt="md">
						<Button type="submit">Create Job</Button>
					</Flex>
				</form>
			</Modal>
		</div>
	);
};

export default JobSection;
