"use client"

import React from "react";
import { useGetAgencyFreelancers } from '@/hooks/useGetAgencyFreelancers';
import { useGetJobs } from '@/hooks/queries/useGetJobs';
import { JobProposalStatus } from '@/types/job.type';

const DashboardPage = () => {
	const { freelancers, isLoadingFreelancers } = useGetAgencyFreelancers();
	const { jobs, isLoading } = useGetJobs(freelancers || []);

	const totalJobs = jobs
		? Object.values(jobs).reduce((acc, jobArr) => acc + (Array.isArray(jobArr) ? jobArr.length : 0), 0)
		: 0;

	const totalAppliedJobs = jobs
		? Object.values(jobs).reduce(
			(acc, jobArr) =>
				acc + (Array.isArray(jobArr)
					? jobArr.filter(job => job.proposalStatus === JobProposalStatus.applied).length
					: 0),
			0
		)
		: 0;

	return (
		<div className="container mx-auto mt-10">
			<h1 className="text-3xl font-bold mb-6">Agency Dashboard</h1>
			<div className="flex gap-6 mb-8">
				<div className="bg-white rounded-xl shadow p-6 min-w-[220px]">
					<p className="text-lg text-gray-600 mb-2">Total Freelancers Listed</p>
					<p className="text-4xl font-bold">{isLoadingFreelancers ? '-' : freelancers ? freelancers.length : 0}</p>
				</div>
				<div className="bg-white rounded-xl shadow p-6 min-w-[220px]">
					<p className="text-lg text-gray-600 mb-2">Total Jobs Pulled</p>
					<p className="text-4xl font-bold">{isLoading ? '-' : totalJobs}</p>
				</div>
				<div className="bg-white rounded-xl shadow p-6 min-w-[220px]">
					<p className="text-lg text-gray-600 mb-2">Total Applied Jobs</p>
					<p className="text-4xl font-bold">{isLoading ? '-' : totalAppliedJobs}</p>
				</div>
			</div>
			<p>Welcome to your agency dashboard. More features coming soon!</p>
		</div>
	);
};

export default DashboardPage; 