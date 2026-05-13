import { error } from '@sveltejs/kit';
import { projects } from '$data/projects';

export const load = ({ params }) => {
	const project = projects.find((entry) => entry.slug === params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	const index = projects.findIndex((entry) => entry.slug === params.slug);
	const previousProject = projects[(index - 1 + projects.length) % projects.length];
	const nextProject = projects[(index + 1) % projects.length];

	return {
		project,
		previousProject,
		nextProject
	};
};
