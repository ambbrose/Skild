import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";
import { dummySkills } from "../data/dummy-skills";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div id="home">
			<section className="hero">
				<div className="copy">
					<h1>
						The registry for <br />
						<span className="text-gradient">Agentic Intelligence</span>
					</h1>

					<p>
						Agentic Intelligence is a new paradigm in AI that allows for
						autonomous agents to perform complex tasks and make decisions on
						their own. Our registry provides a platform for developers and
						researchers to share and discover agentic intelligence models,
						tools, and resources.
					</p>
				</div>

				<div className="actions">
					<Link to="." className="btn btn-primary">
						<Terminal className="icon" size={18} />
						<span>Browse Registry</span>
					</Link>
					<Link to="." className="btn btn-primary">
						<span>Publish skill</span>
					</Link>
				</div>
			</section>

			<section className="latest">
				<div className="space-y-2">
					<h2>
						Latest <span className="text-gradient">Skill</span>
					</h2>
					<p>Check out the newest skills added to the registry.</p>
				</div>

				<div>
					{dummySkills.length > 0 ? (
						<div className="skills-grid">
							{dummySkills.map((skill) => (
								<SkillCard key={skill.id} skill={skill} />
							))}
						</div>
					) : (
						<p>No skills available.</p>
					)}
				</div>
			</section>

			<section className="popular">
				<div className="space-y-2">
					<h2>
						Popular <span className="text-gradient">Skill</span>
					</h2>
					<p>Discover the most popular skills in the registry.</p>
				</div>
			</section>

			<section className="categories">
				<div className="space-y-2">
					<h2>
						Browse by <span className="text-gradient">Category</span>
					</h2>
					<p>Explore skills based on their categories.</p>
				</div>
			</section>
		</div>
	);
}
