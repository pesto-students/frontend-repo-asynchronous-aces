export interface Job {
	id: number;
	title: string;
	department: string;
	jobType: string;
	recruitmentQuota: string;
	experiences: string;
	location: string;
	salary: string;
	status?: "active" | "inactive";
	candidatesApplied?: string;
}

export interface JobState {
    jobs: Job[];
    selectedStatus: 'active' | 'inactive';
    selectedDepartment: string;
  }
