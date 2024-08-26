import { Avatar, Box, Button, Flex, Group, Table, Text } from "@mantine/core";
import React, { useState, useEffect } from "react";

interface Candidate {
	id: number;
	name: string;
	avatar: string;
	role: string;
	status: string;
	// Add other properties as needed
}

const dummyCandidates = [
	{
		id: 1,
		name: "John Doe",
		avatar: "https://example.com/avatar1.jpg",
		role: "UI Designer",
		status: "Active",
	},
	{
		id: 2,
		name: "Jane Smith",
		avatar: "https://example.com/avatar2.jpg",
		role: "Frontend Developer",
		status: "Applied",
	},
	{
		id: 3,
		name: "Michael Johnson",
		avatar: "https://example.com/avatar3.jpg",
		role: "Backend Developer",
		status: "Interviewing",
	},
	// Add more candidates as needed
];

const CandidatesList = ({ jobId }: { jobId: number }) => {
	const [candidates, setCandidates] = useState<Candidate[]>(dummyCandidates);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Uncomment and modify the useEffect hook for actual API data fetching
	// useEffect(() => {
	//   const fetchCandidates = async () => {
	//     setIsLoading(true);
	//     setError(null);

	//     try {
	//       const response = await fetch(`/api/candidates/${jobId}`); // Replace with your actual API endpoint

	//       if (!response.ok) {
	//         throw new Error("Failed to fetch candidates");
	//       }

	//       const data = await response.json();
	//       setCandidates(data);
	//     } catch (error) {
	//       setError(error.message);
	//     } finally {
	//       setIsLoading(false);
	//     }
	//   };

	//   fetchCandidates();
	// }, [jobId]); // Re-run useEffect when jobId changes

	if (isLoading) {
		return <Text>Loading candidates...</Text>;
	}

	if (error) {
		return <Text>Error: {error}</Text>;
	}

	if (!candidates.length) {
		return <Text>No candidates found for this job.</Text>;
	}

	return (
		<Table highlightOnHover>
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Role</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{candidates.map((candidate) => (
					<CandidateRow key={candidate.id} user={candidate} />
				))}
			</tbody>
		</Table>
	);
};

export default CandidatesList;

export const CandidateRow = ({ user }: { user: Candidate }) => {
	return (
		<tr>
			<td style={{ textAlign: "center" }}>
				<Avatar radius="sm" src={user.avatar} />
			</td>
			<td style={{ textAlign: "center" }}>{user.name}</td>
			<td style={{ textAlign: "center" }}>{user.role}</td>
			<td style={{ textAlign: "center" }}>{user.status}</td>
			<td style={{ textAlign: "center" }}>
				<Button variant="outline" size="xs">
					Message
				</Button>
			</td>
		</tr>
	);
};
