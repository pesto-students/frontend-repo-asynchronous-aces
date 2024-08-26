import {
  IconComponents,
  IconDashboard,
  IconLock,
  IconMoodSmile,
} from "@tabler/icons-react";
import type { NavItem } from "@/types/nav-item";
import { IconListCheck, IconNote, IconFolder } from "@tabler/icons-react"; // Replace with your icon library

export const  maxSkillsForAJob = 6;
export const asideOptionData = [
	{
		name: "Task",
		icon: IconListCheck ,
	},
	{
		name: "Notes",
		icon: IconNote ,
	},
	{
		name: "Folder",
		icon: IconFolder ,
	},
];

export const navLinks: NavItem[] = [
  { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },

  {
    label: "Inbox",
    icon: IconComponents,
    link:"/inbox"
  },
  {
    label: "Calender & Todos",
    icon: IconLock,
    link : "/dashboard"
  },
  {
    label: "RECRUITMENT",
    icon: IconMoodSmile,
    initiallyOpened: true,
    links: [
      {
        label: "Jobs",
        link: "/",
      },
      {
        label: "Candidates",
        link: "/",
      },
    ],
  },
];


