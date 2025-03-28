import { getEvents } from '~/models/events.server';
import { Link, useLoaderData } from 'react-router';
import Heading from '~/components/Heading';
import { getProjects } from '~/models/projects.server';

export async function loader() {
  const projects = await getProjects();
  return {
    projects,
  };
}

export default function ProjectsRoute() {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="content">
        <Heading level={1}>projecten</Heading>

        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projecten/${project.id}`}>
                <Heading level={4}>{project.title.nl}</Heading>
                <p>{project.summary.nl}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
