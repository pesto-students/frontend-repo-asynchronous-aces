"use client";
import CandidatesList from "@/components/Dashboard/CandidatesList";
import JobDescriptionCards from "@/components/Dashboard/JobDescriptionCards";
import {
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	GridCol,
	Tabs,
	TabsPanel,
	Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
	IconArrowLeft,
	IconDeviceFloppy,
	IconEdit,
	IconPencilCancel,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { basename } from "path";
import { useEffect, useState } from "react";

type attachement = {
	name: string;
	url: string;
};
type jobdetails = {
	id: number;
	title: string;
	department: string;
	jobType: string;
	recruitmentQuota: string;
	experiences: string;
	location: string;
	salary: string;
	status: string;
	createdDate: Date;
	hiringManager: string;
	skills: string[];
	attachments: attachement[];
	jobDescription: string;
};

const dummyJobDetails = {
	id: 1,
	title: "Software Engineer",
	department: "Engineering",
	jobType: "Full-time",
	recruitmentQuota: "20",
	experiences: "2",
	location: "Remote",
	salary: "$80,000 - $100,000",
	status: "active",

	createdDate: new Date(),
	hiringManager: "John Deo",
	skills: ["JavaScript", "React", "Node.js"], // Array of skills
	attachments: [
		{
			name: "Company Policy.pdf",
			url: "https://example.com/policy.pdf", // Optional: Add URL if necessary
		},
		// ... other attachments
	],
	jobDescription:
		'<h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Job Title:</h2><p>Enter Job Title</p><h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Job Description:</h3><p>Enter Job Description</p><h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Responsibilities:</h3><ul style="list-style-type: disc; padding-left: 20px;"><li>Responsibility 1</li><li>Responsibility 2</li><li>Responsibility 3</li></ul><h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Requirements:</h3><ul style="list-style-type: disc; padding-left: 20px;"><li>Requirement 1</li><li>Requirement 2</li><li>Requirement 3</li></ul></p>',
};
const isRecruiter = true;
const JobDetails = () => {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [selectedOption, setSelectedOption] = useState("JobDetails");
	const [editMode, setEditMode] = useState(false);

	// Fetch job details based on jobId (using API or data fetching logic)
	const [jobData, setJobData] = useState<jobdetails>();
	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				// const response = await fetch(`/api/jobs/${id}`);
				// const data = await response.json();
				// setJobData(data);

				// dummy value setting
				setJobData(() => dummyJobDetails);
			} catch (error) {
				console.error("Error fetching job details:", error);
			}
		};

		fetchJobDetails();
	}, []);

	// Handle editing logic (form, submit handler, data updates)

	const handleBack = () => {
		router.push("/dashboard");
	};
	const handleOptionChange = (value: string | null) => {
		value && setSelectedOption(value);
	};
	const handleEdit = () => {
		setEditMode(!editMode);
	};

	const handleSave = () => {
		// Implement save logic here, like sending a PUT request to update job details
		setEditMode(false);
	};

	return (
		jobData && (
			<Grid gutter={"lg"}>
				<GridCol span={12}>
					<Flex align={"center"} justify={"space-between"} p={"md"}>
						<Flex>
							<Button
								leftSection={<IconArrowLeft size={23} />}
								onClick={handleBack}
								variant="transparent"
								ml={2}
							></Button>

							<Box p={"md"} maw={200}>
								<Text c="dimmed" size={"sm"}>
									{jobData.department.toUpperCase()}
								</Text>
								<Text w={500} size={"lg"}>
									{jobData.title}
								</Text>

								<Text c="dimmed" size={"xs"}>
									{jobData.location} * {jobData.jobType}
								</Text>
							</Box>
						</Flex>

						<Flex
							gap={3}
							style={{ flexDirection: isMobile ? "column" : "row" }}
						>
							<Button variant="outline">Share & Promote</Button>
							<Button variant="filled">Published</Button>
						</Flex>
					</Flex>
				</GridCol>
				<GridCol span={{ sm: 12, md: 12, lg: 12 }}>
					<Tabs
						color="#071126"
						value={selectedOption}
						onChange={handleOptionChange}
					>
						<Tabs.List>
							<Tabs.Tab value="Candidates">Candidates</Tabs.Tab>
							<Tabs.Tab value="JobDetails">Job Details</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</GridCol>

				{selectedOption === "JobDetails" ? (
					<JobDescriptionCards
						isRecruiter={isRecruiter}
						createdDate={jobData?.createdDate ?? new Date()}
						hiringManager={jobData?.hiringManager ?? "N/A"}
						department={jobData?.department ?? "N/A"}
						recruitmentQuota={jobData?.recruitmentQuota ?? "N/A"}
						jobType={jobData?.jobType ?? "N/A"}
						experiences={jobData?.experiences ?? "N/A"}
						location={jobData?.location ?? "N/A"}
						salary={jobData?.salary ?? "N/A"}
						jobDescription={jobData?.jobDescription ?? "<h3>loading</h3>"}
						skills={jobData?.skills ?? ["skills1", "skill2"]}
						attachements={jobData?.attachments ?? []}
					/>
				) : (
					<CandidatesList jobId={1} />
				)}
			</Grid>
		)
	);
};

export default JobDetails;
